import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  BookmarkSimple, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Calendar
} from '@phosphor-icons/react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { EventRegistrationModal } from './EventRegistrationModal';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: any; // Changed from Event to any to avoid type error
}

export function EventCard({ event }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if the user is already registered for this event
  useEffect(() => {
    if (!user) return;
    (supabase as any)
      .from('registrations')
      .select('id')
      .eq('event_id', event.id)
      .eq('email', user.email)
      .then(({ data, error }) => {
        console.log('Registration check:', { data, error, eventId: event.id, userEmail: user.email });
        if (data && data.length > 0) setIsRegistered(true);
        else setIsRegistered(false);
      });
  }, [event.id, user]);

  // Memoize formatted date and time to prevent unnecessary recalculations
  const formattedDateTime = useMemo(() => {
    if (!event.event_date) return { date: 'TBD', time: 'TBD' };
    
    const date = new Date(event.event_date);
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    
    // Check if event is in the past
    if (timeDiff < 0) {
      return { date: 'Past Event', time: 'Completed' };
    }
    
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    return { date: dateStr, time: timeStr };
  }, [event.event_date]);

  // Memoize category badge color
  const categoryColor = useMemo(() => {
    const colors = {
      'technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'music': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'business': 'bg-green-500/20 text-green-400 border-green-500/30',
      'wellness': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'design': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'startup': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    };
    return colors[event.category?.toLowerCase() as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }, [event.category]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="group glass-card hover:shadow-glow transition-smooth overflow-hidden w-full h-full flex flex-col justify-between min-h-[360px] md:min-h-[420px]">
      <CardHeader className="p-0 relative">
        {/* Event Image */}
        <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
          <img
            src={event.image_url || '/placeholder.svg'}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 min-w-0"
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColor} border backdrop-blur-sm`}>
              {event.category?.toUpperCase() || 'EVENT'}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className="h-8 w-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <BookmarkSimple 
                size={16} 
                className={isBookmarked ? 'fill-primary text-primary' : 'text-white'} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="h-8 w-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <Heart 
                size={16} 
                className={isLiked ? 'fill-primary text-primary' : 'text-white'} 
              />
            </Button>
          </div>
          
          {/* Featured Badge */}
          {event.is_featured && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 lg:p-6 flex flex-col gap-2 px-2">
        {/* Event Title */}
        <h3 className="font-semibold text-base sm:text-lg lg:text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors break-words">
          {event.title}
        </h3>
        
        {/* Organizer */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" alt="Organizer" />
            <AvatarFallback className="text-xs">O</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {event.organizer_name || 'Event Organizer'}
          </span>
        </div>
        
        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{formattedDateTime.date}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{formattedDateTime.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span className="line-clamp-1">
              {event.location || 'Location TBD'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users size={16} />
            <span>{event.current_attendees || 0} attending</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-5 lg:p-6 pt-0 flex flex-col gap-2 px-2">
        <div className="w-full flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center space-x-1">
            <span className="text-lg font-semibold text-primary">
              {event.price || 'Free'}
            </span>
          </div>
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>
        {/* Action Button */}
        {!user ? (
          <Button className="w-full mt-3 glass-button hover:shadow-glow" disabled>
            Please log in to register
          </Button>
        ) : isRegistered ? (
          <Button className="w-full mt-3 glass-button" disabled>
            Registered
          </Button>
        ) : (
          <Button className="w-full mt-3 glass-button hover:shadow-glow" onClick={() => navigate(`/register/${event.id}`)}>
            Register Here
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}