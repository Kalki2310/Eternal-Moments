import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, MessageSquare, CreditCard, User, ChevronRight, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import ClientOverview from './ClientOverview';
import ClientBookings from './ClientBookings';
import ClientMessages from './ClientMessages';
import ClientPayments from './ClientPayments';
import ClientProfile from './ClientProfile';
import { useAuth } from '../../../contexts/AuthContext';
import { DASHBOARD_MENUS } from '../../../utils/constants';

const ClientDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  if (!user) return null;
  
  const clientMenuItems = DASHBOARD_MENUS.client;
  
  const getIcon = (label: string) => {
    switch(label) {
      case 'Overview': return <LayoutDashboard className="w-5 h-5" />;
      case 'My Bookings': return <Calendar className="w-5 h-5" />;
      case 'Messages': return <MessageSquare className="w-5 h-5" />;
      case 'Payments': return <CreditCard className="w-5 h-5" />;
      case 'Profile': return <User className="w-5 h-5" />;
      default: return <LayoutDashboard className="w-5 h-5" />;
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-16">
      {/* Mobile menu toggle */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">Dashboard Menu</span>
          {mobileMenuOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside 
        className={`md:w-64 bg-white border-r border-gray-200 md:block ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold font-heading">Client Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome, {user.firstName} {user.lastName}
          </p>
        </div>
        
        <nav className="py-4">
          <ul className="space-y-1">
            {clientMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard/client'}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                      isActive ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-500' : ''
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getIcon(item.label)}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 min-h-screen">
        <Routes>
          <Route index element={<ClientOverview />} />
          <Route path="bookings" element={<ClientBookings />} />
          <Route path="messages" element={<ClientMessages />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="profile" element={<ClientProfile />} />
        </Routes>
      </main>
    </div>
  );
};

export default ClientDashboard;