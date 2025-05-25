import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, MessageSquare, Clock, User, ChevronRight, ChevronDown,
  DollarSign, Star
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { DASHBOARD_MENUS } from '../../../utils/constants';

const VendorOverview = () => {
  const stats = {
    activeWeddings: 5,
    completedWeddings: 12,
    totalEarnings: 45000,
    averageRating: 4.8
  };

  const upcomingWeddings = [
    {
      id: 'WB-2024-001',
      couple: 'Michael & Emma',
      date: '2024-07-15',
      venue: 'Sunset Gardens',
      services: ['Photography', 'Videography']
    },
    {
      id: 'WB-2024-002',
      couple: 'David & Lisa',
      date: '2024-08-22',
      venue: 'Beachside Resort',
      services: ['Photography']
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">Vendor Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Active Weddings</h3>
          <p className="text-3xl font-bold">{stats.activeWeddings}</p>
          <p className="text-sm text-gray-500 mt-2">Currently in progress</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold">{stats.completedWeddings}</p>
          <p className="text-sm text-gray-500 mt-2">Total weddings completed</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">All time earnings</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Rating</h3>
          <p className="text-3xl font-bold">{stats.averageRating}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(stats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Weddings */}
      <div className="card p-6">
        <h3 className="text-lg font-medium mb-4">Upcoming Weddings</h3>
        <div className="space-y-4">
          {upcomingWeddings.map(wedding => (
            <div key={wedding.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{wedding.couple}</h4>
                  <p className="text-sm text-gray-500">{wedding.venue}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {wedding.services.map(service => (
                      <span key={service} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date(wedding.date).toLocaleDateString()}</p>
                  <button className="text-primary-600 text-sm mt-2">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorWeddings = () => {
  const weddings = [
    {
      id: 'WB-2024-001',
      couple: 'Michael & Emma',
      date: '2024-07-15',
      venue: 'Sunset Gardens',
      services: ['Photography', 'Videography'],
      status: 'upcoming'
    },
    {
      id: 'WB-2024-002',
      couple: 'David & Lisa',
      date: '2024-08-22',
      venue: 'Beachside Resort',
      services: ['Photography'],
      status: 'completed'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assigned Weddings</h2>
      
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wedding ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Couple</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weddings.map(wedding => (
              <tr key={wedding.id}>
                <td className="px-6 py-4 whitespace-nowrap">{wedding.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{wedding.couple}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(wedding.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{wedding.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {wedding.services.map(service => (
                      <span key={service} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    wedding.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {wedding.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary-600 hover:text-primary-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VendorMessages = () => {
  const messages = [
    {
      id: 1,
      from: 'Michael & Emma',
      message: 'Hi, we would like to discuss the photography package for our wedding.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Wedding Coordinator',
      message: 'Please confirm your availability for the upcoming wedding next month.',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      
      <div className="card divide-y divide-gray-200">
        {messages.map(message => (
          <div key={message.id} className={`p-4 ${message.unread ? 'bg-primary-50' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{message.from}</h3>
                <p className="text-gray-600 mt-1">{message.message}</p>
              </div>
              <div className="text-sm text-gray-500">{message.time}</div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-primary-600">Reply</button>
              {message.unread && (
                <button className="text-gray-600">Mark as Read</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VendorAvailability = () => {
  const schedule = [
    {
      date: '2024-07-15',
      events: [
        { time: '14:00', event: 'Wedding Ceremony - Michael & Emma' },
        { time: '16:00', event: 'Reception Photography' }
      ]
    },
    {
      date: '2024-07-22',
      events: [
        { time: '10:00', event: 'Engagement Shoot - David & Lisa' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Availability Calendar</h2>
        <button className="btn btn-primary">Add Event</button>
      </div>
      
      <div className="card p-6">
        <div className="space-y-6">
          {schedule.map(day => (
            <div key={day.date} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <h3 className="font-medium mb-4">{new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</h3>
              <div className="space-y-3">
                {day.events.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-20 font-medium">{event.time}</div>
                    <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                      {event.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorProfile = () => {
  const [profile, setProfile] = useState({
    specialties: ['Wedding Photography', 'Videography'],
    experience: '5 years',
    portfolio: [
      {
        id: 1,
        title: 'Beach Wedding',
        image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg'
      },
      {
        id: 2,
        title: 'Garden Reception',
        image: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg'
      }
    ]
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Vendor Profile</h2>
      
      <div className="card p-6">
        <h3 className="text-lg font-medium mb-4">Specialties & Experience</h3>
        <div className="space-y-4">
          <div>
            <label className="form-label">Specialties</label>
            <div className="flex flex-wrap gap-2">
              {profile.specialties.map(specialty => (
                <span key={specialty} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="form-label">Experience</label>
            <p>{profile.experience}</p>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h3 className="text-lg font-medium mb-4">Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.portfolio.map(item => (
            <div key={item.id} className="overflow-hidden rounded-lg">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <p className="mt-2 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VendorDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  if (!user) return null;
  
  const vendorMenuItems = DASHBOARD_MENUS.vendor;
  
  const getIcon = (label: string) => {
    switch(label) {
      case 'Overview': return <LayoutDashboard className="w-5 h-5" />;
      case 'Assigned Weddings': return <Calendar className="w-5 h-5" />;
      case 'Messages': return <MessageSquare className="w-5 h-5" />;
      case 'Availability': return <Clock className="w-5 h-5" />;
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
          <h2 className="text-lg font-semibold font-heading">Vendor Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome, {user.firstName} {user.lastName}
          </p>
        </div>
        
        <nav className="py-4">
          <ul className="space-y-1">
            {vendorMenuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard/vendor'}
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
      <main className="flex-1 bg-gray-50 p-6">
        <Routes>
          <Route index element={<VendorOverview />} />
          <Route path="weddings" element={<VendorWeddings />} />
          <Route path="messages" element={<VendorMessages />} />
          <Route path="availability" element={<VendorAvailability />} />
          <Route path="profile" element={<VendorProfile />} />
        </Routes>
      </main>
    </div>
  );
};

export default VendorDashboard;