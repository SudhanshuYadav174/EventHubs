import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function EventRegistrationModal({ eventId, onClose, onSuccess }: { eventId: string, onClose: () => void, onSuccess?: (email: string) => void }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const emailToUse = user?.email || form.email;
    const { error } = await supabase.from('registrations').insert([{ event_id: eventId, name: form.name, email: emailToUse }]);
    setLoading(false);
    if (!error) {
      setSuccess(true);
      if (onSuccess) onSuccess(emailToUse);
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogTitle>Register for Event</DialogTitle>
        {success ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold mb-2">Congrats!</div>
            <div className="text-muted-foreground mb-4">Check your email for confirmation.</div>
            <Button onClick={onClose} className="w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={user?.email || form.email}
              onChange={handleChange}
              required
              disabled={!!user?.email}
            />
            {error && <div className="text-destructive text-sm">{error}</div>}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 