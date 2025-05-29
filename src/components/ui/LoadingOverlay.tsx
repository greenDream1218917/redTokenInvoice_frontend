// components/ui/LoadingOverlay.tsx
import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
