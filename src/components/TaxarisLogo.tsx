import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import logoFull from '@/assets/taxaris-logo-full-white.png';
import logoIcon from '@/assets/taxaris-logo-icon-white.png';

interface TaxarisLogoProps {
  variant?: 'full' | 'icon' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
} as const;

const TaxarisLogo: React.FC<TaxarisLogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
}) => {
  const [error, setError] = useState(false);
  const height = sizeMap[size];

  if (error) {
    return (
      <span
        className={cn('font-bold', className)}
        style={{
          fontSize: height * 0.4,
          color: '#FFFFFF',
        }}
      >
        Taxaris
      </span>
    );
  }

  const src = variant === 'icon' ? logoIcon : logoFull;

  return (
    <img
      src={src}
      alt="Taxaris, Automobiel Taxatiesoftware"
      height={height}
      style={{ height, width: 'auto' }}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default TaxarisLogo;
