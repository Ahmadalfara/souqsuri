
import React, { useState, useEffect } from 'react';
import { getGovernorates, getDistricts } from '@/services/listingService';
import { getGovernorates as getLocationGovernorates, getDistricts as getLocationDistricts } from '@/services/locationService';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import ArabicText from '../ArabicText';
import { useLanguage } from '@/contexts/LanguageContext';
import { Governorate, District } from '@/services/locationService';

interface LocationSelectorProps {
  onGovernorateChange: (governorateId: string) => void;
  onDistrictChange: (districtId: string) => void;
  onCustomAreaChange?: (customArea: string) => void;
  defaultGovernorate?: string;
  defaultDistrict?: string;
  defaultCustomArea?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onGovernorateChange,
  onDistrictChange,
  onCustomAreaChange,
  defaultGovernorate,
  defaultDistrict,
  defaultCustomArea = '',
}) => {
  const { language, t } = useLanguage();
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>(defaultGovernorate || '');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict || '');
  const [customArea, setCustomArea] = useState<string>(defaultCustomArea);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch governorates on component mount
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        setLoading(true);
        const data = await getLocationGovernorates();
        setGovernorates(data);
      } catch (error) {
        console.error('Error fetching governorates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, []);

  // Fetch districts when governorate changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedGovernorate) {
        try {
          setLoading(true);
          const data = await getLocationDistricts(selectedGovernorate);
          setDistricts(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
          setDistricts([]);
        } finally {
          setLoading(false);
        }
      } else {
        setDistricts([]);
      }
    };

    fetchDistricts();
    // Reset district when governorate changes
    setSelectedDistrict('');
  }, [selectedGovernorate]);

  // Handle governorate change
  const handleGovernorateChange = (value: string) => {
    setSelectedGovernorate(value);
    onGovernorateChange(value);
  };

  // Handle district change
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    onDistrictChange(value);
  };

  // Handle custom area change
  const handleCustomAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomArea(value);
    if (onCustomAreaChange) {
      onCustomAreaChange(value);
    }
  };

  return (
    <div className="space-y-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Governorate Selector with improved scrolling */}
      <div className="space-y-2">
        <Label className={language === 'ar' ? 'text-right block' : ''}>
          {language === 'ar' ? (
            <ArabicText text={t('governorate')} />
          ) : (
            t('governorate')
          )}
        </Label>
        <Select
          value={selectedGovernorate}
          onValueChange={handleGovernorateChange}
          disabled={loading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'ar' ? "اختر المحافظة" : "Select governorate"} />
          </SelectTrigger>
          <SelectContent className="overflow-auto max-h-[300px]">
            <ScrollArea className="h-72 w-full overflow-auto overscroll-contain touch-pan-y">
              <SelectGroup>
                <SelectLabel>
                  {language === 'ar' ? (
                    <ArabicText text={t('governorates')} />
                  ) : (
                    t('governorates')
                  )}
                </SelectLabel>
                {governorates.map(governorate => (
                  <SelectItem key={governorate.id} value={governorate.id}>
                    {language === 'ar' ? governorate.name_ar : governorate.name_en}
                  </SelectItem>
                ))}
              </SelectGroup>
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      {/* District Selector with improved scrolling */}
      {selectedGovernorate && (
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'text-right block' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('district')} />
            ) : (
              t('district')
            )}
          </Label>
          <Select
            value={selectedDistrict}
            onValueChange={handleDistrictChange}
            disabled={loading || districts.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'ar' ? "اختر المنطقة" : "Select district"} />
            </SelectTrigger>
            <SelectContent className="overflow-auto max-h-[300px]">
              <ScrollArea className="h-72 w-full overflow-auto overscroll-contain touch-pan-y">
                <SelectGroup>
                  <SelectLabel>
                    {language === 'ar' ? (
                      <ArabicText text={t('districts')} />
                    ) : (
                      t('districts')
                    )}
                  </SelectLabel>
                  {districts.map(district => (
                    <SelectItem key={district.id} value={district.id}>
                      {language === 'ar' ? district.name_ar : district.name_en}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Custom Area Input - for cases where the user's specific area isn't listed */}
      {onCustomAreaChange && (
        <div className="space-y-2">
          <Label className={language === 'ar' ? 'text-right block' : ''}>
            {language === 'ar' ? (
              <ArabicText text={t('customArea')} />
            ) : (
              t('customArea')
            )}
          </Label>
          <Input
            type="text"
            value={customArea}
            onChange={handleCustomAreaChange}
            placeholder={language === 'ar' ? "أضف منطقة مخصصة" : "Add custom area"}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
