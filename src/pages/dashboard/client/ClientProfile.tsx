import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { User, Save } from 'lucide-react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  partnerFirstName: string;
  partnerLastName: string;
  weddingDate: string | null;
}

const ClientProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    partnerFirstName: '',
    partnerLastName: '',
    weddingDate: null
  });
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Mock data fetch - would be replaced with API call
  useEffect(() => {
    if (user) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setProfile({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: '(555) 123-4567',
          address: '123 Main St, New York, NY 10001',
          partnerFirstName: 'Jane',
          partnerLastName: 'Doe',
          weddingDate: '2025-07-15'
        });
        setLoading(false);
      }, 800);
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
    
    // Reset success message when user starts typing
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  
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
        <h1 className="text-2xl font-bold font-heading mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your personal information and preferences</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-medium mb-6">Personal Information</h2>
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-2 text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="input bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address cannot be changed
              </p>
            </div>
            
            <div>
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>
        
        {/* Partner Information */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-medium mb-6">Partner Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="partnerFirstName" className="form-label">Partner's First Name</label>
              <input
                type="text"
                id="partnerFirstName"
                name="partnerFirstName"
                value={profile.partnerFirstName}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="partnerLastName" className="form-label">Partner's Last Name</label>
              <input
                type="text"
                id="partnerLastName"
                name="partnerLastName"
                value={profile.partnerLastName}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </div>
        
        {/* Wedding Details */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-medium mb-6">Wedding Details</h2>
          
          <div>
            <label htmlFor="weddingDate" className="form-label">Wedding Date</label>
            <input
              type="date"
              id="weddingDate"
              name="weddingDate"
              value={profile.weddingDate || ''}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          {saveSuccess && (
            <div className="mr-4 bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Profile saved successfully!
            </div>
          )}
          
          <button
            type="submit"
            className="btn btn-primary flex items-center"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientProfile;