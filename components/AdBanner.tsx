import React from 'react';

interface AdBannerProps {
  type: 'sidebar' | 'footer' | 'header';
}

const AdBanner: React.FC<AdBannerProps> = ({ type }) => {
  const styles = {
    sidebar: 'w-full h-64',
    footer: 'w-full h-24',
    header: 'w-full h-24',
  };

  return (
    <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${styles[type]} my-4`}>
      <span className="text-gray-500 text-sm">Ad Placeholder</span>
    </div>
  );
};

export default AdBanner;