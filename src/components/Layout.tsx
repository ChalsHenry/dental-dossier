import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
  userRole?: 'admin' | 'staff';
  userName?: string;
}

export const Layout = ({ 
  children, 
  currentPage = 'dashboard',
  onPageChange,
  userRole = 'admin',
  userName = 'Dr. Smith'
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Heart },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    ...(userRole === 'admin' ? [{ id: 'settings', label: 'Settings', icon: Settings }] : [])
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">DentalCare</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={currentPage === id ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                currentPage === id 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => {
                onPageChange?.(id);
                setSidebarOpen(false);
              }}
            >
              <Icon className="w-4 h-4 mr-3" />
              {label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">
                  {userName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-2 justify-start text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-foreground capitalize">
                  {currentPage === 'dashboard' ? 'Dashboard' : currentPage}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {currentPage === 'dashboard' && 'Welcome back to your dental practice'}
                  {currentPage === 'patients' && 'Manage patient records and information'}
                  {currentPage === 'appointments' && 'Schedule and manage appointments'}
                  {currentPage === 'settings' && 'System configuration and preferences'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};