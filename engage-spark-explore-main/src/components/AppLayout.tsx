import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopHeader } from '@/components/TopHeader';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isCreatorMode, setIsCreatorMode] = useState(false);

  const handleCreatorToggle = (isCreator: boolean) => {
    setIsCreatorMode(isCreator);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar - Always present, collapsible */}
        <AppSidebar 
          isCreatorMode={isCreatorMode}
          onCreatorToggle={handleCreatorToggle}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col w-full lg:w-auto">
          <TopHeader />
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}