
import { ListingWithRelations, ListingFilters } from '@/types/supabase';

// Mock data with more listings across all categories
const mockListingsData: ListingWithRelations[] = [
  // Real Estate Listings (4)
  {
    id: '1',
    title: 'شقة فاخرة للإيجار',
    title_en: 'Luxury Apartment for Rent',
    description: 'شقة فاخرة في وسط المدينة، 3 غرف نوم، 2 حمام، مطبخ مجهز، إطلالة على البحر.',
    description_en: 'Luxury apartment in downtown, 3 bedrooms, 2 bathrooms, fully equipped kitchen, sea view.',
    price: 1500,
    currency: 'USD',
    category: 'real_estate',
    is_featured: true,
    user_id: '1',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-01T10:30:00Z',
    updated_at: '2025-05-01T10:30:00Z',
    views: 120,
    governorate_id: '1',
    district_id: '1',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '1', name_ar: 'المزة', name_en: 'Al Mazzeh', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '2',
    title: 'منزل مع حديقة للبيع',
    title_en: 'House with Garden for Sale',
    description: 'منزل مستقل مع حديقة خاصة وموقف سيارات.',
    description_en: 'Detached house with private garden and parking.',
    price: 120000,
    currency: 'USD',
    category: 'real_estate',
    is_featured: false,
    user_id: '2',
    status: 'active',
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png'],
    created_at: '2025-04-28T14:20:00Z',
    updated_at: '2025-04-28T14:20:00Z',
    views: 85,
    governorate_id: '2',
    district_id: '5',
    governorate: { id: '2', name_ar: 'حلب', name_en: 'Aleppo', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '5', name_ar: 'الجميلية', name_en: 'Al Jamiliyah', governorate_id: '2', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '3',
    title: 'أرض للبيع في ريف دمشق',
    title_en: 'Land for Sale in Damascus Countryside',
    description: 'قطعة أرض مساحتها 1000 متر مربع، صالحة للبناء والاستثمار.',
    description_en: 'Land plot of 1000 square meters, suitable for building and investment.',
    price: 80000,
    currency: 'USD',
    category: 'real_estate',
    is_featured: true,
    user_id: '3',
    status: 'active',
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png'],
    created_at: '2025-05-07T09:15:00Z',
    updated_at: '2025-05-07T09:15:00Z',
    views: 42,
    governorate_id: '1',
    district_id: '3',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '3', name_ar: 'قدسيا', name_en: 'Qudsaya', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '4',
    title: 'استديو مفروش للإيجار',
    title_en: 'Furnished Studio for Rent',
    description: 'استديو صغير مفروش بالكامل، مناسب للطلاب أو العزاب.',
    description_en: 'Small fully furnished studio, suitable for students or singles.',
    price: 400,
    currency: 'USD',
    category: 'real_estate',
    is_featured: false,
    user_id: '4',
    status: 'active',
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png'],
    created_at: '2025-05-05T16:45:00Z',
    updated_at: '2025-05-05T16:45:00Z',
    views: 63,
    governorate_id: '3',
    district_id: '10',
    governorate: { id: '3', name_ar: 'اللاذقية', name_en: 'Latakia', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '10', name_ar: 'الرمل الشمالي', name_en: 'Northern Sand', governorate_id: '3', created_at: '2025-01-01T00:00:00Z' }
  },
  
  // Cars Listings (4)
  {
    id: '5',
    title: 'سيارة مرسيدس للبيع',
    title_en: 'Mercedes Car for Sale',
    description: 'مرسيدس E200 موديل 2020، لون أسود، حالة ممتازة.',
    description_en: 'Mercedes E200, 2020 model, black color, excellent condition.',
    price: 35000,
    currency: 'USD',
    category: 'cars',
    is_featured: true,
    user_id: '5',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-03T11:20:00Z',
    updated_at: '2025-05-03T11:20:00Z',
    views: 156,
    governorate_id: '1',
    district_id: '2',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '2', name_ar: 'المهاجرين', name_en: 'Al Muhajirin', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '6',
    title: 'تويوتا كورولا بحالة ممتازة',
    title_en: 'Toyota Corolla in Excellent Condition',
    description: 'تويوتا كورولا 2018، لون أبيض، 60,000 كم فقط.',
    description_en: 'Toyota Corolla 2018, white color, only 60,000 km.',
    price: 15000,
    currency: 'USD',
    category: 'cars',
    is_featured: false,
    user_id: '6',
    status: 'active',
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png'],
    created_at: '2025-05-02T15:30:00Z',
    updated_at: '2025-05-02T15:30:00Z',
    views: 92,
    governorate_id: '2',
    district_id: '6',
    governorate: { id: '2', name_ar: 'حلب', name_en: 'Aleppo', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '6', name_ar: 'الشهباء', name_en: 'Al Shahbaa', governorate_id: '2', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '7',
    title: 'هوندا سيفيك للبيع',
    title_en: 'Honda Civic for Sale',
    description: 'هوندا سيفيك 2019، لون رمادي، فل أوبشن.',
    description_en: 'Honda Civic 2019, gray color, full options.',
    price: 18000,
    currency: 'USD',
    category: 'cars',
    is_featured: false,
    user_id: '7',
    status: 'active',
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png'],
    created_at: '2025-04-29T14:10:00Z',
    updated_at: '2025-04-29T14:10:00Z',
    views: 78,
    governorate_id: '3',
    district_id: '11',
    governorate: { id: '3', name_ar: 'اللاذقية', name_en: 'Latakia', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '11', name_ar: 'الأوقاف', name_en: 'Al Awqaf', governorate_id: '3', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '8',
    title: 'كيا سبورتاج',
    title_en: 'Kia Sportage',
    description: 'كيا سبورتاج 2021، لون أزرق، عداد 25,000 كم.',
    description_en: 'Kia Sportage 2021, blue color, 25,000 km on odometer.',
    price: 24000,
    currency: 'USD',
    category: 'cars',
    is_featured: true,
    user_id: '8',
    status: 'active',
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png'],
    created_at: '2025-05-06T12:15:00Z',
    updated_at: '2025-05-06T12:15:00Z',
    views: 110,
    governorate_id: '4',
    district_id: '15',
    governorate: { id: '4', name_ar: 'حمص', name_en: 'Homs', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '15', name_ar: 'الخالدية', name_en: 'Al Khalidiyah', governorate_id: '4', created_at: '2025-01-01T00:00:00Z' }
  },
  
  // Electronics Listings (4)
  {
    id: '9',
    title: 'آيفون 15 برو ماكس',
    title_en: 'iPhone 15 Pro Max',
    description: 'آيفون 15 برو ماكس، 256 جيجا، لون أسود، جديد مع الضمان.',
    description_en: 'iPhone 15 Pro Max, 256GB, black color, new with warranty.',
    price: 1200,
    currency: 'USD',
    category: 'electronics',
    is_featured: true,
    user_id: '9',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-07T10:25:00Z',
    updated_at: '2025-05-07T10:25:00Z',
    views: 135,
    governorate_id: '1',
    district_id: '1',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '1', name_ar: 'المزة', name_en: 'Al Mazzeh', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '10',
    title: 'لابتوب ماك بوك برو',
    title_en: 'MacBook Pro Laptop',
    description: 'ماك بوك برو 16 إنش، M2 برو، 32 جيجا رام، 1 تيرا.',
    description_en: 'MacBook Pro 16 inch, M2 Pro, 32GB RAM, 1TB SSD.',
    price: 2500,
    currency: 'USD',
    category: 'electronics',
    is_featured: false,
    user_id: '10',
    status: 'active',
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png'],
    created_at: '2025-05-01T13:40:00Z',
    updated_at: '2025-05-01T13:40:00Z',
    views: 68,
    governorate_id: '2',
    district_id: '5',
    governorate: { id: '2', name_ar: 'حلب', name_en: 'Aleppo', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '5', name_ar: 'الجميلية', name_en: 'Al Jamiliyah', governorate_id: '2', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '11',
    title: 'تلفزيون سامسونج سمارت 65 إنش',
    title_en: 'Samsung Smart TV 65 inch',
    description: 'تلفزيون سامسونج سمارت 65 إنش، دقة 4K، موديل 2024.',
    description_en: 'Samsung Smart TV 65 inch, 4K resolution, 2024 model.',
    price: 1000,
    currency: 'USD',
    category: 'electronics',
    is_featured: true,
    user_id: '11',
    status: 'active',
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png'],
    created_at: '2025-05-04T15:50:00Z',
    updated_at: '2025-05-04T15:50:00Z',
    views: 102,
    governorate_id: '3',
    district_id: '10',
    governorate: { id: '3', name_ar: 'اللاذقية', name_en: 'Latakia', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '10', name_ar: 'الرمل الشمالي', name_en: 'Northern Sand', governorate_id: '3', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '12',
    title: 'كاميرا كانون احترافية',
    title_en: 'Canon Professional Camera',
    description: 'كاميرا كانون EOS R5، مع عدسة 24-70 ملم.',
    description_en: 'Canon EOS R5 camera with 24-70mm lens.',
    price: 3500,
    currency: 'USD',
    category: 'electronics',
    is_featured: false,
    user_id: '12',
    status: 'active',
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png'],
    created_at: '2025-04-30T09:15:00Z',
    updated_at: '2025-04-30T09:15:00Z',
    views: 55,
    governorate_id: '1',
    district_id: '4',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '4', name_ar: 'المالكي', name_en: 'Al Malki', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  
  // Furniture Listings (4)
  {
    id: '13',
    title: 'غرفة نوم كاملة',
    title_en: 'Complete Bedroom Set',
    description: 'غرفة نوم كاملة، خشب زان، صناعة محلية ممتازة.',
    description_en: 'Complete bedroom set, beech wood, excellent local craftsmanship.',
    price: 2000,
    currency: 'USD',
    category: 'furniture',
    is_featured: true,
    user_id: '13',
    status: 'active',
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png'],
    created_at: '2025-05-05T14:20:00Z',
    updated_at: '2025-05-05T14:20:00Z',
    views: 142,
    governorate_id: '2',
    district_id: '6',
    governorate: { id: '2', name_ar: 'حلب', name_en: 'Aleppo', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '6', name_ar: 'الشهباء', name_en: 'Al Shahbaa', governorate_id: '2', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '14',
    title: 'طقم كنب مودرن',
    title_en: 'Modern Sofa Set',
    description: 'طقم كنب مودرن، 3 قطع، لون رمادي، قماش مستورد مقاوم للبقع.',
    description_en: 'Modern sofa set, 3 pieces, gray color, imported stain-resistant fabric.',
    price: 1500,
    currency: 'USD',
    category: 'furniture',
    is_featured: false,
    user_id: '14',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-02T16:30:00Z',
    updated_at: '2025-05-02T16:30:00Z',
    views: 89,
    governorate_id: '1',
    district_id: '2',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '2', name_ar: 'المهاجرين', name_en: 'Al Muhajirin', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '15',
    title: 'طاولة طعام مع 6 كراسي',
    title_en: 'Dining Table with 6 Chairs',
    description: 'طاولة طعام خشبية مع 6 كراسي، تصميم كلاسيكي أنيق.',
    description_en: 'Wooden dining table with 6 chairs, elegant classic design.',
    price: 1200,
    currency: 'USD',
    category: 'furniture',
    is_featured: false,
    user_id: '15',
    status: 'active',
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png'],
    created_at: '2025-04-29T11:20:00Z',
    updated_at: '2025-04-29T11:20:00Z',
    views: 71,
    governorate_id: '4',
    district_id: '15',
    governorate: { id: '4', name_ar: 'حمص', name_en: 'Homs', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '15', name_ar: 'الخالدية', name_en: 'Al Khalidiyah', governorate_id: '4', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '16',
    title: 'مكتب دراسة للأطفال',
    title_en: 'Children\'s Study Desk',
    description: 'مكتب دراسة للأطفال مع رفوف للكتب وإضاءة LED.',
    description_en: 'Study desk for children with bookshelves and LED lighting.',
    price: 300,
    currency: 'USD',
    category: 'furniture',
    is_featured: true,
    user_id: '16',
    status: 'active',
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png'],
    created_at: '2025-05-07T13:45:00Z',
    updated_at: '2025-05-07T13:45:00Z',
    views: 124,
    governorate_id: '3',
    district_id: '11',
    governorate: { id: '3', name_ar: 'اللاذقية', name_en: 'Latakia', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '11', name_ar: 'الأوقاف', name_en: 'Al Awqaf', governorate_id: '3', created_at: '2025-01-01T00:00:00Z' }
  },
  
  // Jobs Listings (4)
  {
    id: '17',
    title: 'مطلوب مهندس برمجيات',
    title_en: 'Software Engineer Wanted',
    description: 'شركة تقنية رائدة تبحث عن مهندس برمجيات ذو خبرة في الويب والموبايل.',
    description_en: 'Leading tech company looking for software engineer with experience in web and mobile development.',
    price: 1500,
    currency: 'USD',
    category: 'jobs',
    is_featured: true,
    user_id: '17',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-06T09:30:00Z',
    updated_at: '2025-05-06T09:30:00Z',
    views: 115,
    governorate_id: '1',
    district_id: '1',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '1', name_ar: 'المزة', name_en: 'Al Mazzeh', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '18',
    title: 'فرصة عمل في المبيعات',
    title_en: 'Job Opportunity in Sales',
    description: 'مطلوب موظف مبيعات للعمل بدوام كامل في متجر إلكترونيات.',
    description_en: 'Sales representative needed for full-time work in electronics store.',
    price: 600,
    currency: 'USD',
    category: 'jobs',
    is_featured: false,
    user_id: '18',
    status: 'active',
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png'],
    created_at: '2025-05-03T14:15:00Z',
    updated_at: '2025-05-03T14:15:00Z',
    views: 60,
    governorate_id: '2',
    district_id: '5',
    governorate: { id: '2', name_ar: 'حلب', name_en: 'Aleppo', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '5', name_ar: 'الجميلية', name_en: 'Al Jamiliyah', governorate_id: '2', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '19',
    title: 'مطلوب محاسب',
    title_en: 'Accountant Needed',
    description: 'شركة تجارية تبحث عن محاسب بخبرة لا تقل عن 3 سنوات.',
    description_en: 'Commercial company looking for accountant with minimum 3 years experience.',
    price: 800,
    currency: 'USD',
    category: 'jobs',
    is_featured: false,
    user_id: '19',
    status: 'active',
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png'],
    created_at: '2025-04-30T10:45:00Z',
    updated_at: '2025-04-30T10:45:00Z',
    views: 48,
    governorate_id: '3',
    district_id: '10',
    governorate: { id: '3', name_ar: 'اللاذقية', name_en: 'Latakia', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '10', name_ar: 'الرمل الشمالي', name_en: 'Northern Sand', governorate_id: '3', created_at: '2025-01-01T00:00:00Z' }
  },
  {
    id: '20',
    title: 'مطلوب سائق',
    title_en: 'Driver Needed',
    description: 'مطلوب سائق مع سيارة للعمل في توصيل الطلبات.',
    description_en: 'Driver with car needed for delivery orders.',
    price: 500,
    currency: 'USD',
    category: 'jobs',
    is_featured: true,
    user_id: '20',
    status: 'active',
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png'],
    created_at: '2025-05-07T16:20:00Z',
    updated_at: '2025-05-07T16:20:00Z',
    views: 95,
    governorate_id: '4',
    district_id: '15',
    governorate: { id: '4', name_ar: 'حمص', name_en: 'Homs', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '15', name_ar: 'الخالدية', name_en: 'Al Khalidiyah', governorate_id: '4', created_at: '2025-01-01T00:00:00Z' }
  },
  
  // Services Listings (4)
  {
    id: '21',
    title: 'خدمات تصميم مواقع إلكترونية',
    title_en: 'Website Design Services',
    description: 'تصميم مواقع احترافية متوافقة مع جميع الأجهزة بأسعار منافسة.',
    description_en: 'Professional website design compatible with all devices at competitive prices.',
    price: 500,
    currency: 'USD',
    category: 'services',
    is_featured: true,
    user_id: '21',
    status: 'active',
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png'],
    created_at: '2025-05-04T12:30:00Z',
    updated_at: '2025-05-04T12:30:00Z',
    views: 108,
    governorate_id: '1',
    district_id: '2',
    governorate: { id: '1', name_ar: 'دمشق', name_en: 'Damascus', created_at: '2025-01-01T00:00:00Z' },
    district: { id: '2', name_ar: 'المهاجرين', name_en: 'Al Muhajirin', governorate_id: '1', created_at: '2025-01-01T00:00:00Z' }
  }
];

/**
 * Search listings based on filters
 */
export const searchListings = (filters: ListingFilters): ListingWithRelations[] => {
  let results = [...mockListingsData];
  
  // Filter by query text (search in title and description)
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(listing => 
      listing.title.toLowerCase().includes(query) || 
      listing.title_en?.toLowerCase().includes(query) ||
      listing.description.toLowerCase().includes(query) || 
      listing.description_en?.toLowerCase().includes(query)
    );
  }
  
  // Filter by category
  if (filters.category) {
    results = results.filter(listing => listing.category === filters.category);
  }
  
  // Filter by governorate
  if (filters.governorate_id) {
    results = results.filter(listing => listing.governorate_id === filters.governorate_id);
  }
  
  // Filter by district
  if (filters.district_id) {
    results = results.filter(listing => listing.district_id === filters.district_id);
  }
  
  // Filter by price range
  if (filters.priceMin !== undefined && filters.priceMin !== null) {
    results = results.filter(listing => listing.price >= filters.priceMin!);
  }
  
  if (filters.priceMax !== undefined && filters.priceMax !== null) {
    results = results.filter(listing => listing.price <= filters.priceMax!);
  }
  
  // Filter by condition (this is a mock field for this example)
  if (filters.condition && filters.condition.length > 0) {
    results = results.filter(listing => {
      if (!listing.condition) return false;
      return filters.condition!.includes(listing.condition);
    });
  }
  
  // Filter by currency
  if (filters.currency) {
    results = results.filter(listing => listing.currency === filters.currency);
  }

  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'views':
        results.sort((a, b) => b.views - a.views);
        break;
    }
  }
  
  // Apply limit if specified
  if (filters.limit !== undefined && filters.limit !== null) {
    results = results.slice(0, filters.limit);
  }
  
  return results;
};

/**
 * Get featured listings
 * @param count Maximum number of listings to return
 * @returns Array of featured listings
 */
export const getFeaturedListings = (count: number = 12): Promise<ListingWithRelations[]> => {
  console.log(`Getting featured listings, limit: ${count}`);
  
  // Use the existing search function with is_featured filter
  const featuredListings = mockListingsData
    .filter(listing => listing.is_featured === true)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, count);
  
  // Return as Promise to match expected return type in components
  return Promise.resolve(featuredListings);
};
