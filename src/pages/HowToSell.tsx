
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const HowToSell = () => {
  const steps = [
    {
      title: 'إنشاء حساب',
      description: 'قم بإنشاء حساب جديد أو تسجيل الدخول إلى حسابك الحالي.'
    },
    {
      title: 'إضافة إعلان',
      description: 'انقر على زر "إضافة إعلان" وأدخل البيانات المطلوبة.'
    },
    {
      title: 'رفع الصور',
      description: 'قم بإضافة صور واضحة وجذابة لمنتجك أو خدمتك.'
    },
    {
      title: 'تحديد السعر',
      description: 'ضع سعراً مناسباً للمنتج الخاص بك.'
    },
    {
      title: 'نشر الإعلان',
      description: 'اضغط على زر "نشر الإعلان" وسيظهر إعلانك للمستخدمين.'
    },
    {
      title: 'التواصل مع المشترين',
      description: 'تابع الردود على إعلانك وتواصل مع المشترين المهتمين.'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="كيفية البيع معنا" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="عملية سهلة وبسيطة للغاية تتيح لك الوصول إلى آلاف المشترين المحتملين" />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow border border-syrian-green/20">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-syrian-green rounded-full flex items-center justify-center text-white mr-3">
                    <span>{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-syrian-dark text-right">
                    <ArabicText text={step.title} />
                  </h3>
                </div>
                <p className="text-syrian-dark/70 text-right">
                  <ArabicText text={step.description} />
                </p>
              </Card>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border border-syrian-green/20 mb-12">
            <h2 className="text-2xl font-bold text-syrian-dark mb-6 text-right">
              <ArabicText text="نصائح لبيع أسرع" />
            </h2>
            
            <div className="space-y-4">
              {[
                'استخدم صوراً واضحة وجذابة للمنتج.',
                'كن دقيقاً وصادقاً في وصف المنتج.',
                'حدد سعراً معقولاً ومناسباً للسوق.',
                'قم بالرد السريع على استفسارات المشترين.',
                'أضف معلومات الاتصال الصحيحة.',
              ].map((tip, index) => (
                <div key={index} className="flex items-center justify-end">
                  <span className="text-right">
                    <ArabicText text={tip} />
                  </span>
                  <Check className="h-5 w-5 text-syrian-green ml-3" />
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default HowToSell;
