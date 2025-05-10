
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/types/supabase';
import { getDistrictById, getGovernorateById, syrianGovernorates } from '@/services/locationService';

export const getGovernorates = async (): Promise<Database['public']['Tables']['governorates']['Row'][]> => {
  try {
    // First try to get from Supabase
    const { data, error } = await supabase
      .from('governorates')
      .select('*')
      .order('name_ar', { ascending: true });
      
    if (error) {
      console.error('Error getting governorates from Supabase:', error);
      // If Supabase fails, return the static list
      return syrianGovernorates as Database['public']['Tables']['governorates']['Row'][];
    }
    
    // If Supabase returned no data, return the static list
    if (!data || data.length === 0) {
      return syrianGovernorates as Database['public']['Tables']['governorates']['Row'][];
    }
    
    return data;
  } catch (error) {
    console.error('Error getting governorates:', error);
    // In case of any error, fall back to the static list
    return syrianGovernorates as Database['public']['Tables']['governorates']['Row'][];
  }
};

export const getDistricts = async (governorateId: string): Promise<Database['public']['Tables']['districts']['Row'][]> => {
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
