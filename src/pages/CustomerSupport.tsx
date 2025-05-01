
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GeometricPattern from '@/components/GeometricPattern';
import ArabicText from '@/components/ArabicText';
import ContactInfoCard from '@/components/customer-support/ContactInfoCard';
import ContactForm from '@/components/customer-support/ContactForm';

const CustomerSupport = () => {
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-syrian-dark mb-4">
              <ArabicText text="دعم العملاء" size="large" />
            </h1>
            <p className="text-lg text-syrian-dark/70 max-w-2xl mx-auto">
              <ArabicText text="نحن هنا للمساعدة! يرجى ملء النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <ContactInfoCard />
            </div>

            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </main>
        <Footer />
      </GeometricPattern>
    </div>
  );
};

export default CustomerSupport;
