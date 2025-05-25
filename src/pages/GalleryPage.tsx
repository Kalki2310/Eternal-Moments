import { useState, useEffect } from 'react';
import { GALLERY_CATEGORIES } from '../utils/constants';

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  description?: string;
}

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Mock data fetch
  useEffect(() => {
    // Simulate API call
    const fetchGallery = () => {
      setLoading(true);
      // This would be an axios call in production
      setTimeout(() => {
        setGalleryImages(mockGalleryImages);
        setLoading(false);
      }, 800);
    };

    fetchGallery();
  }, []);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1793525/pexels-photo-1793525.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
            Wedding Gallery
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Explore beautiful moments from weddings we've had the honor to plan and organize.
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
            {GALLERY_CATEGORIES.map(category => (
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

      {/* Gallery Grid */}
      <section className="section bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => {/* Open modal with full image */}}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-500">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && !loading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No images available</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any images in this category.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="btn btn-outline"
              >
                View All Images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Book a Photographer CTA */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-semibold mb-4 font-heading">
            Want amazing wedding photos like these?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our professional photographers can capture your special day with the same attention to detail and artistry.
          </p>
          <a href="/packages#photography" className="btn btn-secondary px-8 py-3">
            View Photography Packages
          </a>
        </div>
      </section>
    </div>
  );
};

// Mock gallery data - would come from API in production
const mockGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/1779415/pexels-photo-1779415.jpeg',
    category: 'Ceremony',
    title: 'Garden Ceremony',
    description: 'Beautiful garden wedding ceremony with floral arch'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg',
    category: 'Ceremony',
    title: 'Beach Exchange of Vows',
    description: 'Intimate beach ceremony at sunset'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
    category: 'Couples',
    title: 'First Look Moment',
    description: 'Emotional first look between bride and groom'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg',
    category: 'Couples',
    title: 'Sunset Portrait',
    description: 'Romantic couple portrait during golden hour'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg',
    category: 'Decor',
    title: 'Elegant Table Setting',
    description: 'Luxury reception table with floral centerpieces'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/931183/pexels-photo-931183.jpeg',
    category: 'Decor',
    title: 'Floral Elegance',
    description: 'Elaborate floral decorations for ceremony space'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/3347447/pexels-photo-3347447.jpeg',
    category: 'Reception',
    title: 'First Dance',
    description: 'Emotional first dance between newlyweds'
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    category: 'Reception',
    title: 'Celebration Dinner',
    description: 'Joyful reception dinner with friends and family'
  },
  {
    id: '9',
    url: 'https://images.pexels.com/photos/2253867/pexels-photo-2253867.jpeg',
    category: 'Family',
    title: 'Family Moments',
    description: 'Heartfelt moments with close family members'
  }
];

export default GalleryPage;