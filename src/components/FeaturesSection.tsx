
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent } from '@/components/ui/card';
import CreateListingSheet from './listings/CreateListingSheet';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-10 px-6 syrian-pattern">
      <div className="max-w-6xl mx-auto">        
        <div className="mt-4 mb-4">
          <Card className="bg-syrian-light border-syrian-green shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 relative">
              <div className="absolute top-0 right-0 bg-syrian-gold text-white py-1 px-3 text-xs font-bold rounded-bl-md">
                <ArabicText text="أكبر سوق في سوريا" size="small" />
              </div>
              
              <div className="md:w-3/5 mb-6 md:mb-0 text-center md:text-right">
                <h3 className="mb-2">
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
              
              <div className="md:w-2/5 flex justify-center md:justify-end">
                <CreateListingSheet>
                  <Button className="bg-syrian-green text-white px-8 py-3 rounded-full hover:bg-syrian-dark transition-colors group flex items-center gap-2">
                    <Sparkles size={18} className="text-white group-hover:animate-pulse" />
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
