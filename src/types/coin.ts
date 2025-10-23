export interface Coin {
  id: string;
  name: string;
  year: number;
  country: string;
  denomination: string;
  mintMark?: string;
  grade?: string;
  value?: number;
  description?: string;
  image?: string;
  dateAdded: string;
  category?: string;
  composition?: string;
  weight?: number;
  diameter?: number;
  registrationNumber?: string;
  gradingCompany?: string;
  faceValue?: string;
  specialCollection?: string;
}
export type CoinFormData = Omit<Coin, 'id' | 'dateAdded'>;