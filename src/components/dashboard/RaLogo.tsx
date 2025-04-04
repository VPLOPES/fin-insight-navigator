
import React from 'react';

export interface RaLogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RaLogo = ({ 
  variant = 'full',
  className = '',
  size = 'md'
}: RaLogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };
  
  // Renderiza apenas o ícone A
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg 
          className={sizeClasses[size]} 
          viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M135 40 L265 40 L330 360 L270 360 L255 310 L145 310 L130 360 L70 360 L135 40 Z M200 100 L160 250 L240 250 L200 100 Z"
            fill="#40E0D0"
          />
        </svg>
      </div>
    );
  }
  
  // Renderiza o logo completo RA
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        className={sizeClasses[size]} 
        viewBox="0 0 600 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M135 70 L220 70 C270 70 300 110 300 150 C300 190 270 230 220 230 L175 230 L195 330 L135 330 L135 70 Z"
            fill="white"
          />
          <path 
            d="M175 130 L175 170 L210 170 C220 170 230 160 230 150 C230 140 220 130 210 130 L175 130 Z" 
            fill="black" 
          />
          <path
            d="M335 70 L465 70 L530 330 L470 330 L455 290 L345 290 L330 330 L270 330 L335 70 Z M400 130 L360 230 L440 230 L400 130 Z"
            fill="#40E0D0"
          />
        </g>
      </svg>
    </div>
  );
};
