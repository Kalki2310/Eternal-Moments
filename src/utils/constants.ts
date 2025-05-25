// API URL - Update this with your actual API URL when deploying
export const API_URL = import.meta.env.VITE_API_URL || 'https://eternal-moments-wedding-management-system.onrender.com';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;

// Wedding package categories
export const PACKAGE_CATEGORIES = [
  'Venue',
  'Catering',
  'Decoration',
  'Photography',
  'Entertainment',
  'Full Service'
];

// Wedding package price ranges
export const PRICE_RANGES = [
  { label: 'Budget', value: 'budget' },
  { label: 'Standard', value: 'standard' },
  { label: 'Premium', value: 'premium' },
  { label: 'Luxury', value: 'luxury' }
];

// Guest count ranges
export const GUEST_RANGES = [
  { label: 'Intimate (1-50)', min: 1, max: 50 },
  { label: 'Small (51-100)', min: 51, max: 100 },
  { label: 'Medium (101-200)', min: 101, max: 200 },
  { label: 'Large (201-300)', min: 201, max: 300 },
  { label: 'Extra Large (301+)', min: 301, max: null }
];

// Wedding imagery for the site
export const HERO_IMAGES = [
  'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
  'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
  'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg'
];

export const GALLERY_CATEGORIES = [
  'Ceremony',
  'Reception',
  'Decor',
  'Couples',
  'Family'
];

// Dashboard menu items by role
export const DASHBOARD_MENUS = {
  client: [
    { label: 'Overview', path: '/dashboard/client' },
    { label: 'My Bookings', path: '/dashboard/client/bookings' },
    { label: 'Messages', path: '/dashboard/client/messages' },
    { label: 'Payments', path: '/dashboard/client/payments' },
    { label: 'Profile', path: '/dashboard/client/profile' }
  ],
  vendor: [
    { label: 'Overview', path: '/dashboard/vendor' },
    { label: 'Assigned Weddings', path: '/dashboard/vendor/weddings' },
    { label: 'Messages', path: '/dashboard/vendor/messages' },
    { label: 'Availability', path: '/dashboard/vendor/availability' },
    { label: 'Profile', path: '/dashboard/vendor/profile' }
  ],
  admin: [
    { label: 'Overview', path: '/dashboard/admin' },
    { label: 'Manage Users', path: '/dashboard/admin/users' },
    { label: 'Manage Bookings', path: '/dashboard/admin/bookings' },
    { label: 'Manage Packages', path: '/dashboard/admin/packages' },
    { label: 'Manage Gallery', path: '/dashboard/admin/gallery' }
  ]
};