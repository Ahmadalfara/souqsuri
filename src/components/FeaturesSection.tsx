
import React from 'react';
import { Link } from 'react-router-dom';
import ArabicText from './ArabicText';
import { Card, CardContent } from '@/components/ui/card';
import CreateListingSheet from './listings/CreateListingSheet';
import { Button } from './ui/button';
import { Sparkles, PlusCircle } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-8 px-6 bg-gradient-to-r from-syrian-light to-white border-t border-b border-syrian-green/10">
      <div className="max-w-6xl mx-auto">        
        <Card className="bg-white border-syrian-green/20 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 relative">
            <div className="md:w-3/5 mb-6 md:mb-0 text-center md:text-right">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold text-syrian-dark">
                <ArabicText 
                  text="هل تريد بيع شيء ما؟" 
                  size="xl" 
                  className="font-bold"
                />
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                <ArabicText 
                  text="انضم إلى آلاف الأشخاص الذين يبيعون منتجاتهم بنجاح على سوقنا. أضف إعلانك مجانًا اليوم!" 
                  size="normal"
                />
              </p>
            </div>
            
            <div className="md:w-2/5 flex justify-center md:justify-end">
              <CreateListingSheet>
                <Button className="bg-syrian-green hover:bg-syrian-dark text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group flex items-center gap-2">
                  <PlusCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
                  <ArabicText text="أضف إعلانك الآن" size="large" />
                </Button>
              </CreateListingSheet>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
