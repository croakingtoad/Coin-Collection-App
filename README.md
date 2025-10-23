# 🪙 Coin Collection App

A modern, AI-powered Progressive Web App (PWA) for managing your coin collection with cloud sync, image analysis, and cross-device access.

## ✨ Features

- 📸 **AI-Powered Coin Recognition** - Upload coin images and use GPT-4 Vision to automatically extract details
- 🔄 **Cross-Device Sync** - Access your collection from phone, tablet, or desktop with real-time Supabase sync
- 🖼️ **Image Storage** - Store high-quality coin photos in the cloud
- 🔍 **Advanced Search** - Search by name, country, year, denomination, and more
- 📊 **Collection Statistics** - Track total coins, value, and countries
- 🎨 **Modern UI** - Clean, responsive interface with Tailwind CSS
- 🌐 **PWA Support** - Install as an app on any device
- 🔔 **Toast Notifications** - Beautiful, non-intrusive feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (free tier works!)
- An [OpenAI API key](https://platform.openai.com/api-keys) (for AI coin analysis)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/croakingtoad/Coin-Collection-App.git
   cd Coin-Collection-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon/public key
   - `VITE_OPENAI_API_KEY` - Your OpenAI API key

4. **Set up Supabase database**

   Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Click "New Query"
   - Copy and paste the contents of `supabase-schema.sql`
   - Click "Run"

   This creates:
   - `coins` table with all necessary fields
   - Indexes for fast searching
   - Row Level Security policies (public access by default)
   - `coin-images` storage bucket for photos

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:1337`

## 📚 Usage

### Adding a Coin

1. Click the **"+"** button or navigate to `/add`
2. Upload a photo of your coin (optional)
3. Click **"Analyze with AI"** to auto-fill details (requires OpenAI API key)
4. Fill in required fields: Name, Country, Denomination
5. Add optional details: grade, value, mint mark, etc.
6. Click **"Add Coin"**

### Viewing Your Collection

- **Dashboard**: See all coins in grid or list view
- **Search**: Use the search bar to filter by any field
- **Statistics**: View total coins, estimated value, and unique countries
- **Details**: Click any coin to see full information

### AI Coin Analysis

The app uses GPT-4 Vision to analyze coin images and extract:
- Coin name and series
- Year and mint mark
- Country and denomination
- Grading information (grade, company, certification number)
- Estimated market value
- Composition and weight
- Special collection designation

## 🗄️ Database Schema

The `coins` table includes:

**Required Fields:**
- `name` - Coin name/description
- `year` - Mint year
- `country` - Country of origin
- `denomination` - Face value

**Optional Fields:**
- `mint_mark` - Mint location identifier
- `grade` - Coin grade (e.g., MS-65)
- `value` - Estimated market value
- `description` - Additional notes
- `image` - Photo URL (Supabase Storage)
- `category` - Coin category
- `composition` - Metal composition
- `weight` - Weight in grams
- `diameter` - Diameter in mm
- `registration_number` - Grading certification number
- `grading_company` - Grading service (PCGS, NGC, etc.)
- `face_value` - Original denomination
- `special_collection` - Named collection

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4 Vision
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Port Configuration

The app runs on port 1337 by default. Change in `.env`:
```bash
VITE_PORT=1337
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your credentials from Project Settings → API
3. Run the database schema from `supabase-schema.sql`
4. The storage bucket `coin-images` will be created automatically

### OpenAI Setup

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key
3. Add to `.env` as `VITE_OPENAI_API_KEY`
4. Note: GPT-4 Vision API calls cost approximately $0.01-0.03 per image analysis

## 🌐 Deployment

The app can be deployed to any static hosting service:

- **Netlify**: `npm run build` → Deploy `dist` folder
- **Vercel**: Import from GitHub (auto-detects Vite)
- **GitHub Pages**: Use `gh-pages` package
- **Self-hosted**: Serve `dist` folder with any web server

Don't forget to set environment variables in your hosting platform!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Built with love for coin collectors everywhere 🪙

## 📧 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/croakingtoad/Coin-Collection-App/issues) on GitHub.

---

**Happy Collecting! 🪙✨**
