
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
import { useLanguage } from '@/contexts/LanguageContext';

const FAQ = () => {
  const { language, t } = useLanguage();
  
  const faqs = [
    {
      question: t('howToCreateAccount'),
      answer: t('howToCreateAccountAnswer')
    },
    {
      question: t('howToAddListing'),
      answer: t('howToAddListingAnswer')
    },
    {
      question: t('canEditListing'),
      answer: t('canEditListingAnswer')
    },
    {
      question: t('howLongListingActive'),
      answer: t('howLongListingActiveAnswer')
    },
    {
      question: t('howToMakeListingFeatured'),
      answer: t('howToMakeListingFeaturedAnswer')
    },
    {
      question: t('howToContactSeller'),
      answer: t('howToContactSellerAnswer')
    },
    {
      question: t('canDeleteListing'),
      answer: t('canDeleteListingAnswer')
    },
    {
      question: t('isSiteSafe'),
      answer: t('isSiteSafeAnswer')
    },
    {
      question: t('howToReportListing'),
      answer: t('howToReportListingAnswer')
    },
    {
      question: t('canChangeAccountInfo'),
      answer: t('canChangeAccountInfoAnswer')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text={t('faq')} size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text={t('faqDesc')} />
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-syrian-green/20">
                  <AccordionTrigger className={`${language === 'ar' ? 'text-right' : 'text-left'} font-bold text-syrian-dark hover:text-syrian-green`}>
                    <ArabicText text={faq.question} />
                  </AccordionTrigger>
                  <AccordionContent className={`${language === 'ar' ? 'text-right' : 'text-left'} text-syrian-dark/70`}>
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
