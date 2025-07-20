import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarCheck, 
  MapPin, 
  Users, 
  TrendUp 
} from '@phosphor-icons/react';

export function HeroSection() {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero"></div>
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Live Events Indicator */}
          {/* <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Badge className="glass-card border-white/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
              <span className="hidden sm:inline">Live Events Available Now</span>
              <span className="sm:hidden">Live Events</span>
            </Badge>
          </div> */}
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white leading-tight px-2">
            <span className="animate-fade-in">Discover, book, and host</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary animate-pulse">
              extraordinary events
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Find the perfect venue and start planning your next unforgettable experience!
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
            <div className="glass-card px-3 py-1 sm:px-4 sm:py-2 rounded-full border-white/30">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CalendarCheck size={16} className="sm:w-5 sm:h-5 text-primary" />
                <span className="text-white/90 text-xs sm:text-sm">Upcoming Events</span>
              </div>
            </div>
            <div className="glass-card px-3 py-1 sm:px-4 sm:py-2 rounded-full border-white/30">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <MapPin size={16} className="sm:w-5 sm:h-5 text-primary" />
                <span className="text-white/90 text-xs sm:text-sm">Multiple Locations</span>
              </div>
            </div>
            <div className="glass-card px-3 py-1 sm:px-4 sm:py-2 rounded-full border-white/30">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <TrendUp size={16} className="sm:w-5 sm:h-5 text-primary" />
                <span className="text-white/90 text-xs sm:text-sm">Premium Experiences</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            className="glass-button text-white border-white/30 hover:bg-white/20 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold transition-smooth glow-effect group"
          >
            <span className="group-hover:animate-pulse">✨ Discover Events</span>
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-16 sm:bottom-32 right-8 sm:right-16 w-10 h-10 sm:w-16 sm:h-16 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-primary/30 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}