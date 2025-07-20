import { useState, useEffect, useMemo } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { CategoryPills } from '@/components/CategoryPills';
import { EventGrid } from '@/components/EventGrid';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateEventModal } from "@/components/CreateEventModal";

import { useGSAP, fadeInUp, staggerFadeIn } from '@/hooks/useGSAP';

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emmaai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "EventHub has revolutionized how I discover events. The personalized recommendations are spot-on!",
    href: "https://twitter.com/emmaai"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidtech",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As an event organizer, EventHub's analytics and creator tools have boosted our event attendance by 60%.",
    href: "https://twitter.com/davidtech"
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofiaml",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The seamless ticket booking and event management features make EventHub my go-to platform for all events."
  },
  {
    author: {
      name: "Michael Chen",
      handle: "@mikeevents",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Love the clean interface and how easy it is to find events that match my interests. Highly recommended!"
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('trending');
  const [showCreate, setShowCreate] = useState(false);

  // Memoize refs to prevent unnecessary re-renders
  const heroRef = useGSAP((element) => {
    fadeInUp(element, 0.2);
  }, [isLoading]);

  const categoryRef = useGSAP((element) => {
    fadeInUp(element, 0.4);
  }, [isLoading]);

  const eventsRef = useGSAP((element) => {
    staggerFadeIn(element.children, 0.1);
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleCategorySelect = useMemo(() => (categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced from 2000ms to 1500ms for better performance

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <div className="min-h-screen">
      <main className="overflow-hidden">
        <div ref={heroRef}>
          <HeroSection />
        </div>
        
        <div ref={categoryRef}>
          <CategoryPills 
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        
        <div ref={eventsRef}>
          <EventGrid />
        </div>

        <TestimonialsSection
          title="Trusted by event enthusiasts worldwide"
          description="Join thousands of people who are already discovering amazing events with EventHub"
          testimonials={testimonials}
        />
        <Button
          className="fixed bottom-6 right-6 z-50 rounded-full p-0 w-14 h-14 flex items-center justify-center bg-primary text-white shadow-lg sm:hidden"
          onClick={() => setShowCreate(true)}
          aria-label="Create Event"
        >
          <Plus size={32} />
        </Button>
        <CreateEventModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => setShowCreate(false)} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
