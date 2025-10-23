interface CoinAnalysisResult {
  name: string;
  year: number;
  country: string;
  denomination: string;
  mintMark?: string;
  grade?: string;
  registrationNumber?: string;
  gradingCompany?: string;
  faceValue?: string;
  specialCollection?: string;
  value?: number;
  composition?: string;
  weight?: number;
  description?: string;
}
export async function analyzeCoinImage(imageBase64: string): Promise<CoinAnalysisResult> {
  try {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'system',
          content: 'You are an expert numismatist. Identify the coin in the image(s) and extract from the coin, or the grading slab, the following information: Year, Country, Denomination, Mint Mark (typically found after year, e.g. "1883-O"), Coin Grade (typically something like "MS-65"), Registration Number (from the grading company), Grading Company Initials, Face Value, and determine if it is part of a special collection and which one (e.g. "Battlecreek Collection", "Binion Hoard", etc.). Return the data as a JSON object with these exact keys: name, year, country, denomination, mintMark, grade, registrationNumber, gradingCompany, faceValue, specialCollection, value (estimated market value in USD), composition, weight (in grams), description. If any field cannot be determined, omit it from the response.'
        }, {
          role: 'user',
          content: [{
            type: 'image_url',
            image_url: {
              url: imageBase64
            }
          }, {
            type: 'text',
            text: 'Please analyze this coin and provide the information in JSON format.'
          }]
        }],
        max_tokens: 1000,
        temperature: 0.2
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${errorText}`);
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }
    // Extract JSON from the response (in case it's wrapped in markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }
    const parsedData = JSON.parse(jsonMatch[0]);
    return parsedData;
  } catch (error) {
    console.error('Error analyzing coin:', error);
    throw error;
  }
}