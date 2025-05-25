import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { PACKAGE_CATEGORIES } from '../utils/constants';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'fixed' | 'starting';
  category: string;
  tier: 'budget' | 'standard' | 'premium' | 'luxury';
  features: string[];
  image: string;
}

const PackagesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data fetch - would be replaced with actual API call
  useEffect(() => {
    // Simulate API call
    const fetchPackages = () => {
      setLoading(true);
      // This would be an axios call in production
      setTimeout(() => {
        setPackages(mockPackages);
        setLoading(false);
      }, 800);
    };

    fetchPackages();
  }, []);

  const filteredPackages = activeCategory === 'All'
    ? packages
    : packages.filter(pkg => pkg.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1779414/pexels-photo-1779414.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
            Wedding Packages
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Tailored packages to make your special day perfect, from intimate gatherings to grand celebrations.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-16 z-10">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === 'All'
                  ? 'bg-primary-500 text-gray-900'
                  : 'bg-white border border-gray-200 hover:border-primary-300'
              }`}
            >
              All
            </button>
            {PACKAGE_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-500 text-gray-900'
                    : 'bg-white border border-gray-200 hover:border-primary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Display */}
      <section className="section bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-8 font-heading">
                {activeCategory === 'All' ? 'All Packages' : `${activeCategory} Packages`}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map(pkg => (
                  <div 
                    key={pkg.id} 
                    className="card overflow-hidden group transition-transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name} 
                        className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                        {pkg.tier.charAt(0).toUpperCase() + pkg.tier.slice(1)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold font-heading">{pkg.name}</h3>
                        <div className="text-secondary font-bold">
                          ${pkg.price.toLocaleString()}
                          <span className="text-sm text-gray-500 font-normal">
                            {pkg.priceType === 'starting' ? '+ starting' : ''}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{pkg.description}</p>
                      <div className="mb-5">
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Includes</h4>
                        <ul className="space-y-2">
                          {pkg.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                          {pkg.features.length > 3 && (
                            <li className="text-primary-600 text-sm">
                              +{pkg.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/packages/${pkg.id}`} 
                          className="text-primary-600 font-medium hover:text-primary-700"
                        >
                          View Details
                        </Link>
                        <Link 
                          to={`/booking?package=${pkg.id}`}
                          className="btn btn-primary"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredPackages.length === 0 && (
                <div className="text-center py-16">
                  <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No packages available</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any packages in this category.
                  </p>
                  <button
                    onClick={() => setActiveCategory('All')}
                    className="btn btn-outline"
                  >
                    View All Packages
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-semibold mb-4 font-heading">
            Can't find the perfect package?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Let us create a custom wedding package tailored specifically to your needs and vision.
          </p>
          <Link to="/booking?custom=true" className="btn btn-secondary px-8 py-3">
            Request Custom Package
          </Link>
        </div>
      </section>
    </div>
  );
};

// Mock data - would come from API in production
const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Intimate Ceremony',
    description: 'Perfect for couples seeking a small, intimate wedding ceremony with close family and friends.',
    price: 2500,
    priceType: 'starting',
    category: 'Venue',
    tier: 'budget',
    features: [
      'Ceremony venue for up to 50 guests',
      'Basic floral arrangements',
      'Ceremony coordination',
      'Photography (4 hours)',
      '2-hour venue rental'
    ],
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
  },
  {
    id: '2',
    name: 'Garden Reception',
    description: 'A beautiful garden setting with elegant décor for your wedding reception.',
    price: 4800,
    priceType: 'starting',
    category: 'Venue',
    tier: 'standard',
    features: [
      'Outdoor reception venue for up to 100 guests',
      'Basic décor setup',
      'Tables and chairs',
      'Lighting and sound system',
      '6-hour venue rental',
      'On-site coordinator'
    ],
    image: 'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg'
  },
  {
    id: '3',
    name: 'Gourmet Feast',
    description: 'Exquisite catering service featuring gourmet cuisine for your wedding reception.',
    price: 75,
    priceType: 'fixed',
    category: 'Catering',
    tier: 'premium',
    features: [
      'Gourmet 3-course meal (per person)',
      'Professional service staff',
      'Custom menu planning',
      'Wine and champagne service',
      'Cake cutting service',
      'Tasting session for couple'
    ],
    image: 'https://images.pexels.com/photos/5779787/pexels-photo-5779787.jpeg'
  },
  {
    id: '4',
    name: 'Floral Elegance',
    description: 'Transform your venue with elegant floral arrangements and decorations.',
    price: 3200,
    priceType: 'starting',
    category: 'Decoration',
    tier: 'premium',
    features: [
      'Bridal bouquet & 4 bridesmaid bouquets',
      'Ceremony arch decoration',
      '10 centerpieces for reception tables',
      'Boutonnieres for groom and groomsmen',
      'Flower petals for flower girl',
      'Custom floral installations'
    ],
    image: 'https://images.pexels.com/photos/931179/pexels-photo-931179.jpeg'
  },
  {
    id: '5',
    name: 'Moments Captured',
    description: 'Comprehensive photography and videography to capture your special day.',
    price: 4000,
    priceType: 'fixed',
    category: 'Photography',
    tier: 'standard',
    features: [
      '10 hours of photography coverage',
      '8 hours of videography coverage',
      'Drone footage',
      'Edited photo gallery (digital)',
      'Full-length wedding film',
      'Highlight reel (5-7 minutes)',
      'Engagement photo session'
    ],
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg'
  },
  {
    id: '6',
    name: 'Full Dream Wedding',
    description: 'Our comprehensive package includes everything you need for the perfect wedding day.',
    price: 15000,
    priceType: 'starting',
    category: 'Full Service',
    tier: 'luxury',
    features: [
      'Ceremony & reception venue',
      'Complete planning and coordination',
      'Catering for up to 150 guests',
      'Professional photography & videography',
      'DJ and entertainment',
      'Floral arrangements & decorations',
      'Wedding cake',
      'Transportation',
      'Accommodations for wedding couple'
    ],
    image: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg'
  }
];

export default PackagesPage;