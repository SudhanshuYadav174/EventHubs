import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function CreateEventModal({ open, onClose, onCreated }: { open: boolean, onClose: () => void, onCreated?: () => void }) {
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
      if (onCreated) onCreated();
    } else {
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-md rounded-lg p-4 bg-background sm:max-w-lg sm:p-6"
      >
        <DialogTitle>Create New Event</DialogTitle>
        <DialogDescription>
          Fill out the form below to create a new event. All fields marked with * are required.
        </DialogDescription>
        {success ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold mb-2">Event Created!</div>
            <Button onClick={onClose} className="w-full">Close</Button>
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
      </DialogContent>
    </Dialog>
  );
} 