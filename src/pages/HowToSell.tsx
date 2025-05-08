
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowToSell = () => {
  const { language, t } = useLanguage();
  
  const steps = [
    {
      title: t('createAccount'),
      description: t('createAccountDesc')
    },
    {
      title: t('addListing2'),
      description: t('addListingDesc')
    },
    {
      title: t('uploadImages'),
      description: t('uploadImagesDesc')
    },
    {
      title: t('setPrice'),
      description: t('setPriceDesc')
    },
    {
      title: t('publishListing'),
      description: t('publishListingDesc')
    },
    {
      title: t('communicateWithBuyers'),
      description: t('communicateWithBuyersDesc')
    },
  ];

  const tips = [
    t('tip1'),
    t('tip2'),
    t('tip3'),
    t('tip4'),
    t('tip5'),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text={t('howToSell')} size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text={t('sellingProcess')} />
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow border border-syrian-green/20">
                <div className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-syrian-green rounded-full flex items-center justify-center text-white mr-3">
                    <span>{index + 1}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-syrian-dark ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <ArabicText text={step.title} />
                  </h3>
                </div>
                <p className={`text-syrian-dark/70 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <ArabicText text={step.description} />
                </p>
              </Card>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border border-syrian-green/20 mb-12">
            <h2 className={`text-2xl font-bold text-syrian-dark mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <ArabicText text={t('sellingTips')} />
            </h2>
            
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className={`flex items-center ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
                  {language === 'ar' ? (
                    <>
                      <span className="text-right">
                        <ArabicText text={tip} />
                      </span>
                      <Check className="h-5 w-5 text-syrian-green ml-3" />
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5 text-syrian-green mr-3" />
                      <span>{tip}</span>
                    </>
                  )}
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
