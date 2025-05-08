
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
    created_at: '2025-05-01T10:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 1, name_ar: 'المزة', name_en: 'Al Mazzeh' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
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
    created_at: '2025-04-28T14:20:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 5, name_ar: 'الجميلية', name_en: 'Al Jamiliyah' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
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
    created_at: '2025-05-07T09:15:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 3, name_ar: 'قدسيا', name_en: 'Qudsaya' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
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
    created_at: '2025-05-05T16:45:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 10, name_ar: 'الرمل الشمالي', name_en: 'Northern Sand' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
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
    created_at: '2025-05-03T11:20:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 2, name_ar: 'المهاجرين', name_en: 'Al Muhajirin' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
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
    created_at: '2025-05-02T15:30:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 6, name_ar: 'الشهباء', name_en: 'Al Shahbaa' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
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
    created_at: '2025-04-29T14:10:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 11, name_ar: 'الأوقاف', name_en: 'Al Awqaf' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
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
    created_at: '2025-05-06T12:15:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
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
    created_at: '2025-05-07T10:25:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 1, name_ar: 'المزة', name_en: 'Al Mazzeh' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
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
    created_at: '2025-05-01T13:40:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 5, name_ar: 'الجميلية', name_en: 'Al Jamiliyah' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
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
    created_at: '2025-05-04T15:50:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 10, name_ar: 'الرمل الشمالي', name_en: 'Northern Sand' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
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
    created_at: '2025-04-30T09:15:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 4, name_ar: 'المالكي', name_en: 'Al Malki' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
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
    created_at: '2025-05-05T14:20:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 6, name_ar: 'الشهباء', name_en: 'Al Shahbaa' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
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
    created_at: '2025-05-02T16:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 2, name_ar: 'المهاجرين', name_en: 'Al Muhajirin' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
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
    created_at: '2025-04-29T11:20:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
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
    created_at: '2025-05-07T13:45:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 11, name_ar: 'الأوقاف', name_en: 'Al Awqaf' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
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
    created_at: '2025-05-06T09:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 1, name_ar: 'المزة', name_en: 'Al Mazzeh' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
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
    created_at: '2025-05-03T14:15:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 5, name_ar: 'الجميلية', name_en: 'Al Jamiliyah' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
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
    created_at: '2025-04-30T10:45:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 10, name_ar: 'الرمل الشمالي', name_en: 'Northern Sand' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
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
    created_at: '2025-05-07T16:20:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
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
    created_at: '2025-05-04T12:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 2, name_ar: 'المهاجرين', name_en: 'Al Muhajirin' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
  },
  {
    id: '22',
    title: 'خدمات نقل وتوصيل',
    title_en: 'Transport and Delivery Services',
    description: 'خدمات نقل البضائع والأثاث داخل المدينة وبين المحافظات.',
    description_en: 'Goods and furniture transport services within the city and between governorates.',
    price: 200,
    currency: 'USD',
    category: 'services',
    is_featured: false,
    created_at: '2025-05-01T09:45:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 6, name_ar: 'الشهباء', name_en: 'Al Shahbaa' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
  },
  {
    id: '23',
    title: 'صيانة أجهزة كهربائية',
    title_en: 'Electrical Appliance Maintenance',
    description: 'صيانة جميع أنواع الأجهزة المنزلية والكهربائية بضمان.',
    description_en: 'Maintenance of all types of household and electrical appliances with warranty.',
    price: 100,
    currency: 'USD',
    category: 'services',
    is_featured: true,
    created_at: '2025-05-06T15:10:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 11, name_ar: 'الأوقاف', name_en: 'Al Awqaf' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
  },
  {
    id: '24',
    title: 'دروس خصوصية',
    title_en: 'Private Lessons',
    description: 'دروس خصوصية في الرياضيات والفيزياء للمرحلة الثانوية.',
    description_en: 'Private lessons in mathematics and physics for high school students.',
    price: 30,
    currency: 'USD',
    category: 'services',
    is_featured: false,
    created_at: '2025-04-29T16:50:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
  },
  
  // Fashion Listings (4)
  {
    id: '25',
    title: 'فستان سهرة فاخر',
    title_en: 'Luxury Evening Dress',
    description: 'فستان سهرة فاخر، لون أحمر، مقاس M، استخدام مرة واحدة فقط.',
    description_en: 'Luxury evening dress, red color, size M, used only once.',
    price: 200,
    currency: 'USD',
    category: 'fashion',
    is_featured: true,
    created_at: '2025-05-05T17:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 1, name_ar: 'المزة', name_en: 'Al Mazzeh' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
  },
  {
    id: '26',
    title: 'حذاء رياضي نايك',
    title_en: 'Nike Sneakers',
    description: 'حذاء رياضي نايك أصلي، مقاس 43، لون أسود، جديد.',
    description_en: 'Original Nike sneakers, size 43, black color, new.',
    price: 150,
    currency: 'USD',
    category: 'fashion',
    is_featured: false,
    created_at: '2025-05-02T13:15:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 5, name_ar: 'الجميلية', name_en: 'Al Jamiliyah' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
  },
  {
    id: '27',
    title: 'حقيبة يد ماركة',
    title_en: 'Designer Handbag',
    description: 'حقيبة يد ماركة، جلد طبيعي، لون بني، حالة ممتازة.',
    description_en: 'Designer handbag, genuine leather, brown color, excellent condition.',
    price: 300,
    currency: 'USD',
    category: 'fashion',
    is_featured: true,
    created_at: '2025-05-07T11:40:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 10, name_ar: 'الرمل الشمالي', name_en: 'Northern Sand' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
  },
  {
    id: '28',
    title: 'بدلة رجالية أنيقة',
    title_en: 'Elegant Men\'s Suit',
    description: 'بدلة رجالية أنيقة، لون كحلي، مقاس 52، قماش إيطالي.',
    description_en: 'Elegant men\'s suit, navy blue color, size 52, Italian fabric.',
    price: 400,
    currency: 'USD',
    category: 'fashion',
    is_featured: false,
    created_at: '2025-04-30T14:25:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 4, name_ar: 'المالكي', name_en: 'Al Malki' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
  },
  
  // Books Listings (4)
  {
    id: '29',
    title: 'رواية مئة عام من العزلة',
    title_en: 'One Hundred Years of Solitude Novel',
    description: 'رواية مئة عام من العزلة للكاتب غابرييل غارسيا ماركيز، طبعة جديدة.',
    description_en: 'One Hundred Years of Solitude novel by Gabriel Garcia Marquez, new edition.',
    price: 20,
    currency: 'USD',
    category: 'books',
    is_featured: true,
    created_at: '2025-05-06T10:15:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 2, name_ar: 'المهاجرين', name_en: 'Al Muhajirin' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
  },
  {
    id: '30',
    title: 'كتب دراسية جامعية',
    title_en: 'University Textbooks',
    description: 'مجموعة كتب دراسية لكلية الهندسة، حالة جيدة.',
    description_en: 'Set of textbooks for the Faculty of Engineering, good condition.',
    price: 50,
    currency: 'USD',
    category: 'books',
    is_featured: false,
    created_at: '2025-05-03T09:50:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 6, name_ar: 'الشهباء', name_en: 'Al Shahbaa' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
  },
  {
    id: '31',
    title: 'قاموس إنجليزي - عربي',
    title_en: 'English-Arabic Dictionary',
    description: 'قاموس إنجليزي - عربي شامل، أكثر من 50,000 كلمة ومصطلح.',
    description_en: 'Comprehensive English-Arabic dictionary, more than 50,000 words and terms.',
    price: 30,
    currency: 'USD',
    category: 'books',
    is_featured: true,
    created_at: '2025-04-29T15:35:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 11, name_ar: 'الأوقاف', name_en: 'Al Awqaf' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
  },
  {
    id: '32',
    title: 'كتاب طبخ شامل',
    title_en: 'Comprehensive Cookbook',
    description: 'كتاب طبخ شامل يحتوي على أكثر من 500 وصفة متنوعة.',
    description_en: 'Comprehensive cookbook containing more than 500 various recipes.',
    price: 25,
    currency: 'USD',
    category: 'books',
    is_featured: false,
    created_at: '2025-05-01T16:10:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
  },
  
  // Pets Listings (4)
  {
    id: '33',
    title: 'قطة شيرازي للبيع',
    title_en: 'Persian Cat for Sale',
    description: 'قطة شيرازي بيضاء، عمر 3 أشهر، مطعمة بالكامل.',
    description_en: 'White Persian cat, 3 months old, fully vaccinated.',
    price: 150,
    currency: 'USD',
    category: 'pets',
    is_featured: true,
    created_at: '2025-05-07T14:30:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 1, name_ar: 'المزة', name_en: 'Al Mazzeh' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
  },
  {
    id: '34',
    title: 'كلب جيرمن شيبرد',
    title_en: 'German Shepherd Dog',
    description: 'كلب جيرمن شيبرد، عمر سنة، مدرب على الطاعة والحراسة.',
    description_en: 'German Shepherd dog, 1 year old, trained for obedience and guarding.',
    price: 400,
    currency: 'USD',
    category: 'pets',
    is_featured: false,
    created_at: '2025-05-04T11:15:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 5, name_ar: 'الجميلية', name_en: 'Al Jamiliyah' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
  },
  {
    id: '35',
    title: 'أحواض سمك مع إكسسوارات',
    title_en: 'Fish Tanks with Accessories',
    description: 'أحواض سمك مختلفة الأحجام مع إكسسوارات كاملة.',
    description_en: 'Fish tanks of various sizes with complete accessories.',
    price: 80,
    currency: 'USD',
    category: 'pets',
    is_featured: true,
    created_at: '2025-04-30T13:20:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 10, name_ar: 'الرمل الشمالي', name_en: 'Northern Sand' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
  },
  {
    id: '36',
    title: 'طيور كناري للبيع',
    title_en: 'Canary Birds for Sale',
    description: 'طيور كناري مغردة، ألوان متنوعة، صحية وحيوية.',
    description_en: 'Singing canary birds, various colors, healthy and lively.',
    price: 40,
    currency: 'USD',
    category: 'pets',
    is_featured: false,
    created_at: '2025-05-02T10:50:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
  },
  
  // Sports Listings (4)
  {
    id: '37',
    title: 'دراجة هوائية جبلية',
    title_en: 'Mountain Bike',
    description: 'دراجة هوائية جبلية، ماركة عالمية، 21 سرعة، إطارات مقاومة للثقب.',
    description_en: 'Mountain bike, global brand, 21 speeds, puncture-resistant tires.',
    price: 300,
    currency: 'USD',
    category: 'sports',
    is_featured: true,
    created_at: '2025-05-06T11:40:00Z',
    governorate: { id: 1, name_ar: 'دمشق', name_en: 'Damascus' },
    district: { id: 2, name_ar: 'المهاجرين', name_en: 'Al Muhajirin' },
    images: ['/lovable-uploads/1e0deb8b-a2b8-42ab-90b6-ac4374de1d73.png']
  },
  {
    id: '38',
    title: 'طاولة تنس كاملة',
    title_en: 'Complete Table Tennis Set',
    description: 'طاولة تنس كاملة مع مضارب وكرات وشبكة، قابلة للطي.',
    description_en: 'Complete table tennis set with paddles, balls, and net, foldable.',
    price: 250,
    currency: 'USD',
    category: 'sports',
    is_featured: false,
    created_at: '2025-05-01T15:20:00Z',
    governorate: { id: 2, name_ar: 'حلب', name_en: 'Aleppo' },
    district: { id: 6, name_ar: 'الشهباء', name_en: 'Al Shahbaa' },
    images: ['/lovable-uploads/bb819a7c-7051-46c6-b20e-8ffef70e45d0.png']
  },
  {
    id: '39',
    title: 'معدات رياضية منزلية',
    title_en: 'Home Gym Equipment',
    description: 'معدات رياضية منزلية كاملة، حالة ممتازة، قليلة الاستخدام.',
    description_en: 'Complete home gym equipment, excellent condition, lightly used.',
    price: 500,
    currency: 'USD',
    category: 'sports',
    is_featured: true,
    created_at: '2025-04-29T12:10:00Z',
    governorate: { id: 3, name_ar: 'اللاذقية', name_en: 'Latakia' },
    district: { id: 11, name_ar: 'الأوقاف', name_en: 'Al Awqaf' },
    images: ['/lovable-uploads/c2543a79-754d-4173-9d08-265638dc66e5.png']
  },
  {
    id: '40',
    title: 'ملابس رياضية أصلية',
    title_en: 'Original Sports Clothing',
    description: 'ملابس رياضية أصلية، ماركات عالمية، مقاسات متنوعة.',
    description_en: 'Original sports clothing, global brands, various sizes.',
    price: 100,
    currency: 'USD',
    category: 'sports',
    is_featured: false,
    created_at: '2025-05-05T09:45:00Z',
    governorate: { id: 4, name_ar: 'حمص', name_en: 'Homs' },
    district: { id: 15, name_ar: 'الخالدية', name_en: 'Al Khalidiyah' },
    images: ['/lovable-uploads/e71c435a-b8b5-4801-b631-a311f24b034f.png']
  }
];

