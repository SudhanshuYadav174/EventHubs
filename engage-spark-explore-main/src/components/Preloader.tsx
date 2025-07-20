import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center animate-glow">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            EventHub
          </h1>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Text */}
        <p className="text-sm text-muted-foreground mt-4">
          Loading amazing events... {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}