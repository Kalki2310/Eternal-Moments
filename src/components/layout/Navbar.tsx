import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'vendor':
        return '/dashboard/vendor';
      default:
        return '/dashboard/client';
    }
  };

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Heart className="w-7 h-7 text-primary-500 mr-2" />
            <span className="text-xl font-heading font-semibold">Eternal Moments</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={({isActive}) => 
              `nav-link ${isActive ? 'text-primary-600' : ''}`
            }>
              Home
            </NavLink>
            <NavLink to="/packages" className={({isActive}) => 
              `nav-link ${isActive ? 'text-primary-600' : ''}`
            }>
              Packages
            </NavLink>
            <NavLink to="/gallery" className={({isActive}) => 
              `nav-link ${isActive ? 'text-primary-600' : ''}`
            }>
              Gallery
            </NavLink>
            <NavLink to="/booking" className={({isActive}) => 
              `nav-link ${isActive ? 'text-primary-600' : ''}`
            }>
              Book Now
            </NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to={getDashboardPath()} className="btn btn-outline flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Login</Link>
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen py-4 shadow-lg' : 'max-h-0 overflow-hidden'}`}>
        <div className="container-custom flex flex-col space-y-3">
          <NavLink 
            to="/" 
            className={({isActive}) => `px-4 py-2 ${isActive ? 'bg-primary-50 text-primary-600' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/packages" 
            className={({isActive}) => `px-4 py-2 ${isActive ? 'bg-primary-50 text-primary-600' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Packages
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({isActive}) => `px-4 py-2 ${isActive ? 'bg-primary-50 text-primary-600' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </NavLink>
          <NavLink 
            to="/booking" 
            className={({isActive}) => `px-4 py-2 ${isActive ? 'bg-primary-50 text-primary-600' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </NavLink>
          
          <div className="pt-3 border-t border-gray-200">
            {user ? (
              <>
                <Link 
                  to={getDashboardPath()} 
                  className="px-4 py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 w-full text-left flex items-center gap-2 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link 
                  to="/login" 
                  className="btn btn-outline w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;