/**
 * Search listings based on the provided filters
 * @param filters The filters to apply to the search
 * @returns List of listings that match the filters
 */
export const searchListings = (filters: ListingFilters): Promise<ListingWithRelations[]> => {
  console.log('Searching with filters:', filters);
  
  // In a real app, this would be an API call to a database
  // For this example, we'll use mock data
  console.log('Using mock data instead of DB call for search');
  
  let results = [...mockListingsData];
  
  // Apply category filter if specified
  if (filters.category) {
    console.log('Mapping category \'' + filters.category + '\' to enum value:', filters.category);
    console.log('Applying category filter:', filters.category, '(mapped to:', filters.category, ')');
    results = results.filter(listing => listing.category === filters.category);
  }
  
  // Apply query filter if specified
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(listing => 
      listing.title?.toLowerCase().includes(query) || 
      listing.description?.toLowerCase().includes(query)
    );
  }
  
  // Apply location filter if specified
  if (filters.governorate_id) {
    results = results.filter(listing => listing.governorate?.id === Number(filters.governorate_id));
  }
  
  if (filters.district_id) {
    results = results.filter(listing => listing.district?.id === Number(filters.district_id));
  }
  
  // Apply price filters if specified
  if (filters.priceMin !== undefined) {
    results = results.filter(listing => (listing.price || 0) >= (filters.priceMin || 0));
  }
  
  if (filters.priceMax !== undefined) {
    results = results.filter(listing => (listing.price || 0) <= (filters.priceMax || 0));
  }
  
  // Apply sorting
  if (filters.sortBy) {
    console.log('Applying sort filter:', filters.sortBy);
    switch (filters.sortBy) {
      case 'newest':
        results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        results.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'price_high_low':
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'price_low_high':
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
    }
  }
  
  // Apply urgent/featured filter
  if (filters.urgent) {
    results = results.filter(listing => listing.is_featured);
  }
  
  console.log('Search results:', results.length);
  return Promise.resolve(results);
};

/**
 * Get featured listings
 * @param count Maximum number of listings to return
 * @returns Featured listings
 */
export const getFeaturedListings = (count: number = 6): Promise<ListingWithRelations[]> => {
  // In a real app, this would be an API call to a database
  // For this example, we'll filter and return the mock data
  const featuredListings = mockListingsData
    .filter(listing => listing.is_featured)
    .sort(() => Math.random() - 0.5) // Randomize the order
    .slice(0, count);
  
  return Promise.resolve(featuredListings);
};

/**
 * Get listings by category
 * @param category The category name to filter by
 * @param count Maximum number of listings to return
 * @returns List of listings in the specified category
 */
export const getListingsByCategory = (category: string, count = 12): Promise<ListingWithRelations[]> => {
  // In a real app, this would be an API call to the database
  // For this example, we'll filter the mock data
  const categoryListings = mockListingsData
    .filter(listing => listing.category === category)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, count);
  
  return Promise.resolve(categoryListings);
};
