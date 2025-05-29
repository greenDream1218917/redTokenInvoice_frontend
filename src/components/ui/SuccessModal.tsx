import React from 'react';
import { CheckCircle, Sparkles, Trophy, Gift } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  variant?: 'default' | 'celebration' | 'achievement' | 'premium';
  actionLabel?: string;
  onAction?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your NFT Minted successfully.",
  variant = 'default',
  actionLabel = "Continue",
  onAction
}) => {
  if (!isOpen) return null;

  const variants = {
    default: {
      bgGradient: "from-green-400 to-emerald-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      icon: CheckCircle,
      accentColor: "text-green-600"
    },
    celebration: {
      bgGradient: "from-purple-400 via-pink-500 to-red-500",
      iconBg: "bg-gradient-to-br from-yellow-100 to-orange-100",
      iconColor: "text-yellow-600",
      icon: Sparkles,
      accentColor: "text-purple-600"
    },
    achievement: {
      bgGradient: "from-amber-400 to-orange-500",
      iconBg: "bg-gradient-to-br from-amber-100 to-yellow-100",
      iconColor: "text-amber-600",
      icon: Trophy,
      accentColor: "text-amber-600"
    },
    premium: {
      bgGradient: "from-indigo-500 via-purple-600 to-pink-500",
      iconBg: "bg-gradient-to-br from-indigo-100 to-purple-100",
      iconColor: "text-indigo-600",
      icon: Gift,
      accentColor: "text-indigo-600"
    }
  };

  const config = variants[variant];
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced Backdrop with ripple effect */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 animate-fade-in backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Modal with enhanced entrance animations */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-700 animate-modal-entrance">
          
          {/* Animated Gradient Header with wave effect */}
          <div className={`h-3 bg-gradient-to-r ${config.bgGradient} animate-wave relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
          </div>

          {/* Content */}
          <div className="px-8 py-10 text-center relative">
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 animate-float-slow" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full opacity-30 animate-float-reverse" />
            </div>
            
            {/* Enhanced Animated Icon Container */}
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full relative">
              {/* Multiple layered backgrounds for depth */}
              <div className={`absolute inset-0 rounded-full ${config.iconBg} animate-pulse-slow`} />
              <div className="absolute inset-1 rounded-full bg-white shadow-xl animate-scale-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white to-gray-50 animate-rotate-slow" style={{ animationDelay: '0.4s' }} />
              
              {/* Icon with enhanced animations */}
              <IconComponent 
                size={48} 
                className={`relative z-10 ${config.iconColor} animate-icon-entrance`}
                style={{ animationDelay: '0.6s' }}
              />
              
              {/* Ripple effect around icon */}
              <div className="absolute inset-0 rounded-full border-2 border-current opacity-20 animate-ripple" style={{ animationDelay: '0.8s' }} />
              <div className="absolute inset-0 rounded-full border border-current opacity-10 animate-ripple" style={{ animationDelay: '1.2s' }} />
              
              {/* Enhanced variant-specific effects */}
              {variant === 'celebration' && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full animate-sparkle"
                      style={{
                        background: ['#fbbf24', '#f472b6', '#a855f7', '#06b6d4'][i % 4],
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </>
              )}

              {variant === 'achievement' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200 via-amber-200 to-orange-200 opacity-40 animate-golden-glow" />
                  <div className="absolute -inset-2 rounded-full border-4 border-yellow-300 opacity-30 animate-golden-ring" />
                </>
              )}

              {variant === 'premium' && (
                <>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-30 animate-premium-glow" />
                  <div className="absolute -inset-4 rounded-full border border-purple-300 opacity-20 animate-premium-border" />
                </>
              )}
            </div>

            {/* Animated Title with typewriter effect */}
            <h3 className="mb-6 text-3xl font-bold text-gray-900 animate-slide-up" style={{ animationDelay: '1s' }}>
              {title}
            </h3>

            {/* Animated Message with stagger effect */}
            <p className="mb-10 text-lg text-gray-600 leading-relaxed animate-slide-up" style={{ animationDelay: '1.2s' }}>
              {message}
            </p>

            {/* Enhanced Action Button with magnetic hover effect */}
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '1.4s' }}>
              <button
                onClick={onAction || onClose}
                className={`group relative px-10 py-4 rounded-2xl bg-gradient-to-r ${config.bgGradient} text-white font-bold text-lg shadow-2xl hover:shadow-3xl transform transition-all duration-300 focus:outline-none overflow-hidden`}
              >
                {/* Button background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-shimmer-button" />
                
                {/* Button text with subtle animation */}
                <span className="relative z-10 group-hover:animate-pulse">
                  {actionLabel}
                </span>
                
                {/* Magnetic hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transform scale-110 transition-all duration-300" />
              </button>
            </div>
          </div>

          {/* Enhanced Decorative Bottom Element */}
          <div className="h-2 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-slide-up opacity-50" style={{ animationDelay: '1.6s' }} />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;