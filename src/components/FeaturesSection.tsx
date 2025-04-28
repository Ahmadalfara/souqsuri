
import React from 'react';
import ArabicText from './ArabicText';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <Card className="bg-white border-arabic-gold/30 hover:border-arabic-gold transition-colors">
      <CardHeader className="pb-2">
        <h3 className="text-center">
          <ArabicText text={title} size="large" className="font-bold text-arabic-blue" />
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-center">
          <ArabicText text={description} size="normal" className="text-arabic-dark/80" />
        </p>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "تصميم عربي",
      description: "مستوحى من الفن الإسلامي والهندسة المعمارية العربية التقليدية."
    },
    {
      title: "دعم الكتابة من اليمين لليسار",
      description: "تجربة مستخدم كاملة للغة العربية مع دعم الكتابة من اليمين لليسار."
    },
    {
      title: "أنماط هندسية",
      description: "خلفيات وزخارف بأنماط هندسية مستوحاة من الفن الإسلامي."
    }
  ];

  return (
    <section className="py-16 px-6 arabic-pattern">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-12">
          <ArabicText text="مميزات التصميم" size="2xl" className="font-bold text-arabic-blue" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
