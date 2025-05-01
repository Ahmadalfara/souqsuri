
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: 'كيف يمكنني إنشاء حساب؟',
      answer: 'يمكنك إنشاء حساب بالنقر على زر "تسجيل الدخول" في الأعلى، ثم اختيار "إنشاء حساب" وإدخال بياناتك الشخصية واتباع التعليمات.'
    },
    {
      question: 'كيف أضيف إعلاناً جديداً؟',
      answer: 'بعد تسجيل الدخول، انقر على زر "إضافة إعلان" في الأعلى، ثم قم بتعبئة النموذج وإضافة الصور واضغط على زر "نشر الإعلان".'
    },
    {
      question: 'هل يمكنني تعديل إعلاني بعد نشره؟',
      answer: 'نعم، يمكنك تعديل إعلانك في أي وقت من خلال الذهاب إلى صفحة الملف الشخصي، ثم النقر على "إعلاناتي" واختيار الإعلان المراد تعديله.'
    },
    {
      question: 'كم من الوقت يبقى الإعلان نشطاً؟',
      answer: 'تبقى الإعلانات نشطة لمدة 30 يوماً، ويمكن تجديدها بسهولة من صفحة الملف الشخصي.'
    },
    {
      question: 'كيف أجعل إعلاني مميزاً؟',
      answer: 'يمكنك ترقية إعلانك ليصبح مميزاً من خلال الذهاب إلى تفاصيل الإعلان، ثم النقر على زر "جعل الإعلان مميزاً" واختيار إحدى باقات التمييز.'
    },
    {
      question: 'كيف يمكنني التواصل مع البائع؟',
      answer: 'يمكنك التواصل مع البائع من خلال النقر على زر "اتصال" أو "مراسلة" في صفحة تفاصيل الإعلان.'
    },
    {
      question: 'هل يمكنني حذف إعلاني؟',
      answer: 'نعم، يمكنك حذف إعلانك في أي وقت من خلال الذهاب إلى صفحة الملف الشخصي، ثم النقر على "إعلاناتي" واختيار الإعلان المراد حذفه، ثم الضغط على زر "حذف".'
    },
    {
      question: 'هل الموقع آمن للشراء والبيع؟',
      answer: 'نعم، نحن نتخذ جميع الإجراءات اللازمة لضمان أمان المعاملات، لكننا ننصح دائماً بالتحقق من البائع أو المشتري قبل إتمام أي عملية بيع أو شراء.'
    },
    {
      question: 'كيف يمكنني الإبلاغ عن إعلان مخالف؟',
      answer: 'يمكنك الإبلاغ عن إعلان مخالف من خلال النقر على زر "الإبلاغ عن إعلان" في صفحة تفاصيل الإعلان.'
    },
    {
      question: 'هل يمكنني تغيير بيانات حسابي؟',
      answer: 'نعم، يمكنك تغيير بيانات حسابك في أي وقت من خلال الذهاب إلى صفحة الملف الشخصي، ثم النقر على "إعدادات الحساب".'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="الأسئلة الشائعة" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="إجابات على الأسئلة الأكثر شيوعاً حول استخدام موقعنا" />
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full" dir="rtl">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-syrian-green/20">
                  <AccordionTrigger className="text-right font-bold text-syrian-dark hover:text-syrian-green">
                    <ArabicText text={faq.question} />
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-syrian-dark/70">
                    <ArabicText text={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default FAQ;
