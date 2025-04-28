
import React from 'react';
import ArabicText from './ArabicText';
import ArabicBorder from './ArabicBorder';
import { Button } from '@/components/ui/button';

const WelcomeSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 md:px-10">
      <div className="max-w-4xl w-full text-center">
        <h1 className="mb-8 animate-float">
          <ArabicText 
            text="مرحباً بكم في موقعنا" 
            size="3xl" 
            className="font-bold text-arabic-blue"
          />
        </h1>
        <ArabicBorder className="mb-10">
          <p className="mb-6">
            <ArabicText 
              text="نرحب بكم في تجربتنا العربية الفريدة. هذا التصميم مستوحى من الفن الإسلامي الجميل والهندسة المعمارية التقليدية."
              size="large"
              className="text-arabic-dark"
            />
          </p>
          <p>
            <ArabicText 
              text="استمتع بالألوان والأنماط الهندسية التي تعكس الثقافة العربية الغنية."
              size="normal"
              className="text-arabic-dark/80"
            />
          </p>
        </ArabicBorder>
        
        <div className="flex justify-center space-x-4">
          <Button className="bg-arabic-blue hover:bg-arabic-blue/90 text-white px-8 py-6">
            <ArabicText text="اكتشف المزيد" size="normal" />
          </Button>
          <Button variant="outline" className="border-arabic-turquoise text-arabic-turquoise hover:bg-arabic-turquoise/10 px-8 py-6">
            <ArabicText text="تواصل معنا" size="normal" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
