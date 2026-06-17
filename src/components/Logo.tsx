import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-9 h-9 rounded-lg" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center bg-[#00D8ED] shrink-0 overflow-hidden block ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text 
          x="50%" 
          y="52%" 
          dominantBaseline="middle" 
          textAnchor="middle" 
          fill="#0A1118" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontWeight="900" 
          fontSize="68"
          fontStyle="italic"
          letterSpacing="-4"
        >
          IA
        </text>
      </svg>
    </div>
  );
}
