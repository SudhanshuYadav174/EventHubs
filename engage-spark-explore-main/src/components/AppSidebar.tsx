import { 
  Calendar,
  Home,
  Plus,
  ChartBar,
  Settings,
  Bell,
  Ticket,
  UserPlus,
  Heart,
  User
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  isCreatorMode: boolean;
  onCreatorToggle: (isCreator: boolean) => void;
  notificationsCount?: number;
}

const attendeeItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Browse Events', url: '/events', icon: Calendar },
  { title: 'My Tickets', url: '/tickets', icon: Ticket },
  { title: 'Favorites', url: '/favorites', icon: Heart },
];

const creatorItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'My Events', url: '/my-events', icon: Calendar },
  { title: 'Create Event', url: '/create-event', icon: Plus },
  { title: 'Analytics', url: '/analytics', icon: ChartBar },
];

export function AppSidebar({ isCreatorMode, onCreatorToggle, notificationsCount }: AppSidebarProps) {
  const { open, isMobile, openMobile } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;

  const items = isCreatorMode ? creatorItems : attendeeItems;
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={!open ? "w-14 lg:w-16" : "w-64 lg:w-72"}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 flex flex-col items-center">
        <div className="flex items-center justify-center space-x-2 w-full">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg lg:text-xl">E</span>
          </div>
          {(open || (isMobile && openMobile)) && (
            <span className="text-xl lg:text-2xl font-bold">EventHub</span>
          )}
        </div>
      </SidebarHeader>

      <div className="flex flex-col h-full">
        <SidebarContent className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel>
              {(isCreatorMode ? 'Creator Tools' : 'Main Menu')}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => 
                          `flex items-center space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-primary text-primary-foreground' 
                              : 'hover:bg-muted'
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                        <span className="text-sm lg:text-base">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>
              {'Settings'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/notifications" 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm lg:text-base">Notifications</span>
                        {typeof notificationsCount === 'number' && notificationsCount > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 lg:h-6 lg:w-6 p-0 text-xs">
                            {notificationsCount}
                          </Badge>
                        )}
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/settings" 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`
                      }
                    >
                      <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
                      <span className="text-sm lg:text-base">Settings</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Creator/Attendee toggle just below Settings */}
          {(open || (isMobile && openMobile)) && (
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="flex items-center justify-between p-2 lg:p-3 rounded-lg bg-muted/50 w-full mt-2">
                  <div className="flex items-center space-x-2">
                    {isCreatorMode ? (
                      <UserPlus className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                    ) : (
                      <User className="h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm lg:text-base font-medium">
                      {isCreatorMode ? 'Creator' : 'Attendee'}
                    </span>
                  </div>
                  <Switch
                    checked={isCreatorMode}
                    onCheckedChange={onCreatorToggle}
                  />
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </div>
    </Sidebar>
  );
}