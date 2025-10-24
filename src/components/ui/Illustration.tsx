import React from 'react';
import Image from 'next/image';

export const Illustration: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
      {/* Use Next.js Image component for optimized image handling */}
      <Image
        src="/login.png"
        alt="EV Maintenance Illustration"
        fill
        style={{ objectFit: 'contain' }}
        priority
        className="absolute inset-0"
      />
    </div>
  );
};
