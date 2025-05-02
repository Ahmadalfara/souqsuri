
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';

export type Governorate = Database['public']['Tables']['governorates']['Row'];
export type District = Database['public']['Tables']['districts']['Row'];

export const getGovernorates = async (): Promise<Governorate[]> => {
  try {
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .order('name_ar', { ascending: true });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting governorates:', error);
    return [];
  }
};

export const getGovernorateById = async (id: string): Promise<Governorate | null> => {
  try {
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .eq('id', id)
      .maybeSingle();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error getting governorate by ID:', error);
    return null;
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
