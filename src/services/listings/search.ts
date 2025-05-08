
import { supabase } from '@/integrations/supabase/client';
import { ListingWithRelations } from '@/types/supabase';

interface ListingFilters {
  query?: string;
  category?: string;
  governorate_id?: string;
  district_id?: string;
  location?: string; // Added for named locations that aren't IDs
  priceMin?: number;
  priceMax?: number;
  condition?: string[];
  sortBy?: string;
  urgent?: boolean;
  showWithImagesOnly?: boolean;
  currency?: string;
}

// Map frontend category names to database enum values
const mapCategoryToEnum = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'real_estate': 'real_estate',
    'cars': 'vehicles',
    'clothes': 'clothing',
    'electronics': 'electronics',
    'furniture': 'furniture',
    'jobs': 'jobs',
    'services': 'services'
  };
  
  console.log(`Mapping category '${category}' to enum value: ${categoryMap[category] || category}`);
  return categoryMap[category] || category;
};

// Define interfaces for mock data to match required database types
interface MockGovernorate {
  id: string;
  name_ar: string;
  name_en: string;
  created_at: string;
}

interface MockDistrict {
  id: string;
  governorate_id: string;
  name_ar: string;
  name_en: string;
  created_at: string;
}

// Extended interface for mock listings to include English fields
interface MockListingWithRelations extends ListingWithRelations {
  title_en?: string;
  description_en?: string;
  category_ar?: string;
  category_en?: string;
  condition?: string;
}

