import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-primary-400 mr-2" />
              <span className="text-xl font-heading font-semibold">Eternal Moments</span>
            </Link>
            <p className="text-neutral-300 mb-6">
              Creating unforgettable wedding experiences with elegance and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-heading font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-heading font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/packages#venue" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Venue Selection
                </Link>
              </li>
              <li>
                <Link to="/packages#catering" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Catering Services
                </Link>
              </li>
              <li>
                <Link to="/packages#decoration" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Decoration & Themes
                </Link>
              </li>
              <li>
                <Link to="/packages#photography" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Photography & Videography
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-lg font-heading font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary-400 mr-3 mt-0.5 shrink-0" />
                <span className="text-neutral-300">(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary-400 mr-3 mt-0.5 shrink-0" />
                <span className="text-neutral-300">info@eternalmoments.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-0.5 shrink-0" />
                <span className="text-neutral-300">123 Wedding Blvd, Suite 101, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-12 pt-8 text-center text-neutral-400 text-sm">
          <p>© {currentYear} Eternal Moments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;