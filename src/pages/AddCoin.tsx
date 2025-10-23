import React, { useState, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, ScanIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Coin, CoinFormData } from '../types/coin';
import { storageUtils } from '../utils/storage';
import { analyzeCoinImage } from '../utils/openai';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
export function AddCoin() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<CoinFormData>({
    name: '',
    year: new Date().getFullYear(),
    country: '',
    denomination: '',
    mintMark: '',
    grade: '',
    value: 0,
    description: '',
    category: '',
    composition: '',
    weight: 0,
    diameter: 0,
    registrationNumber: '',
    gradingCompany: '',
    faceValue: '',
    specialCollection: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAIAnalysis = async () => {
    if (!imagePreview) {
      toast.error('Please upload an image first');
      return;
    }
    setIsProcessing(true);
    setError('');

    const loadingToast = toast.loading('Analyzing coin with AI...');

    try {
      const result = await analyzeCoinImage(imagePreview);
      setFormData(prev => ({
        ...prev,
        name: result.name || prev.name,
        year: result.year || prev.year,
        country: result.country || prev.country,
        denomination: result.denomination || prev.denomination,
        mintMark: result.mintMark || prev.mintMark,
        grade: result.grade || prev.grade,
        registrationNumber: result.registrationNumber || prev.registrationNumber,
        gradingCompany: result.gradingCompany || prev.gradingCompany,
        faceValue: result.faceValue || prev.faceValue,
        specialCollection: result.specialCollection || prev.specialCollection,
        value: result.value || prev.value,
        composition: result.composition || prev.composition,
        weight: result.weight || prev.weight,
        description: result.description || prev.description
      }));

      // Format the AI response for display
      const responseDetails = Object.entries(result)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      toast.success(
        <div className="space-y-2">
          <div className="font-semibold">AI Analysis Complete!</div>
          <div className="text-sm">The coin details have been extracted. Please review and adjust as needed.</div>
          <div className="text-xs font-mono bg-gray-100 p-2 rounded mt-2 whitespace-pre-wrap max-h-48 overflow-y-auto">
            {responseDetails}
          </div>
        </div>,
        {
          id: loadingToast,
          duration: Infinity, // Don't auto-dismiss
        }
      );
    } catch (err) {
      console.error('AI analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze coin. Please try again.';
      toast.error(errorMessage, { id: loadingToast });
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔵 Form submitted');
    setError('');

    // Validate required fields
    if (!formData.name || !formData.country || !formData.denomination) {
      console.log('❌ Validation failed:', { name: formData.name, country: formData.country, denomination: formData.denomination });
      toast.error('Please fill in all required fields: Name, Country, and Denomination');
      return;
    }

    console.log('✅ Validation passed');
    setIsSaving(true);
    console.log('🔵 isSaving set to true');

    // Generate UUID (fallback for browsers without crypto.randomUUID)
    const generateUUID = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback UUID generator
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const newCoin: Coin = {
      ...formData,
      id: generateUUID(),
      dateAdded: new Date().toISOString(),
      image: imagePreview
    };

    console.log('🔵 Created coin object:', newCoin);

    try {
      console.log('🔵 Calling storageUtils.saveCoin...');
      const result = await storageUtils.saveCoin(newCoin);
      console.log('✅ storageUtils.saveCoin completed:', result);
      console.log('🔵 Showing success toast');
      toast.success('Coin added successfully!');
      console.log('🔵 Navigating to /');
      navigate('/');
    } catch (err) {
      console.error('❌ Save error caught:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save coin. Please try again.';
      console.error('❌ Error message:', errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      console.log('🔵 Finally block - setting isSaving to false');
      setIsSaving(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'value' || name === 'weight' || name === 'diameter' ? parseFloat(value) || 0 : value
    }));
  };
  return <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Coin</h1>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Coin Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? <div className="relative">
                  <img src={imagePreview} alt="Coin preview" className="w-full h-64 object-cover rounded-lg" />
                  <Button type="button" variant="destructive" size="sm" onClick={() => setImagePreview('')} className="absolute top-2 right-2">
                    Remove
                  </Button>
                </div> : <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload a photo of your coin
                  </p>
                  <Button type="button" onClick={() => fileInputRef.current?.click()}>
                    Choose File
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>}
              {imagePreview && <Button type="button" onClick={handleAIAnalysis} disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700">
                  <ScanIcon className="w-5 h-5 mr-2" />
                  {isProcessing ? 'Analyzing with AI...' : 'Analyze with AI'}
                </Button>}
              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>}
            </CardContent>
          </Card>
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Coin Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input id="year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="denomination">Denomination *</Label>
                  <Input id="denomination" name="denomination" value={formData.denomination} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mintMark">Mint Mark</Label>
                  <Input id="mintMark" name="mintMark" value={formData.mintMark} onChange={handleChange} placeholder="e.g., O, S, D" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faceValue">Face Value</Label>
                  <Input id="faceValue" name="faceValue" value={formData.faceValue} onChange={handleChange} placeholder="e.g., $1, 50¢" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Grading Information */}
          <Card>
            <CardHeader>
              <CardTitle>Grading Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" name="grade" value={formData.grade} onChange={handleChange} placeholder="e.g., MS-65" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradingCompany">Grading Company</Label>
                  <Input id="gradingCompany" name="gradingCompany" value={formData.gradingCompany} onChange={handleChange} placeholder="e.g., PCGS, NGC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">
                    Registration Number
                  </Label>
                  <Input id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="Grading company cert number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialCollection">Special Collection</Label>
                  <Input id="specialCollection" name="specialCollection" value={formData.specialCollection} onChange={handleChange} placeholder="e.g., Battlecreek Collection" />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Estimated Value ($)</Label>
                  <Input id="value" name="value" type="number" value={formData.value} onChange={handleChange} step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} placeholder="e.g., Commemorative" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="composition">Composition</Label>
                  <Input id="composition" name="composition" value={formData.composition} onChange={handleChange} placeholder="e.g., .999 Silver" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (g)</Label>
                  <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} step="0.01" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Add Coin'}
            </Button>
          </div>
        </form>
      </main>
    </div>;
}