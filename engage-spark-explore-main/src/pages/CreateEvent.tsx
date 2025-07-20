import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, Users, MapPin, Clock, Star } from "lucide-react";
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
    location: "",
    event_date: "",
    max_attendees: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.from("events").insert([
      {
        creator_id: user?.id,
        title: form.title,
        category: form.category || 'general',
        description: form.description || null,
        image_url: form.image_url || null,
        location: form.location || null,
        event_date: form.event_date ? new Date(form.event_date).toISOString() : null,
        max_attendees: form.max_attendees ? Number(form.max_attendees) : null,
        is_featured: false,
        is_trending: false,
        current_attendees: 0,
      },
    ]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      // Send confirmation email
      await fetch('https://<your-project-ref>.functions.supabase.co/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          eventTitle: event.title,
        }),
      });
    } else {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Create Amazing Events
        </h1>
      </div>
      <div className="bg-card rounded-lg shadow-lg p-6 sm:p-8 w-full">
        {success ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold mb-2">Event Created!</div>
            <Button onClick={() => setSuccess(false)} className="w-full">Create Another Event</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="title" className="w-full" placeholder="Title" value={form.title} onChange={handleChange} required />
            <Input name="category" className="w-full" placeholder="Category" value={form.category} onChange={handleChange} required />
            <Input name="description" className="w-full" placeholder="Description" value={form.description} onChange={handleChange} />
            <Input name="image_url" className="w-full" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
            <Input name="location" className="w-full" placeholder="Location" value={form.location} onChange={handleChange} />
            <Input name="event_date" className="w-full" type="datetime-local" value={form.event_date} onChange={handleChange} />
            <Input name="max_attendees" className="w-full" type="number" min="1" placeholder="Max Attendees" value={form.max_attendees} onChange={handleChange} />
            {error && <div className="text-destructive text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}