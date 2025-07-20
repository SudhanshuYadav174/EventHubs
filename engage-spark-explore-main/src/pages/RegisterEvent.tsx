import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterEvent() {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState<any>(null);
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!eventId) return;
    supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()
      .then(({ data }) => setEvent(data));
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.from('registrations').insert([
      {
        event_id: eventId,
        name: form.name,
        email: form.email,
      },
    ]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      // Send confirmation email via Supabase Edge Function
      await fetch('https://<your-project-ref>.functions.supabase.co/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: form.email,
          subject: `Registration Confirmed: ${event.title}`,
          html: `<h1>Thank you for registering for ${event.title}!</h1><p>We look forward to seeing you at the event.</p>`,
        }),
      });
    } else {
      setError('Failed to register. Please try again.');
    }
  };

  if (!event) return <div className="p-8 text-center">Loading event details...</div>;

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Register for {event.title}
        </h1>
      </div>
      <div className="bg-card rounded-lg shadow-lg p-6 sm:p-8 w-full">
        {success ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold mb-2">Registration Successful!</div>
            <Button onClick={() => setSuccess(false)} className="w-full">Register Another</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" className="w-full" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            <Input name="email" className="w-full" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            {error && <div className="text-destructive text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
} 