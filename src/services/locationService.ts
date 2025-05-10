
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

export type Governorate = Database['public']['Tables']['governorates']['Row'];
export type District = Database['public']['Tables']['districts']['Row'];

// Full list of Syrian governorates
export const syrianGovernorates = [
  { id: 'damascus', name_ar: 'دمشق', name_en: 'Damascus' },
  { id: 'damascus_countryside', name_ar: 'ريف دمشق', name_en: 'Damascus Countryside' },
  { id: 'aleppo', name_ar: 'حلب', name_en: 'Aleppo' },
  { id: 'homs', name_ar: 'حمص', name_en: 'Homs' },
  { id: 'hama', name_ar: 'حماة', name_en: 'Hama' },
  { id: 'latakia', name_ar: 'اللاذقية', name_en: 'Latakia' },
  { id: 'tartus', name_ar: 'طرطوس', name_en: 'Tartus' },
  { id: 'idlib', name_ar: 'إدلب', name_en: 'Idlib' },
  { id: 'deir_ez_zor', name_ar: 'دير الزور', name_en: 'Deir ez-Zor' },
  { id: 'raqqa', name_ar: 'الرقة', name_en: 'Raqqa' },
  { id: 'hasakah', name_ar: 'الحسكة', name_en: 'Hasakah' },
  { id: 'daraa', name_ar: 'درعا', name_en: 'Daraa' },
  { id: 'sweida', name_ar: 'السويداء', name_en: 'Sweida' },
  { id: 'quneitra', name_ar: 'القنيطرة', name_en: 'Quneitra' }
];

export const getGovernorates = async (): Promise<Governorate[]> => {
  try {
    // First try to get from Supabase
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .order('name_ar', { ascending: true });
      
    if (error) {
      console.error('Error getting governorates from Supabase:', error);
      // If Supabase fails, return the static list
      return syrianGovernorates as Governorate[];
    }
    
    // If Supabase returned no data, return the static list
    if (!data || data.length === 0) {
      return syrianGovernorates as Governorate[];
    }
    
    return data;
  } catch (error) {
    console.error('Error getting governorates:', error);
    // In case of any error, fall back to the static list
    return syrianGovernorates as Governorate[];
  }
};

export const getGovernorateById = async (id: string): Promise<Governorate | null> => {
  try {
    // First try to get from Supabase
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error || !data) {
      // If Supabase fails, try to find in the static list
      const governorate = syrianGovernorates.find(g => g.id === id);
      if (governorate) {
        return governorate as Governorate;
      }
      
      console.error('Error getting governorate by ID:', error || 'Not found');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting governorate by ID:', error);
    
    // Try to find in static list as fallback
    const governorate = syrianGovernorates.find(g => g.id === id);
    return governorate ? governorate as Governorate : null;
  }
};

export const getDistricts = async (governorateId: string): Promise<District[]> => {
  try {
    const { data, error } = await supabase
      .from('districts')
      .select('*')
      .eq('governorate_id', governorateId)
      .order('name_ar', { ascending: true });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting districts:', error);
    return [];
  }
};

export const getDistrictById = async (id: string): Promise<District | null> => {
  try {
    const { data, error } = await supabase
      .from('districts')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting district by ID:', error);
    return null;
  }
};

export const getLocationNameByIds = async (
  governorateId: string | null, 
  districtId: string | null, 
  language = 'ar'
): Promise<string> => {
  try {
    let locationParts: string[] = [];
    
    // Get district name if provided
    if (districtId) {
      const district = await getDistrictById(districtId);
      if (district) {
        locationParts.push(language === 'ar' ? district.name_ar : district.name_en);
      }
    }
    
    // Get governorate name if provided
    if (governorateId) {
      const governorate = await getGovernorateById(governorateId);
      if (governorate) {
        locationParts.push(language === 'ar' ? governorate.name_ar : governorate.name_en);
      }
    }
    
    return locationParts.join(', ');
  } catch (error) {
    console.error('Error getting location name by IDs:', error);
    return '';
  }
};
