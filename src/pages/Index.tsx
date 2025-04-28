
import React from 'react';
import Header from '@/components/Header';
import GeometricPattern from '@/components/GeometricPattern';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-syrian-light">
      <GeometricPattern className="flex-grow">
        <Header />
        <main>
          <WelcomeSection />
          <FeaturesSection />
        </main>
      </GeometricPattern>
      <Footer />
    </div>
  );
};

export default Index;
