import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, CreditCard, AlertTriangle, Check } from 'lucide-react';

interface BookingSummary {
  total: number;
  upcoming: number;
  completed: number;
}

interface MessageSummary {
  total: number;
  unread: number;
}

interface PaymentSummary {
  total: number;
  pending: number;
  paid: number;
}

const ClientOverview = () => {
  const [bookings, setBookings] = useState<BookingSummary>({ total: 0, upcoming: 0, completed: 0 });
  const [messages, setMessages] = useState<MessageSummary>({ total: 0, unread: 0 });
  const [payments, setPayments] = useState<PaymentSummary>({ total: 0, pending: 0, paid: 0 });
  const [loading, setLoading] = useState(true);
  
  // Mock data fetch - would be replaced with API calls
  useEffect(() => {
    const fetchDashboardData = () => {
      setTimeout(() => {
        // Mock data
        setBookings({ total: 2, upcoming: 1, completed: 1 });
        setMessages({ total: 5, unread: 2 });
        setPayments({ total: 3000, pending: 1500, paid: 1500 });
        setLoading(false);
      }, 800);
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading">Dashboard Overview</h1>
        <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Wedding Bookings</h3>
              <div className="mt-1 flex flex-col">
                <span className="text-2xl font-semibold">{bookings.total}</span>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{bookings.upcoming} upcoming</span>
                  <span className="mx-2">•</span>
                  <span>{bookings.completed} completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/client/bookings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all bookings →
            </Link>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start">
            <div className="bg-green-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-green-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Messages</h3>
              <div className="mt-1 flex flex-col">
                <span className="text-2xl font-semibold">{messages.total}</span>
                <div className="text-sm text-gray-500 mt-1">
                  <span className={`${messages.unread > 0 ? 'text-red-500 font-medium' : ''}`}>
                    {messages.unread} unread
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/client/messages" className="text-green-600 hover:text-green-800 text-sm font-medium">
              View all messages →
            </Link>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-start">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-purple-700" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Payments</h3>
              <div className="mt-1 flex flex-col">
                <span className="text-2xl font-semibold">${payments.total}</span>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="text-red-500 font-medium">${payments.pending} pending</span>
                  <span className="mx-2">•</span>
                  <span className="text-green-600">${payments.paid} paid</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/client/payments" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              View all payments →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Upcoming Wedding */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-6 font-heading">Your Upcoming Wedding</h2>
        
        {bookings.upcoming > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-primary-50 p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Summer Garden Wedding</h3>
                <p className="text-gray-600">Sunset Gardens Venue</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">July 15, 2025</p>
                <p className="text-sm text-gray-600">Saturday, 4:00 PM</p>
              </div>
            </div>
            
            <div className="p-4 bg-white">
              <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-3">Planning Progress</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Venue Booked</span>
                      <span className="text-sm text-gray-500">Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Catering Selected</span>
                      <span className="text-sm text-gray-500">Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Decoration Theme</span>
                      <span className="text-sm text-yellow-600">In Progress</span>
                    </div>
                    <div className="mt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-gray-300">
                    <div className="h-5 w-5 border-2 border-gray-300 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <span className="text-sm text-gray-500">Finalize Guest List</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
              <Link to="/dashboard/client/bookings" className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming weddings</h3>
            <p className="mt-1 text-gray-500">Get started by booking your perfect wedding day.</p>
            <div className="mt-6">
              <Link to="/booking" className="btn btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Recent Messages */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold font-heading">Recent Messages</h2>
          <Link to="/dashboard/client/messages" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </Link>
        </div>
        
        {messages.total > 0 ? (
          <div className="divide-y divide-gray-200">
            <div className="py-4 flex items-start">
              <img 
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
                alt="Wedding Planner" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Jessica (Wedding Planner)</p>
                  <span className="text-sm text-gray-500">Yesterday</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Hi there! I've added some new floral options to your decoration choices. Would you like to review them?
                </p>
              </div>
            </div>
            
            <div className="py-4 flex items-start">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="Catering Manager" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Michael (Catering Manager)</p>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <p className="text-gray-600 mt-1">
                  Your menu tasting has been scheduled for next Friday at 2pm. Looking forward to seeing you!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
            <p className="mt-1 text-sm text-gray-500">You don't have any messages yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOverview;