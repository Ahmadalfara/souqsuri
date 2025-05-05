
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent } from '@/components/ui/card';
import CreateListingSheet from './listings/CreateListingSheet';
import { Button } from './ui/button';

const FeaturesSection = () => {
  return (
    <section className="py-10 px-6 syrian-pattern">
      <div className="max-w-6xl mx-auto">        
        <div className="mt-4 mb-4">
          <Card className="bg-syrian-light border-syrian-green p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0 text-center md:text-right">
                <h3 className="mb-4">
                  <ArabicText 
                    text="هل تريد بيع شيء ما؟" 
                    size="xl" 
                    className="font-bold text-syrian-dark"
                  />
                </h3>
                <p>
                  <ArabicText 
                    text="انضم إلى آلاف الأشخاص الذين يبيعون منتجاتهم بنجاح على سوقنا. أضف إعلانك مجانًا اليوم!" 
                    size="normal" 
                    className="text-gray-600"
                  />
                </p>
              </div>
              <div>
                <CreateListingSheet>
                  <Button className="bg-syrian-green text-white px-8 py-3 rounded-md hover:bg-syrian-dark transition-colors">
                    <ArabicText text="أضف إعلانك الآن" size="large" />
                  </Button>
                </CreateListingSheet>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
