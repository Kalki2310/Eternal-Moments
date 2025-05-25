import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Check, X } from 'lucide-react';

interface Booking {
  id: string;
  eventDate: string;
  venue: string;
  guestCount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  services: string[];
  totalAmount: number;
  paidAmount: number;
}

const ClientBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data fetch
  useEffect(() => {
    // Simulate API call
    const fetchBookings = () => {
      setLoading(true);
      // This would be an axios call in production
      setTimeout(() => {
        setBookings(mockBookings);
        setLoading(false);
      }, 800);
    };

    fetchBookings();
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
      <div>
        <h1 className="text-2xl font-bold font-heading mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage all your wedding bookings</p>
      </div>
      
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="card overflow-hidden">
              <div className={`px-4 py-2 text-sm font-medium ${
                booking.status === 'upcoming' 
                  ? 'bg-blue-500 text-white' 
                  : booking.status === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} Wedding
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-medium">Wedding Event #{booking.id}</h3>
                    
                    <div className="mt-2 flex flex-wrap gap-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(booking.eventDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{new Date(booking.eventDate).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{booking.venue}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{booking.guestCount} Guests</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Payment Status</div>
                    <div className="flex items-center justify-end">
                      <div className="bg-gray-200 rounded-full h-2 w-32">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(booking.paidAmount / booking.totalAmount) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        ${booking.paidAmount} / ${booking.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Services Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {booking.services.map((service, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button className="btn btn-outline">View Details</button>
                  
                  {booking.status === 'upcoming' && (
                    <button className="btn btn-primary">
                      Make Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings yet</h3>
          <p className="mt-1 text-gray-500">Get started by booking your perfect wedding day.</p>
          <div className="mt-6">
            <a href="/booking" className="btn btn-primary">
              Book Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data
const mockBookings: Booking[] = [
  {
    id: "WB-2024-001",
    eventDate: "2025-07-15T16:00:00.000Z",
    venue: "Sunset Gardens",
    guestCount: 120,
    status: 'upcoming',
    services: ['Venue', 'Catering', 'Photography', 'Decoration'],
    totalAmount: 12000,
    paidAmount: 3000
  },
  {
    id: "WB-2024-002",
    eventDate: "2024-03-22T15:00:00.000Z",
    venue: "Beachside Resort",
    guestCount: 85,
    status: 'completed',
    services: ['Venue', 'Catering', 'Entertainment'],
    totalAmount: 8500,
    paidAmount: 8500
  }
];

export default ClientBookings;