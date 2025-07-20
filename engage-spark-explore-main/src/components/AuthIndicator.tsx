import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, SignIn, SignOut } from '@phosphor-icons/react';
import { useAuth } from '@/hooks/useAuth';

export function AuthIndicator() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Badge className="glass-card border-white/30 px-4 py-2">
          Loading...
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] flex gap-2">
      {user ? (
        <>
          <Badge className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 py-2">
            <User size={16} className="mr-2" />
            {user.email}
          </Badge>
          <Button 
            size="sm"
            onClick={signOut}
            className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            <SignOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </>
      ) : (
        <Button 
          size="lg"
          onClick={() => {
            console.log('Sign in button clicked');
            navigate('/auth');
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold shadow-xl border-2 border-blue-400"
          style={{ minWidth: '160px', fontSize: '16px' }}
        >
          <SignIn size={20} className="mr-2" />
          SIGN IN
        </Button>
      )}
    </div>
  );
}