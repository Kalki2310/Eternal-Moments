import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <Heart className="h-16 w-16 text-primary-500 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold font-heading text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn btn-primary px-8 py-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;