import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useAuth } from '../contexts/AuthContext';
import { Check, ChevronRight, ChevronLeft, Calendar, Info } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import { GUEST_RANGES, PACKAGE_CATEGORIES } from '../utils/constants';

interface BookingData {
  eventDate: Date | null;
  packageId: string;
  venue: string;
  guestCount: number;
  specialRequests: string;
  contactPhone: string;
  additionalServices: string[];
}

const steps = [
  { id: 'date', name: 'Date & Venue' },
  { id: 'details', name: 'Event Details' },
  { id: 'services', name: 'Services' },
  { id: 'review', name: 'Review & Book' }
];

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    eventDate: null,
    packageId: searchParams.get('package') || '',
    venue: '',
    guestCount: 50,
    specialRequests: '',
    contactPhone: '',
    additionalServices: []
  });
  
  useEffect(() => {
    if (bookingData.packageId) {
      // This would be an API call in production
      // fetchPackageDetails(bookingData.packageId).then(data => {
      //   // Update form with package details
      // });
    }
  }, [bookingData.packageId]);

  const handleDateChange = (date: Date | null) => {
    setBookingData({ ...bookingData, eventDate: date });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({
      ...bookingData,
      guestCount: parseInt(e.target.value, 10) || 0
    });
  };

  const handleServiceToggle = (service: string) => {
    const updatedServices = bookingData.additionalServices.includes(service)
      ? bookingData.additionalServices.filter(s => s !== service)
      : [...bookingData.additionalServices, service];
    
    setBookingData({
      ...bookingData,
      additionalServices: updatedServices
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: '/booking',
          bookingData
        }
      });
      return;
    }
    
    try {
      // This would be an API call in production
      // await createBooking(bookingData);
      navigate('/dashboard/client/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="pt-0">
      {/* Hero Banner */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
            Book Your Wedding
          </h1>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Let's start planning your perfect day. Fill out the form below to get started.
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="container-custom">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li key={step.id} className="relative flex items-center">
                  <div className="flex items-center">
                    {index <= currentStep ? (
                      <div className="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center text-white">
                        {index < currentStep ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                    ) : (
                      <div className="h-9 w-9 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500">
                        {index + 1}
                      </div>
                    )}
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-full bg-gray-200 h-0.5 mx-4">
                      <div
                        className="bg-primary-500 h-0.5 transition-all duration-500"
                        style={{ width: index < currentStep ? '100%' : '0%' }}
                      ></div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Booking Form */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl">
          {/* Step 1: Date & Venue */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold font-heading">Choose Your Wedding Date</h2>
              
              <div className="card p-6">
                <div className="mb-6">
                  <label htmlFor="eventDate" className="form-label">Wedding Date</label>
                  <div className="mt-1 relative rounded-md">
                    <DatePicker
                      selected={bookingData.eventDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      className="input"
                      placeholderText="Select your wedding date"
                      dateFormat="MMMM d, yyyy"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-start">
                    <Info className="w-4 h-4 mr-1 text-blue-500 mt-0.5 shrink-0" />
                    Pick a date at least 3 months in advance for the best availability.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="venue" className="form-label">Preferred Venue/Location</label>
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    className="input"
                    value={bookingData.venue}
                    onChange={handleInputChange}
                    placeholder="e.g., Beach, Garden, Hotel Ballroom, etc."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    If you're not sure, write "Undecided" and we'll help you choose.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold font-heading">Tell Us About Your Wedding</h2>
              
              <div className="card p-6">
                <div className="mb-6">
                  <label htmlFor="guestCount" className="form-label">Estimated Number of Guests</label>
                  <input
                    type="number"
                    name="guestCount"
                    id="guestCount"
                    min="1"
                    max="500"
                    className="input"
                    value={bookingData.guestCount}
                    onChange={handleGuestCountChange}
                  />
                  <div className="mt-4">
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="10"
                      value={bookingData.guestCount}
                      onChange={handleGuestCountChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      {GUEST_RANGES.map((range) => (
                        <span key={range.label}>
                          {range.min}
                        </span>
                      ))}
                      <span>300+</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="form-label">Contact Phone Number</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    className="input"
                    value={bookingData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="mt-6">
                  <label htmlFor="specialRequests" className="form-label">Special Requests or Notes</label>
                  <textarea
                    name="specialRequests"
                    id="specialRequests"
                    rows={4}
                    className="input"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Tell us about any special requirements, themes, or preferences..."
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services Selection */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold font-heading">Select Wedding Services</h2>
              
              <div className="card p-6">
                <p className="mb-4 text-gray-600">
                  Choose the services you're interested in for your wedding:
                </p>
                
                <div className="space-y-4">
                  {PACKAGE_CATEGORIES.map((service) => (
                    <div key={service} className="flex items-center">
                      <input
                        id={`service-${service}`}
                        name={`service-${service}`}
                        type="checkbox"
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked={bookingData.additionalServices.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                      />
                      <label htmlFor={`service-${service}`} className="ml-3 text-gray-700">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-gray-700 flex items-start">
                    <Info className="w-5 h-5 mr-1 text-primary-600 shrink-0" />
                    <span>
                      You can select multiple services. Our team will contact you to discuss detailed packages and pricing based on your selection.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Book */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold font-heading">Review Your Wedding Booking</h2>
              
              <div className="card p-6">
                <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                
                <div className="divide-y divide-gray-200">
                  <div className="py-4 grid grid-cols-3">
                    <span className="text-gray-500">Wedding Date:</span>
                    <span className="col-span-2 font-medium">
                      {bookingData.eventDate 
                        ? new Date(bookingData.eventDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          }) 
                        : 'Not selected'}
                    </span>
                  </div>
                  
                  <div className="py-4 grid grid-cols-3">
                    <span className="text-gray-500">Venue/Location:</span>
                    <span className="col-span-2 font-medium">
                      {bookingData.venue || 'Not specified'}
                    </span>
                  </div>
                  
                  <div className="py-4 grid grid-cols-3">
                    <span className="text-gray-500">Guest Count:</span>
                    <span className="col-span-2 font-medium">
                      {bookingData.guestCount} guests
                    </span>
                  </div>
                  
                  <div className="py-4 grid grid-cols-3">
                    <span className="text-gray-500">Selected Services:</span>
                    <div className="col-span-2">
                      {bookingData.additionalServices.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {bookingData.additionalServices.map(service => (
                            <li key={service} className="font-medium">{service}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="font-medium">No services selected</span>
                      )}
                    </div>
                  </div>
                  
                  {bookingData.specialRequests && (
                    <div className="py-4 grid grid-cols-3">
                      <span className="text-gray-500">Special Requests:</span>
                      <div className="col-span-2">
                        <p className="font-medium whitespace-pre-line">{bookingData.specialRequests}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="py-4 grid grid-cols-3">
                    <span className="text-gray-500">Contact Phone:</span>
                    <span className="col-span-2 font-medium">
                      {bookingData.contactPhone || 'Not provided'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800 flex items-start">
                    <Info className="w-5 h-5 mr-2 text-blue-500 shrink-0" />
                    <span>
                      By submitting this booking, you're requesting our wedding services. Our team will contact you within 24-48 hours to discuss details and finalize your booking. A 25% deposit will be required to secure your date.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={`btn btn-outline flex items-center ${currentStep === 0 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary flex items-center"
                disabled={currentStep === 0 && !bookingData.eventDate}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-secondary flex items-center"
              >
                Complete Booking
                <Check className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;