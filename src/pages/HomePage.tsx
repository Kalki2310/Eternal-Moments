import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Camera, Utensils, Users, Star } from 'lucide-react';
import { HERO_IMAGES } from '../utils/constants';

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-20" />
        
        <div className="relative z-30 flex items-center justify-center h-full container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-4 max-w-3xl mx-auto leading-tight">
              Creating Unforgettable Wedding Memories
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Your perfect day deserves perfect planning. Let us handle the details while you focus on the love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/packages" className="btn bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3">
                View Packages
              </Link>
              <Link to="/booking" className="btn bg-primary-500 text-gray-900 hover:bg-primary-600 text-lg px-8 py-3">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Wedding Services</h2>
          <p className="section-subtitle">
            From intimate gatherings to grand celebrations, we offer comprehensive wedding planning services tailored to your vision.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="card p-6 text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Event Planning</h3>
              <p className="text-gray-600">
                Comprehensive planning services from venue selection to day-of coordination, ensuring every detail is perfect.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Catering Excellence</h3>
              <p className="text-gray-600">
                Exquisite menu options crafted by top chefs, from elegant sit-down dinners to lavish buffets.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-heading">Photography & Video</h3>
              <p className="text-gray-600">
                Capture every magical moment with our professional photography and videography services.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/packages" className="btn btn-secondary px-8">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Weddings Section */}
      <section className="section bg-neutral-50">
        <div className="container-custom">
          <h2 className="section-title">Featured Weddings</h2>
          <p className="section-subtitle">
            Be inspired by some of our recent celebrations and imagine your own perfect day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="card overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg" 
                  alt="Sarah & Michael's Beach Wedding" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-heading">Sarah & Michael's Beach Wedding</h3>
                <p className="text-gray-600 mb-4">
                  An elegant seaside celebration with 150 guests, featuring a sunset ceremony and reception under the stars.
                </p>
                <Link to="/gallery" className="text-primary-600 font-medium hover:text-primary-700">
                  View Gallery →
                </Link>
              </div>
            </div>
            
            <div className="card overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg" 
                  alt="James & Emily's Garden Wedding" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 font-heading">James & Emily's Garden Wedding</h3>
                <p className="text-gray-600 mb-4">
                  A romantic garden ceremony with lush floral arrangements and an intimate reception for 75 guests.
                </p>
                <Link to="/gallery" className="text-primary-600 font-medium hover:text-primary-700">
                  View Gallery →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/gallery" className="btn btn-outline px-8">
              View All Weddings
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Happy Couples</h2>
          <p className="section-subtitle">
            Don't just take our word for it. See what our couples have to say about their wedding experience with us.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="card p-8">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current text-secondary" />
                ))}
              </div>
              <p className="mb-6 text-gray-600 italic">
                "Our wedding day was absolutely perfect thanks to Eternal Moments. Their attention to detail and personalized approach made planning stress-free."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                  alt="Emma & David" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold">Emma & David</p>
                  <p className="text-sm text-gray-500">June 2024</p>
                </div>
              </div>
            </div>
            
            <div className="card p-8">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current text-secondary" />
                ))}
              </div>
              <p className="mb-6 text-gray-600 italic">
                "From venue selection to day-of coordination, everything was handled with professionalism and care. Our guests are still talking about it!"
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/5051275/pexels-photo-5051275.jpeg" 
                  alt="Jessica & Thomas" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold">Jessica & Thomas</p>
                  <p className="text-sm text-gray-500">May 2024</p>
                </div>
              </div>
            </div>
            
            <div className="card p-8">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-current text-secondary" />
                ))}
              </div>
              <p className="mb-6 text-gray-600 italic">
                "Working with Eternal Moments turned our dream wedding into reality. They listened to our vision and executed it flawlessly."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/3916800/pexels-photo-3916800.jpeg" 
                  alt="Maria & Alex" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold">Maria & Alex</p>
                  <p className="text-sm text-gray-500">April 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-50">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-heading">Ready to Plan Your Perfect Day?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's create the wedding of your dreams together. Contact us for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn btn-secondary text-lg px-8 py-3">
                Book a Consultation
              </Link>
              <Link to="/packages" className="btn btn-outline text-lg px-8 py-3">
                Explore Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;