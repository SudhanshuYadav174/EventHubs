import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MagnifyingGlass, 
  Bell, 
  Moon,
  Sun,
  User,
  SignOut,
} from '@phosphor-icons/react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TopHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { user, signOut } = useAuth();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full bg-transparent shadow-none border-0 border-b border-white/10 overflow-x-hidden">
      <div className="px-4 py-3">
        <div className="flex items-center w-full">
          {/* Left: Sidebar toggle button */}
          <div className="flex-shrink-0 ml-5">
            <SidebarTrigger className="hover:bg-white/10" />
          </div>
          {/* Center: Search bar */}
          <div className="flex-1 flex justify-center">
            <div className="hidden md:flex w-full max-w-md">
              <div className="relative w-full">
                <MagnifyingGlass 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search events, people, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card border-white/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
          {/* Right: Actions */}
          <div className="flex items-center space-x-2 lg:space-x-3 ml-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-white/10"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {/* Notifications */}
          
            {/* Authentication Controls */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || 'User'} />
                      <AvatarFallback>
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <SignOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="hidden sm:flex">
                  <Link to="/auth">Sign Up</Link>
                </Button>
                <Button asChild size="sm" className="sm:hidden">
                  <Link to="/auth">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (Below Header) */}
      <div className="md:hidden mt-3 pt-3 border-t border-white/10">
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
      </div>
    </header>
  );
}