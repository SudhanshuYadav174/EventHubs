import { useMemo } from 'react';
import { EventCard } from '@/components/EventCard';
import { useEvents } from '@/hooks/useEvents';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function EventGrid() {
  const { events, isLoading, error } = useEvents();

  // Memoize the events to prevent unnecessary re-renders
  const memoizedEvents = useMemo(() => {
    if (!events || events.length === 0) return [];
    return events.slice(0, 12); // Limit to 12 events for better performance
  }, [events]);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Loading amazing events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-destructive">Failed to load events. Please try again.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!memoizedEvents || memoizedEvents.length === 0) {
    return (
      <section className="py-16 lg:py-24 md:ml-16 lg:ml-20 xl:ml-64">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground text-xl">No events yet. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From tech meetups to music festivals, find your next unforgettable experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {memoizedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {memoizedEvents.length >= 12 && (
          <div className="text-center mt-12">
            <button className="glass-button px-8 py-3 rounded-lg font-medium transition-smooth hover:scale-105">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
}