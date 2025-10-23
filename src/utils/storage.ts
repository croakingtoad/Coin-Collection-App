import { Coin } from '../types/coin';
import { supabase, dbCoinToCoin, coinToDbCoin, DbCoin } from '../lib/supabase';

export const storageUtils = {
  getCoins: async (): Promise<Coin[]> => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .order('date_added', { ascending: false });

      if (error) throw error;

      return (data as DbCoin[]).map(dbCoinToCoin);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  },

  saveCoin: async (coin: Coin): Promise<void> => {
    try {
      const dbCoin = coinToDbCoin(coin);
      const { error } = await supabase
        .from('coins')
        .insert([dbCoin]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving coin:', error);
      throw error;
    }
  },

  updateCoin: async (id: string, updates: Partial<Coin>): Promise<void> => {
    try {
      const dbUpdates = coinToDbCoin(updates as Coin);
      const { error } = await supabase
        .from('coins')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating coin:', error);
      throw error;
    }
  },

  deleteCoin: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('coins')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting coin:', error);
      throw error;
    }
  },

  getCoinById: async (id: string): Promise<Coin | undefined> => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data ? dbCoinToCoin(data as DbCoin) : undefined;
    } catch (error) {
      console.error('Error getting coin:', error);
      return undefined;
    }
  },

  uploadImage: async (file: File, coinId: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${coinId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('coin-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('coin-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },

  deleteImage: async (imageUrl: string): Promise<void> => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/coin-images/');
      if (urlParts.length < 2) return;

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from('coin-images')
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
};