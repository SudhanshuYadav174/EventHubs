import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Event {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  location: string | null;
  event_date: string | null;
  category: string;
  is_featured: boolean;
  is_trending: boolean;
  max_attendees: number | null;
  current_attendees: number;
  created_at: string;
  updated_at: string;
}

// Sample events data
const sampleEvents = [
  {
    title: 'Tech Innovation Summit 2025',
    description: 'Join us for the biggest tech conference of the year featuring AI, blockchain, and future technologies.',
    location: 'Bangalore, India',
    event_date: '2025-08-15T09:00:00Z',
    category: 'technology',
    is_featured: true,
    is_trending: true,
    max_attendees: 1000,
    current_attendees: 750
  },
  {
    title: 'Design & Creativity Workshop',
    description: 'A hands-on workshop for designers and creative professionals to enhance their skills.',
    location: 'Mumbai, India',
    event_date: '2025-08-20T14:00:00Z',
    category: 'design',
    is_featured: true,
    is_trending: false,
    max_attendees: 200,
    current_attendees: 150
  },
  {
    title: 'Startup Pitch Competition',
    description: 'Pitch your startup idea to investors and win funding opportunities.',
    location: 'Delhi, India',
    event_date: '2025-08-25T18:00:00Z',
    category: 'startup',
    is_featured: false,
    is_trending: true,
    max_attendees: 500,
    current_attendees: 300
  },
  {
    title: 'Music Festival 2025',
    description: 'Experience the best of Indian and international music in this amazing festival.',
    location: 'Goa, India',
    event_date: '2025-09-01T16:00:00Z',
    category: 'music',
    is_featured: true,
    is_trending: true,
    max_attendees: 5000,
    current_attendees: 3200
  },
  {
    title: 'Business Leadership Conference',
    description: 'Learn from industry leaders and network with business professionals.',
    location: 'Hyderabad, India',
    event_date: '2025-09-05T10:00:00Z',
    category: 'business',
    is_featured: false,
    is_trending: false,
    max_attendees: 800,
    current_attendees: 450
  },
  {
    title: 'Wellness & Mindfulness Retreat',
    description: 'A peaceful retreat to rejuvenate your mind, body, and soul.',
    location: 'Rishikesh, India',
    event_date: '2025-09-10T08:00:00Z',
    category: 'wellness',
    is_featured: false,
    is_trending: false,
    max_attendees: 100,
    current_attendees: 75
  }
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // If no events exist, create sample events
      if (!data || data.length === 0) {
        await createSampleEvents();
        // Fetch events again after creating samples
        const { data: newData, error: newError } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (newError) throw newError;
        setEvents(newData || []);
      } else {
        setEvents(data || []);
      }
    } catch (error: any) {
      toast.error('Failed to fetch events');
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleEvents = async () => {
    try {
      // First, we need to create a profile for the sample creator
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('user_id')
        .limit(1);

      let creatorId = '00000000-0000-0000-0000-000000000000'; // Default creator ID

      if (profileData && profileData.length > 0) {
        creatorId = profileData[0].user_id;
      } else {
        // Create a sample profile if none exists
        const { data: newProfile, error: newProfileError } = await supabase
          .from('profiles')
          .insert({
            user_id: creatorId,
            display_name: 'Sample Organizer',
            role: 'creator'
          })
          .select()
          .single();

        if (newProfileError) {
          console.error('Error creating sample profile:', newProfileError);
        }
      }

      // Create sample events
      const eventsWithCreator = sampleEvents.map(event => ({
        ...event,
        creator_id: creatorId
      }));

      const { error: insertError } = await supabase
        .from('events')
        .insert(eventsWithCreator);

      if (insertError) {
        console.error('Error creating sample events:', insertError);
      } else {
        console.log('Sample events created successfully');
      }
    } catch (error) {
      console.error('Error in createSampleEvents:', error);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;
      
      setEvents(prev => [data, ...prev]);
      toast.success('Event created successfully!');
      return data;
    } catch (error: any) {
      toast.error('Failed to create event');
      console.error('Error creating event:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();

    // Set up real-time subscription
    const channel = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Real-time event change:', payload);
          fetchEvents(); // Refresh events on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    events,
    loading,
    createEvent,
    refetch: fetchEvents
  };
}