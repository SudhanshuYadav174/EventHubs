import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "@/components/EventCard";

export default function MyEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    (supabase as any)
      .from("events")
      .select("*")
      .eq("creator_id", user.id)
      .then(({ data }) => setEvents(data || []));
  }, [user]);

  if (!user) return <div className="p-8 text-center">Please log in.</div>;
  if (events.length === 0) return <div className="p-8 text-center">No events yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
} 