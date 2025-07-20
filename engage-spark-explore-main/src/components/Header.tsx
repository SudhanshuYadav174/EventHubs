import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  MagnifyingGlass, 
  Bell, 
  User, 
  List, 
  X,
  Moon,
  Sun,
  UserPlus,
  Plus,
  ChartBar,
  Gear
} from '@phosphor-icons/react';
import { CreateEventModal } from './CreateEventModal';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  isCreatorMode: boolean;
  onCreatorToggle: (isCreator: boolean) => void;
}

export function Header({ onMenuToggle, isMenuOpen, isCreatorMode, onCreatorToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EventHub</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlass 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Creator Mode Controls */}
          <div className="hidden md:flex items-center space-x-3 mr-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              {isCreatorMode ? (
                <UserPlus size={16} className="text-primary" />
              ) : (
                <User size={16} className="text-muted-foreground" />
              )}
              <span className="text-sm font-medium">
                {isCreatorMode ? 'Creator' : 'Attendee'}
              </span>
              <Switch
                checked={isCreatorMode}
                onCheckedChange={onCreatorToggle}
              />
            </div>
            
            {isCreatorMode && (
              <div className="flex space-x-1">
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10" onClick={() => setShowCreate(true)}>
                  <Plus size={14} className="mr-1" />
                  Create Event
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  <ChartBar size={14} className="mr-1" />
                  Analytics
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  <Gear size={14} />
                </Button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-white/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10 relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
          </div>
        </div>

        {/* Mobile Search and Creator Controls */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-4">
            <div className="relative">
              <MagnifyingGlass 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card border-white/20 focus:border-primary"
              />
            </div>
            
            {/* Mobile Creator Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isCreatorMode ? (
                  <UserPlus size={16} className="text-primary" />
                ) : (
                  <User size={16} className="text-muted-foreground" />
                )}
                <span className="text-sm font-medium">
                  {isCreatorMode ? 'Creator Mode' : 'Attendee Mode'}
                </span>
              </div>
              <Switch
                checked={isCreatorMode}
                onCheckedChange={onCreatorToggle}
              />
            </div>
            
            {isCreatorMode && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  <Plus size={14} className="mr-1" />
                  Create Event
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  <ChartBar size={14} className="mr-1" />
                  Analytics
                </Button>
                <Button size="sm" variant="outline" className="bg-white/5 border-white/20 hover:bg-white/10">
                  <Gear size={14} />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <CreateEventModal open={showCreate} onClose={() => setShowCreate(false)} onCreated={() => setShowCreate(false)} />
    </header>
  );
}