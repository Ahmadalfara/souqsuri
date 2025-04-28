
import React from 'react';
import { cn } from '@/lib/utils';

interface GeometricPatternProps {
  className?: string;
  children?: React.ReactNode;
}

const GeometricPattern = ({ className, children }: GeometricPatternProps) => {
  return (
    <div className={cn("geometric-pattern relative bg-syrian-light", className)}>
      {children}
    </div>
  );
};

export default GeometricPattern;
