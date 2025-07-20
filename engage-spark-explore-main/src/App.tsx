import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import CreateEvent from "./pages/CreateEvent";
import RegisterEvent from "./pages/RegisterEvent";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><span className="text-4xl mb-4">📅</span><h2 className="text-2xl font-bold mb-2">No events yet</h2><p className="text-muted-foreground mb-4">Check back soon for upcoming events!</p></div>} />
              <Route path="/tickets" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><span className="text-4xl mb-4">🎟️</span><h2 className="text-2xl font-bold mb-2">No tickets yet</h2><p className="text-muted-foreground mb-4">You haven't purchased any tickets yet. Browse events and get your first ticket!</p></div>} />
              <Route path="/favorites" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><span className="text-4xl mb-4">❤️</span><h2 className="text-2xl font-bold mb-2">No favorites yet</h2><p className="text-muted-foreground mb-4">You haven't marked any events as favorite yet.</p></div>} />
              <Route path="/my-events" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><span className="text-4xl mb-4">📅</span><h2 className="text-2xl font-bold mb-2">No events yet</h2><p className="text-muted-foreground mb-4">Create your first event!</p></div>} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"><span className="text-4xl mb-4">🔔</span><h2 className="text-2xl font-bold mb-2">No notifications yet</h2><p className="text-muted-foreground mb-4">You're all caught up!</p></div>} />
              <Route path="/settings" element={<div className="max-w-lg mx-auto p-6"><h2 className="text-2xl font-bold mb-4">Settings</h2><form className="space-y-4"><div><label className="block mb-1 font-medium">Name</label><input className="w-full rounded border px-3 py-2" placeholder="Your Name" /></div><div><label className="block mb-1 font-medium">Email</label><input className="w-full rounded border px-3 py-2" placeholder="you@email.com" /></div><div><label className="block mb-1 font-medium">Notifications</label><select className="w-full rounded border px-3 py-2"><option>Enabled</option><option>Disabled</option></select></div><button className="mt-4 px-4 py-2 rounded bg-primary text-white font-semibold">Save Changes</button></form></div>} />
              <Route path="/register/:eventId" element={<RegisterEvent />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  </TooltipProvider>
);

export default App;
