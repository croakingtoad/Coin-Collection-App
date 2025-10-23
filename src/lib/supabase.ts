import { createClient } from '@supabase/supabase-js';
import { Coin } from '../types/coin';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for Supabase
export interface DbCoin {
  id: string;
  name: string;
  year: number;
  country: string;
  denomination: string;
  mint_mark?: string;
  grade?: string;
  value?: number;
  description?: string;
  image?: string;
  date_added: string;
  category?: string;
  composition?: string;
  weight?: number;
  diameter?: number;
  registration_number?: string;
  grading_company?: string;
  face_value?: string;
  special_collection?: string;
  created_at: string;
  updated_at: string;
}

// Convert from database format to app format
export function dbCoinToCoin(dbCoin: DbCoin): Coin {
  return {
    id: dbCoin.id,
    name: dbCoin.name,
    year: dbCoin.year,
    country: dbCoin.country,
    denomination: dbCoin.denomination,
    mintMark: dbCoin.mint_mark,
    grade: dbCoin.grade,
    value: dbCoin.value,
    description: dbCoin.description,
    image: dbCoin.image,
    dateAdded: dbCoin.date_added,
    category: dbCoin.category,
    composition: dbCoin.composition,
    weight: dbCoin.weight,
    diameter: dbCoin.diameter,
    registrationNumber: dbCoin.registration_number,
    gradingCompany: dbCoin.grading_company,
    faceValue: dbCoin.face_value,
    specialCollection: dbCoin.special_collection,
  };
}

// Convert from app format to database format
export function coinToDbCoin(coin: Coin): Partial<DbCoin> {
  const dbCoin: Partial<DbCoin> = {
    name: coin.name,
    year: coin.year,
    country: coin.country,
    denomination: coin.denomination,
    mint_mark: coin.mintMark,
    grade: coin.grade,
    value: coin.value,
    description: coin.description,
    image: coin.image,
    category: coin.category,
    composition: coin.composition,
    weight: coin.weight,
    diameter: coin.diameter,
    registration_number: coin.registrationNumber,
    grading_company: coin.gradingCompany,
    face_value: coin.faceValue,
    special_collection: coin.specialCollection,
  };

  // Only include date_added if it's provided (for updates)
  // For inserts, let the database default take over
  if (coin.dateAdded) {
    dbCoin.date_added = coin.dateAdded;
  }

  return dbCoin;
}
