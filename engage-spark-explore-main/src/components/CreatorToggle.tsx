import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  UserPlus, 
  Gear,
  Plus,
  ChartBar,
  Calendar
} from '@phosphor-icons/react';

interface CreatorToggleProps {
  isCreatorMode: boolean;
  onToggle: (isCreator: boolean) => void;
}

export function CreatorToggle({ isCreatorMode, onToggle }: CreatorToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggle(!isCreatorMode);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="glass-card rounded-2xl p-4 border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {isCreatorMode ? (
              <UserPlus size={20} className="text-primary" />
            ) : (
              <User size={20} className="text-muted-foreground" />
            )}
            <span className="text-sm font-medium">
              {isCreatorMode ? 'Creator Mode' : 'Attendee Mode'}
            </span>
          </div>
          
          <Switch
            checked={isCreatorMode}
            onCheckedChange={handleToggle}
            className={`${isAnimating ? 'animate-pulse' : ''}`}
          />
          
          <Badge 
            variant={isCreatorMode ? "default" : "secondary"}
            className="transition-smooth"
          >
            {isCreatorMode ? 'Creator' : 'Attendee'}
          </Badge>
        </div>
        
        {isCreatorMode && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="glass-button">
                <Plus size={16} className="mr-1" />
                Create Event
              </Button>
              <Button size="sm" variant="outline" className="glass-button">
                <ChartBar size={16} className="mr-1" />
                Analytics
              </Button>
              <Button size="sm" variant="outline" className="glass-button">
                <Gear size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}