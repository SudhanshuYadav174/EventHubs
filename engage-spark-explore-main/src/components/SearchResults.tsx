import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface SearchResultsProps {
  query: string;
  onClear: () => void;
}

export function SearchResults({ query, onClear }: SearchResultsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate search delay
      setTimeout(() => {
        setResults([
          {
            id: 'search-1',
            title: `${query} Tech Conference`,
            organizer: 'Search Results',
            date: 'Sat, Jul 26, 2025',
            time: '10:00 AM',
            location: 'Virtual',
            price: 'Free',
            image: '/api/placeholder/400/240',
            category: 'SEARCH',
            attendees: 500,
            rating: 4.5
          }
        ]);
        setIsLoading(false);
      }, 1000);
    } else {
      setResults([]);
    }
  }, [query]);

  if (query.length <= 2) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Search Results for "{query}"
          </h2>
          <Button 
            variant="outline" 
            onClick={onClear}
            className="glass-card border-white/20 hover:bg-white/10"
          >
            Clear Search
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="glass-card rounded-2xl p-8 flex items-center space-x-4">
              <LoadingSpinner />
              <span className="text-muted-foreground">Searching for events...</span>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                className="animate-fade-in"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
              <MagnifyingGlass size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                No events found for "{query}"
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different search term or browse our categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}