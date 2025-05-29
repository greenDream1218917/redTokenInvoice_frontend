import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const totalDuration = 3000;
    const interval = 30;
    const steps = totalDuration / interval;

    let current = 100;
    const timer = setInterval(() => {
      current -= 100 / steps;
      setProgress(current);
    }, interval);

    const autoClose = setTimeout(() => {
      onClose();
    }, totalDuration);

    return () => {
      clearInterval(timer);
      clearTimeout(autoClose);
    };
  }, [onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-green-100 text-green-800'
      : type === 'error'
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-800';

  const progressColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-gray-500';

  return (
    <div className={`fixed top-5 right-5 z-50 w-[90%] max-w-md ${bgColor} rounded-lg shadow-md overflow-hidden`}>

      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-semibold text-gray-600 hover:text-gray-800">
          &times;
        </button>
      </div>
      <div className="w-full h-1 bg-transparent">
        <div
          className={`h-1 transition-all duration-30 ease-linear ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
