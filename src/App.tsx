import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PackagesPage from './pages/PackagesPage';
import GalleryPage from './pages/GalleryPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClientDashboard from './pages/dashboard/client/ClientDashboard';
import VendorDashboard from './pages/dashboard/vendor/VendorDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        
        {/* Protected routes */}
        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route path="client/*" element={<ClientDashboard />} />
          <Route path="vendor/*" element={<VendorDashboard />} />
          <Route path="admin/*" element={<AdminDashboard />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;