// Mock data for testing
const mockListings: MockListingWithRelations[] = [
  // Real Estate listings
  {
    id: 'real-estate-1',
    title: 'شقة فاخرة في قلب دمشق',
    title_en: 'Luxury apartment in Damascus center',
    description: 'شقة واسعة مع إطلالات رائعة على المدينة',
    description_en: 'Spacious apartment with amazing city views',
    price: 75000000,
    currency: 'SYP',
    category: 'real_estate',
    category_ar: 'العقارات',
    category_en: 'Real Estate',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/real-estate-1.jpg'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 'mock-user-1',
    governorate_id: 'damascus',
    district_id: 'center',
    is_featured: true,
    status: 'active',
    views: 120,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'center', 
      name_ar: 'وسط المدينة', 
      name_en: 'City Center',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'real-estate-2',
    title: 'فيلا مع حديقة في حلب',
    title_en: 'Villa with garden in Aleppo',
    description: 'فيلا فاخرة مع حديقة واسعة ومسبح',
    description_en: 'Luxury villa with large garden and pool',
    price: 120000000,
    currency: 'SYP',
    category: 'real_estate',
    category_ar: 'العقارات',
    category_en: 'Real Estate',
    condition: 'good',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/real-estate-2.jpg'],
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    user_id: 'mock-user-2',
    governorate_id: 'aleppo',
    district_id: 'north',
    is_featured: false,
    status: 'active',
    views: 85,
    governorate: { 
      id: 'aleppo', 
      name_ar: 'حلب', 
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'north', 
      name_ar: 'الشمال', 
      name_en: 'North',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'real-estate-3',
    title: 'شقة مفروشة للإيجار في اللاذقية',
    title_en: 'Furnished apartment for rent in Latakia',
    description: 'شقة مفروشة بالكامل للإيجار في منطقة هادئة قرب البحر',
    description_en: 'Fully furnished apartment for rent in a quiet area near the sea',
    price: 750000,
    currency: 'SYP',
    category: 'real_estate',
    category_ar: 'العقارات',
    category_en: 'Real Estate',
    condition: 'excellent',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/real-estate-3.jpg'],
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user_id: 'mock-user-3',
    governorate_id: 'latakia',
    district_id: 'corniche',
    is_featured: true,
    status: 'active',
    views: 143,
    governorate: {
      id: 'latakia',
      name_ar: 'اللاذقية',
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'corniche',
      name_ar: 'الكورنيش',
      name_en: 'Corniche',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'real-estate-4',
    title: 'أرض زراعية للبيع في حمص',
    title_en: 'Agricultural land for sale in Homs',
    description: 'قطعة أرض زراعية خصبة مساحة 5000 متر مربع مع بئر ماء',
    description_en: 'Fertile agricultural land, area 5000 square meters with water well',
    price: 45000000,
    currency: 'SYP',
    category: 'real_estate',
    category_ar: 'العقارات',
    category_en: 'Real Estate',
    condition: 'good',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/real-estate-4.jpg'],
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    user_id: 'mock-user-4',
    governorate_id: 'homs',
    district_id: 'countryside',
    is_featured: false,
    status: 'active',
    views: 98,
    governorate: {
      id: 'homs',
      name_ar: 'حمص',
      name_en: 'Homs',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'countryside',
      name_ar: 'الريف',
      name_en: 'Countryside',
      governorate_id: 'homs',
      created_at: new Date().toISOString()
    }
  },
  
  // Cars listings
  {
    id: 'cars-1',
    title: 'مرسيدس S500 موديل 2018',
    title_en: 'Mercedes S500 2018 model',
    description: 'سيارة بحالة ممتازة، كاملة المواصفات',
    description_en: 'Car in excellent condition, full options',
    price: 150000000,
    currency: 'SYP',
    category: 'vehicles',
    category_ar: 'سيارات',
    category_en: 'Cars',
    condition: 'like_new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/car-1.jpg'],
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    user_id: 'mock-user-3',
    governorate_id: 'damascus',
    district_id: 'mezzeh',
    is_featured: true,
    status: 'active',
    views: 210,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'mezzeh', 
      name_ar: 'المزة', 
      name_en: 'Mezzeh',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'cars-2',
    title: 'كيا سبورتاج 2020',
    title_en: 'Kia Sportage 2020',
    description: 'سيارة اقتصادية مناسبة للعائلة',
    description_en: 'Economic family car',
    price: 90000000,
    currency: 'SYP',
    category: 'vehicles',
    category_ar: 'سيارات',
    category_en: 'Cars',
    condition: 'good',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/car-2.jpg'],
    created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 259200000).toISOString(),
    user_id: 'mock-user-4',
    governorate_id: 'latakia',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 150,
    governorate: { 
      id: 'latakia', 
      name_ar: 'اللاذقية', 
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'center', 
      name_ar: 'وسط المدينة', 
      name_en: 'City Center',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'cars-3',
    title: 'هوندا سيفيك 2019',
    title_en: 'Honda Civic 2019',
    description: 'هوندا سيفيك بحالة ممتازة، استعمال شخصي',
    description_en: 'Honda Civic in excellent condition, personal use',
    price: 75000000,
    currency: 'SYP',
    category: 'vehicles',
    category_ar: 'سيارات',
    category_en: 'Cars',
    condition: 'good',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/car-3.jpg'],
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    updated_at: new Date(Date.now() - 345600000).toISOString(),
    user_id: 'mock-user-5',
    governorate_id: 'damascus',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 130,
    governorate: {
      id: 'damascus',
      name_ar: 'دمشق',
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'center',
      name_ar: 'وسط المدينة',
      name_en: 'City Center',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'cars-4',
    title: 'تويوتا لاند كروزر 2015',
    title_en: 'Toyota Land Cruiser 2015',
    description: 'سيارة دفع رباعي فاخرة بحالة جيدة جداً',
    description_en: 'Luxury 4x4 vehicle in very good condition',
    price: 200000000,
    currency: 'SYP',
    category: 'vehicles',
    category_ar: 'سيارات',
    category_en: 'Cars',
    condition: 'excellent',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/car-4.jpg'],
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 432000000).toISOString(),
    user_id: 'mock-user-6',
    governorate_id: 'aleppo',
    district_id: 'aziziyeh',
    is_featured: true,
    status: 'active',
    views: 185,
    governorate: {
      id: 'aleppo',
      name_ar: 'حلب',
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'aziziyeh',
      name_ar: 'العزيزية',
      name_en: 'Aziziyeh',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  
  // Electronics listings
  {
    id: 'electronics-1',
    title: 'آيفون 13 برو جديد',
    title_en: 'New iPhone 13 Pro',
    description: 'هاتف آيفون 13 برو جديد غير مستخدم',
    description_en: 'Brand new unused iPhone 13 Pro',
    price: 5500000,
    currency: 'SYP',
    category: 'electronics',
    category_ar: 'إلكترونيات',
    category_en: 'Electronics',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/phone-1.jpg'],
    created_at: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    updated_at: new Date(Date.now() - 345600000).toISOString(),
    user_id: 'mock-user-5',
    governorate_id: 'damascus',
    district_id: 'shaalan',
    is_featured: true,
    status: 'active',
    views: 320,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'shaalan', 
      name_ar: 'الشعلان', 
      name_en: 'Shaalan',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'electronics-2',
    title: 'لابتوب HP Core i7',
    title_en: 'HP Laptop Core i7',
    description: 'لابتوب بمواصفات عالية مناسب للألعاب والتصميم',
    description_en: 'High-spec laptop for gaming and design',
    price: 4200000,
    currency: 'SYP',
    category: 'electronics',
    category_ar: 'إلكترونيات',
    category_en: 'Electronics',
    condition: 'used',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/laptop-1.jpg'],
    created_at: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 432000000).toISOString(),
    user_id: 'mock-user-6',
    governorate_id: 'homs',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 175,
    governorate: { 
      id: 'homs', 
      name_ar: 'حمص', 
      name_en: 'Homs',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'center', 
      name_ar: 'وسط المدينة', 
      name_en: 'City Center',
      governorate_id: 'homs',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'electronics-3',
    title: 'سماعات سوني بلوتوث',
    title_en: 'Sony Bluetooth Headphones',
    description: 'سماعات سوني لاسلكية ذات جودة عالية للصوت',
    description_en: 'Sony wireless headphones with high sound quality',
    price: 850000,
    currency: 'SYP',
    category: 'electronics',
    category_ar: 'إلكترونيات',
    category_en: 'Electronics',
    condition: 'like_new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/headphones-1.jpg'],
    created_at: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    updated_at: new Date(Date.now() - 518400000).toISOString(),
    user_id: 'mock-user-7',
    governorate_id: 'damascus',
    district_id: 'mezzeh',
    is_featured: false,
    status: 'active',
    views: 135,
    governorate: {
      id: 'damascus',
      name_ar: 'دمشق',
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'mezzeh',
      name_ar: 'المزة',
      name_en: 'Mezzeh',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'electronics-4',
    title: 'تلفزيون سامسونج سمارت 55 انش',
    title_en: 'Samsung Smart TV 55 inch',
    description: 'تلفزيون ذكي من سامسونج بشاشة 55 انش دقة 4K',
    description_en: 'Samsung Smart TV with 55 inch 4K display',
    price: 3800000,
    currency: 'SYP',
    category: 'electronics',
    category_ar: 'إلكترونيات',
    category_en: 'Electronics',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/tv-1.jpg'],
    created_at: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 604800000).toISOString(),
    user_id: 'mock-user-8',
    governorate_id: 'aleppo',
    district_id: 'center',
    is_featured: true,
    status: 'active',
    views: 220,
    governorate: {
      id: 'aleppo',
      name_ar: 'حلب',
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'center',
      name_ar: 'وسط المدينة',
      name_en: 'City Center',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  
  // Clothes listings
  {
    id: 'clothes-1',
    title: 'فستان سهرة فاخر',
    title_en: 'Luxury evening dress',
    description: 'فستان سهرة راقي مناسب للمناسبات الخاصة',
    description_en: 'Elegant evening dress for special occasions',
    price: 750000,
    currency: 'SYP',
    category: 'clothing',
    category_ar: 'ملابس',
    category_en: 'Clothes',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/dress-1.jpg'],
    created_at: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    updated_at: new Date(Date.now() - 518400000).toISOString(),
    user_id: 'mock-user-7',
    governorate_id: 'damascus',
    district_id: 'malki',
    is_featured: true,
    status: 'active',
    views: 95,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'malki', 
      name_ar: 'المالكي', 
      name_en: 'Malki',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'clothes-2',
    title: 'بدلة رجالية ماركة',
    title_en: 'Brand name men suit',
    description: 'بدلة رجالية راقية من ماركة إيطالية',
    description_en: 'Elegant men suit from Italian brand',
    price: 900000,
    currency: 'SYP',
    category: 'clothing',
    category_ar: 'ملابس',
    category_en: 'Clothes',
    condition: 'like_new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/suit-1.jpg'],
    created_at: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 604800000).toISOString(),
    user_id: 'mock-user-8',
    governorate_id: 'aleppo',
    district_id: 'aziziyeh',
    is_featured: false,
    status: 'active',
    views: 80,
    governorate: { 
      id: 'aleppo', 
      name_ar: 'حلب', 
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'aziziyeh', 
      name_ar: 'العزيزية', 
      name_en: 'Aziziyeh',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'clothes-3',
    title: 'حذاء رياضي نايك',
    title_en: 'Nike sports shoes',
    description: 'حذاء رياضي نايك جديد لون أسود مقاس 43',
    description_en: 'New Nike sports shoes, black color, size 43',
    price: 450000,
    currency: 'SYP',
    category: 'clothing',
    category_ar: 'ملابس',
    category_en: 'Clothes',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/shoes-1.jpg'],
    created_at: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    updated_at: new Date(Date.now() - 691200000).toISOString(),
    user_id: 'mock-user-9',
    governorate_id: 'latakia',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 78,
    governorate: {
      id: 'latakia',
      name_ar: 'اللاذقية',
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'center',
      name_ar: 'وسط المدينة',
      name_en: 'City Center',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'clothes-4',
    title: 'جاكيت جلد أصلي',
    title_en: 'Genuine leather jacket',
    description: 'جاكيت من الجلد الطبيعي بحالة ممتازة',
    description_en: 'Genuine leather jacket in excellent condition',
    price: 650000,
    currency: 'SYP',
    category: 'clothing',
    category_ar: 'ملابس',
    category_en: 'Clothes',
    condition: 'used',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/jacket-1.jpg'],
    created_at: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
    updated_at: new Date(Date.now() - 777600000).toISOString(),
    user_id: 'mock-user-10',
    governorate_id: 'damascus',
    district_id: 'shaalan',
    is_featured: true,
    status: 'active',
    views: 115,
    governorate: {
      id: 'damascus',
      name_ar: 'دمشق',
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'shaalan',
      name_ar: 'الشعلان',
      name_en: 'Shaalan',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  
  // Furniture listings
  {
    id: 'furniture-1',
    title: 'طقم كنب مودرن',
    title_en: 'Modern sofa set',
    description: 'طقم كنب عصري مكون من 3 قطع مع طاولة وسط',
    description_en: 'Modern 3-piece sofa set with center table',
    price: 3500000,
    currency: 'SYP',
    category: 'furniture',
    category_ar: 'أثاث',
    category_en: 'Furniture',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/sofa-1.jpg'],
    created_at: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    updated_at: new Date(Date.now() - 691200000).toISOString(),
    user_id: 'mock-user-9',
    governorate_id: 'damascus',
    district_id: 'mezzeh',
    is_featured: true,
    status: 'active',
    views: 130,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'mezzeh', 
      name_ar: 'المزة', 
      name_en: 'Mezzeh',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'furniture-2',
    title: 'غرفة نوم خشب زان',
    title_en: 'Oak wood bedroom set',
    description: 'غرفة نوم كاملة من خشب الزان الأصلي',
    description_en: 'Complete bedroom set made of genuine oak wood',
    price: 5200000,
    currency: 'SYP',
    category: 'furniture',
    category_ar: 'أثاث',
    category_en: 'Furniture',
    condition: 'good',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/bedroom-1.jpg'],
    created_at: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
    updated_at: new Date(Date.now() - 777600000).toISOString(),
    user_id: 'mock-user-10',
    governorate_id: 'homs',
    district_id: 'hamra',
    is_featured: false,
    status: 'active',
    views: 110,
    governorate: { 
      id: 'homs', 
      name_ar: 'حمص', 
      name_en: 'Homs',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'hamra', 
      name_ar: 'الحمراء', 
      name_en: 'Hamra',
      governorate_id: 'homs',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'furniture-3',
    title: 'طاولة طعام خشبية للعائلة',
    title_en: 'Wooden family dining table',
    description: 'طاولة طعام خشبية كبيرة تتسع لـ8 أشخاص',
    description_en: 'Large wooden dining table for 8 people',
    price: 2100000,
    currency: 'SYP',
    category: 'furniture',
    category_ar: 'أثاث',
    category_en: 'Furniture',
    condition: 'excellent',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/table-1.jpg'],
    created_at: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 864000000).toISOString(),
    user_id: 'mock-user-11',
    governorate_id: 'aleppo',
    district_id: 'north',
    is_featured: false,
    status: 'active',
    views: 95,
    governorate: {
      id: 'aleppo',
      name_ar: 'حلب',
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'north',
      name_ar: 'الشمال',
      name_en: 'North',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'furniture-4',
    title: 'خزانة ملابس بمرآة',
    title_en: 'Wardrobe with mirror',
    description: 'خزانة ملابس عصرية مع مرآة كاملة الارتفاع',
    description_en: 'Modern wardrobe with full-length mirror',
    price: 1800000,
    currency: 'SYP',
    category: 'furniture',
    category_ar: 'أثاث',
    category_en: 'Furniture',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/wardrobe-1.jpg'],
    created_at: new Date(Date.now() - 950400000).toISOString(), // 11 days ago
    updated_at: new Date(Date.now() - 950400000).toISOString(),
    user_id: 'mock-user-12',
    governorate_id: 'latakia',
    district_id: 'corniche',
    is_featured: true,
    status: 'active',
    views: 140,
    governorate: {
      id: 'latakia',
      name_ar: 'اللاذقية',
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'corniche',
      name_ar: 'الكورنيش',
      name_en: 'Corniche',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  },
  
  // Jobs listings
  {
    id: 'jobs-1',
    title: 'مطلوب مهندس برمجيات',
    title_en: 'Software engineer needed',
    description: 'شركة تقنية تبحث عن مهندس برمجيات ذو خبرة',
    description_en: 'Tech company looking for experienced software engineer',
    price: 1000000,
    currency: 'SYP',
    category: 'jobs',
    category_ar: 'وظائف',
    category_en: 'Jobs',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/job-1.jpg'],
    created_at: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 864000000).toISOString(),
    user_id: 'mock-user-11',
    governorate_id: 'damascus',
    district_id: 'baramkeh',
    is_featured: true,
    status: 'active',
    views: 240,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'baramkeh', 
      name_ar: 'البرامكة', 
      name_en: 'Baramkeh',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'jobs-2',
    title: 'وظيفة محاسب',
    title_en: 'Accountant position',
    description: 'مطلوب محاسب للعمل في شركة تجارية',
    description_en: 'Accountant needed for commercial company',
    price: 800000,
    currency: 'SYP',
    category: 'jobs',
    category_ar: 'وظائف',
    category_en: 'Jobs',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/job-2.jpg'],
    created_at: new Date(Date.now() - 950400000).toISOString(), // 11 days ago
    updated_at: new Date(Date.now() - 950400000).toISOString(),
    user_id: 'mock-user-12',
    governorate_id: 'latakia',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 180,
    governorate: { 
      id: 'latakia', 
      name_ar: 'اللاذقية', 
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'center', 
      name_ar: 'وسط المدينة', 
      name_en: 'City Center',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'jobs-3',
    title: 'مطلوب مصمم جرافيك',
    title_en: 'Graphic designer needed',
    description: 'شركة دعاية تبحث عن مصمم جرافيك محترف',
    description_en: 'Advertising company looking for professional graphic designer',
    price: 750000,
    currency: 'SYP',
    category: 'jobs',
    category_ar: 'وظائف',
    category_en: 'Jobs',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/job-3.jpg'],
    created_at: new Date(Date.now() - 1036800000).toISOString(), // 12 days ago
    updated_at: new Date(Date.now() - 1036800000).toISOString(),
    user_id: 'mock-user-13',
    governorate_id: 'damascus',
    district_id: 'malki',
    is_featured: false,
    status: 'active',
    views: 170,
    governorate: {
      id: 'damascus',
      name_ar: 'دمشق',
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'malki',
      name_ar: 'المالكي',
      name_en: 'Malki',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'jobs-4',
    title: 'فرص عمل لمترجمين',
    title_en: 'Job opportunities for translators',
    description: 'مكتب ترجمة يطلب مترجمين من وإلى اللغة الإنكليزية',
    description_en: 'Translation office requesting English translators',
    price: 700000,
    currency: 'SYP',
    category: 'jobs',
    category_ar: 'وظائف',
    category_en: 'Jobs',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/job-4.jpg'],
    created_at: new Date(Date.now() - 1123200000).toISOString(), // 13 days ago
    updated_at: new Date(Date.now() - 1123200000).toISOString(),
    user_id: 'mock-user-14',
    governorate_id: 'aleppo',
    district_id: 'center',
    is_featured: true,
    status: 'active',
    views: 190,
    governorate: {
      id: 'aleppo',
      name_ar: 'حلب',
      name_en: 'Aleppo',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'center',
      name_ar: 'وسط المدينة',
      name_en: 'City Center',
      governorate_id: 'aleppo',
      created_at: new Date().toISOString()
    }
  },
  
  // Services listings
  {
    id: 'services-1',
    title: 'خدمات تصميم مواقع',
    title_en: 'Website design services',
    description: 'تصميم مواقع احترافية بأسعار منافسة',
    description_en: 'Professional website design at competitive prices',
    price: 1500000,
    currency: 'SYP',
    category: 'services',
    category_ar: 'خدمات',
    category_en: 'Services',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/service-1.jpg'],
    created_at: new Date(Date.now() - 1036800000).toISOString(), // 12 days ago
    updated_at: new Date(Date.now() - 1036800000).toISOString(),
    user_id: 'mock-user-13',
    governorate_id: 'damascus',
    district_id: 'tijara',
    is_featured: true,
    status: 'active',
    views: 200,
    governorate: { 
      id: 'damascus', 
      name_ar: 'دمشق', 
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'tijara', 
      name_ar: 'التجارة', 
      name_en: 'Tijara',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'services-2',
    title: 'دروس خصوصية رياضيات',
    title_en: 'Private math lessons',
    description: 'مدرس خبير يقدم دروس رياضيات لجميع المراحل',
    description_en: 'Expert teacher offers math lessons for all levels',
    price: 50000,
    currency: 'SYP',
    category: 'services',
    category_ar: 'خدمات',
    category_en: 'Services',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/service-2.jpg'],
    created_at: new Date(Date.now() - 1123200000).toISOString(), // 13 days ago
    updated_at: new Date(Date.now() - 1123200000).toISOString(),
    user_id: 'mock-user-14',
    governorate_id: 'hama',
    district_id: 'center',
    is_featured: false,
    status: 'active',
    views: 95,
    governorate: { 
      id: 'hama', 
      name_ar: 'حماة', 
      name_en: 'Hama',
      created_at: new Date().toISOString()
    },
    district: { 
      id: 'center', 
      name_ar: 'وسط المدينة', 
      name_en: 'City Center',
      governorate_id: 'hama',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'services-3',
    title: 'خدمات نقل وتوصيل',
    title_en: 'Transport and delivery services',
    description: 'خدمات نقل وتوصيل البضائع داخل وخارج المدينة',
    description_en: 'Transport and delivery services within and outside the city',
    price: 250000,
    currency: 'SYP',
    category: 'services',
    category_ar: 'خدمات',
    category_en: 'Services',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/service-3.jpg'],
    created_at: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
    updated_at: new Date(Date.now() - 1209600000).toISOString(),
    user_id: 'mock-user-1',
    governorate_id: 'damascus',
    district_id: 'mezzeh',
    is_featured: false,
    status: 'active',
    views: 110,
    governorate: {
      id: 'damascus',
      name_ar: 'دمشق',
      name_en: 'Damascus',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'mezzeh',
      name_ar: 'المزة',
      name_en: 'Mezzeh',
      governorate_id: 'damascus',
      created_at: new Date().toISOString()
    }
  },
  {
    id: 'services-4',
    title: 'خدمات تنظيف المنازل',
    title_en: 'Home cleaning services',
    description: 'خدمات تنظيف شاملة للمنازل والمكاتب',
    description_en: 'Comprehensive cleaning services for homes and offices',
    price: 200000,
    currency: 'SYP',
    category: 'services',
    category_ar: 'خدمات',
    category_en: 'Services',
    condition: 'new',
    images: ['https://usxnzaqxdrphdfccrgew.supabase.co/storage/v1/object/public/listings/service-4.jpg'],
    created_at: new Date(Date.now() - 1296000000).toISOString(), // 15 days ago
    updated_at: new Date(Date.now() - 1296000000).toISOString(),
    user_id: 'mock-user-2',
    governorate_id: 'latakia',
    district_id: 'center',
    is_featured: true,
    status: 'active',
    views: 125,
    governorate: {
      id: 'latakia',
      name_ar: 'اللاذقية',
      name_en: 'Latakia',
      created_at: new Date().toISOString()
    },
    district: {
      id: 'center',
      name_ar: 'وسط المدينة',
      name_en: 'City Center',
      governorate_id: 'latakia',
      created_at: new Date().toISOString()
    }
  }
];

export const getListingsByCategory = async (category: string, count = 12): Promise<ListingWithRelations[]> => {
  try {
    console.log(`Fetching listings by category: ${category}`);
    
    // Use mock data instead of DB call for testing
    if (process.env.NODE_ENV === 'development' || true) { // Always use mock data for now
      console.log('Using mock data instead of DB call');
      
      let filteredListings = [...mockListings];
      
      // Only filter by category if it's not 'all'
      if (category && category !== 'all') {
        const dbCategory = mapCategoryToEnum(category);
        console.log(`Applying category filter: ${category} (mapped to: ${dbCategory})`);
        filteredListings = filteredListings.filter(listing => listing.category === dbCategory);
      } else {
        console.log('Showing all categories - no category filter applied');
      }
      
      // Sort by created_at descending (newest first)
      filteredListings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Limit results
      filteredListings = filteredListings.slice(0, count);
      
      console.log(`Retrieved ${filteredListings.length} mock listings for category ${category}`);
      return filteredListings as ListingWithRelations[];
    }
    
    // Original database query code
    let query = supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    // Only filter by category if it's not 'all'
    if (category && category !== 'all') {
      const dbCategory = mapCategoryToEnum(category);
      console.log(`Applying category filter: ${category} (mapped to: ${dbCategory})`);
      query = query.eq('category', dbCategory);
    } else {
      console.log('Showing all categories - no category filter applied');
    }
    
    // Add limit
    query = query.limit(count);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching listings by category:', error);
      throw error;
    }
    
    console.log(`Retrieved ${data?.length || 0} listings for category ${category}`, data);
    return data || [];
  } catch (error) {
    console.error('Error getting listings by category:', error);
    throw error;
  }
};

export const getFeaturedListings = async (count = 8): Promise<ListingWithRelations[]> => {
  try {
    // Use mock data instead of DB call for testing
    if (process.env.NODE_ENV === 'development' || true) { // Always use mock data for now
      console.log('Using mock data instead of DB call for featured listings');
      
      let featuredListings = mockListings.filter(listing => listing.is_featured);
      
      // Sort by created_at descending (newest first)
      featuredListings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      // Limit results
      featuredListings = featuredListings.slice(0, count);
      
      console.log(`Retrieved ${featuredListings.length} mock featured listings`);
      return featuredListings as ListingWithRelations[];
    }
    
    // Original database query
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('is_featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(count);
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting featured listings:', error);
    throw error;
  }
};

export const searchListings = async (filters: ListingFilters): Promise<ListingWithRelations[]> => {
  try {
    console.log("Searching with filters:", filters);
    
    // Use mock data instead of DB call for testing
    if (process.env.NODE_ENV === 'development' || true) { // Always use mock data for now
      console.log('Using mock data instead of DB call for search');
      
      let results = [...mockListings];
      
      // Apply category filter only if category is specified and not 'all'
      if (filters.category && filters.category !== 'all' && filters.category !== '') {
        const dbCategory = mapCategoryToEnum(filters.category);
        console.log("Applying category filter:", filters.category, "(mapped to:", dbCategory, ")");
        results = results.filter(listing => listing.category === dbCategory);
      }
      
      // Apply governorate filter
      if (filters.governorate_id) {
        console.log("Applying governorate filter:", filters.governorate_id);
        results = results.filter(listing => listing.governorate_id === filters.governorate_id);
      }
      
      // Apply district filter
      if (filters.district_id) {
        console.log("Applying district filter:", filters.district_id);
        results = results.filter(listing => listing.district_id === filters.district_id);
      }
      
      // Apply urgent/featured filter
      if (filters.urgent === true) {
        console.log("Applying urgent/featured filter");
        results = results.filter(listing => listing.is_featured === true);
      }
      
      // Apply currency filter
      if (filters.currency) {
        console.log("Applying currency filter:", filters.currency);
        results = results.filter(listing => listing.currency === filters.currency);
      }
      
      // Apply price range filters
      if (filters.priceMin !== undefined && filters.priceMin > 0) {
        console.log("Applying min price filter:", filters.priceMin);
        results = results.filter(listing => listing.price >= filters.priceMin!);
      }
      
      if (filters.priceMax !== undefined && filters.priceMax > 0) {
        console.log("Applying max price filter:", filters.priceMax);
        results = results.filter(listing => listing.price <= filters.priceMax!);
      }
      
      // Apply text search
      if (filters.query) {
        const searchQuery = filters.query.toLowerCase();
        console.log("Applying text search filter:", searchQuery);
        results = results.filter(listing => {
          const matchTitle = listing.title.toLowerCase().includes(searchQuery);
          const matchTitleEn = listing.title_en ? listing.title_en.toLowerCase().includes(searchQuery) : false;
          const matchDesc = listing.description ? listing.description.toLowerCase().includes(searchQuery) : false;
          const matchDescEn = (listing as MockListingWithRelations).description_en ? 
            (listing as MockListingWithRelations).description_en!.toLowerCase().includes(searchQuery) : false;
            
          return matchTitle || matchTitleEn || matchDesc || matchDescEn;
        });
      }
      
      // Apply sorting
      if (filters.sortBy) {
        console.log("Applying sort filter:", filters.sortBy);
        switch (filters.sortBy) {
          case 'price_low_high':
            results.sort((a, b) => a.price - b.price);
            break;
          case 'price_high_low':
            results.sort((a, b) => b.price - a.price);
            break;
          case 'oldest':
            results.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            break;
          case 'views':
            results.sort((a, b) => b.views - a.views);
            break;
          default:
            results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // Newest by default
            break;
        }
      } else {
        results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
      
      // Apply condition filter
      if (filters.condition && filters.condition.length > 0) {
        console.log("Applying condition filter:", filters.condition);
        results = results.filter(listing => {
          const itemCondition = (listing as MockListingWithRelations).condition;
          return !itemCondition || filters.condition!.includes(itemCondition);
        });
      }
      
      // Apply images-only filter
      if (filters.showWithImagesOnly) {
        console.log("Applying images-only filter");
        results = results.filter(listing => 
          listing.images && listing.images.length > 0
        );
      }
      
      console.log("Search results:", results.length);
      return results as ListingWithRelations[];
    }
    
    // Original database query code
    let query = supabase
      .from('listings')
      .select(`
        *,
        governorate:governorate_id(*),
        district:district_id(*)
      `)
      .eq('status', 'active');
    
    // Apply category filter only if category is specified and not 'all'
    if (filters.category && filters.category !== 'all' && filters.category !== '') {
      const dbCategory = mapCategoryToEnum(filters.category);
      console.log("Applying category filter:", filters.category, "(mapped to:", dbCategory, ")");
      query = query.eq('category', dbCategory);
    } else {
      console.log("No category filter applied or showing all categories");
    }
    
    if (filters.governorate_id) {
      console.log("Applying governorate filter:", filters.governorate_id);
      query = query.eq('governorate_id', filters.governorate_id);
    }
    
    if (filters.district_id) {
      console.log("Applying district filter:", filters.district_id);
      query = query.eq('district_id', filters.district_id);
    }
    
    // Location filter by name if no explicit governorate or district
    if (filters.location && filters.location !== 'all' && !filters.governorate_id && !filters.district_id) {
      // This would work better with full-text search or a normalized location field
      console.log("Applying location name filter:", filters.location);
      // In a real implementation, this might be complex with joins or specific fields
    }
    
    if (filters.urgent === true) {
      console.log("Applying urgent/featured filter");
      query = query.eq('is_featured', true);
    }
    
    if (filters.currency) {
      console.log("Applying currency filter:", filters.currency);
      query = query.eq('currency', filters.currency);
    }
    
    // Apply price range filters
    if (filters.priceMin !== undefined && filters.priceMin > 0) {
      console.log("Applying min price filter:", filters.priceMin);
      query = query.gte('price', filters.priceMin);
    }
    
    if (filters.priceMax !== undefined && filters.priceMax > 0) {
      console.log("Applying max price filter:", filters.priceMax);
      query = query.lte('price', filters.priceMax);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      console.log("Applying sort filter:", filters.sortBy);
      switch (filters.sortBy) {
        case 'price_low_high':
          query = query.order('price', { ascending: true });
          break;
        case 'price_high_low':
          query = query.order('price', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'views':
          query = query.order('views', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false }); // Newest by default
          break;
      }
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    // Execute query
    console.log("Executing search query");
    const { data, error } = await query;
    
    if (error) {
      console.error("Search error:", error);
      throw error;
    }
    
    let results = data || [];
    console.log("Search results before filtering:", results.length);
    
    // Client-side filtering for text search
    if (filters.query) {
      const searchQuery = filters.query.toLowerCase();
      console.log("Applying text search filter:", searchQuery);
      results = results.filter(listing => 
        listing.title.toLowerCase().includes(searchQuery) ||
        (listing.description && listing.description.toLowerCase().includes(searchQuery))
      );
      console.log("Search results after text filtering:", results.length);
    }
    
    // Client-side filtering for condition
    if (filters.condition && filters.condition.length > 0) {
      console.log("Applying condition filter:", filters.condition);
      results = results.filter(listing => {
        // Since condition doesn't exist on the base type, we'll need alternative handling
        // This will depend on actual database design
        return true; // Placeholder - should be implemented based on actual data model
      });
      console.log("Search results after condition filtering:", results.length);
    }
    
    // Client-side filtering for images
    if (filters.showWithImagesOnly) {
      console.log("Applying images-only filter");
      results = results.filter(listing => 
        listing.images && listing.images.length > 0
      );
      console.log("Search results after images-only filtering:", results.length);
    }
    
    return results;
  } catch (error) {
    console.error('Error searching listings:', error);
    throw error;
  }
};
