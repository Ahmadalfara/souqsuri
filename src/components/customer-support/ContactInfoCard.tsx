
import React from 'react';
import ArabicText from '@/components/ArabicText';
import { Card } from '@/components/ui/card';

const ContactInfoCard = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 text-right">
        <ArabicText text="معلومات الاتصال" />
      </h2>
      
      <div className="space-y-4">
        <div className="text-right">
          <div className="text-syrian-dark/70 mb-1">
            <ArabicText text="البريد الإلكتروني:" />
          </div>
          <div className="font-medium">
            <ArabicText text="info@example.com" />
          </div>
        </div>

        <div className="text-right">
          <div className="text-syrian-dark/70 mb-1">
            <ArabicText text="الهاتف:" />
          </div>
          <div className="font-medium">
            <ArabicText text="+963 11 123 4567" />
          </div>
        </div>

        <div className="text-right">
          <div className="text-syrian-dark/70 mb-1">
            <ArabicText text="ساعات العمل:" />
          </div>
          <div className="font-medium">
            <ArabicText text="من الاثنين إلى الجمعة: ٩ صباحاً - ٥ مساءً" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactInfoCard;
