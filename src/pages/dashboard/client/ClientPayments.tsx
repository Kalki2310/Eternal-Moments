import { useState, useEffect } from 'react';
import { CreditCard, Download, Check, Clock, AlertTriangle } from 'lucide-react';

interface Payment {
  id: string;
  bookingId: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  dueDate?: string;
  paymentMethod?: string;
}

const ClientPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data fetch
  useEffect(() => {
    // Simulate API call
    const fetchPayments = () => {
      setLoading(true);
      setTimeout(() => {
        setPayments(mockPayments);
        setLoading(false);
      }, 800);
    };

    fetchPayments();
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'paid': 
        return <Check className="h-5 w-5 text-green-500" />;
      case 'pending': 
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed': 
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: 
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch(status) {
      case 'paid': 
        return 'Paid';
      case 'pending': 
        return 'Payment Due';
      case 'failed': 
        return 'Failed';
      default: 
        return '';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'paid': 
        return 'bg-green-100 text-green-800';
      case 'pending': 
        return 'bg-yellow-100 text-yellow-800';
      case 'failed': 
        return 'bg-red-100 text-red-800';
      default: 
        return '';
    }
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
        <h1 className="text-2xl font-bold font-heading mb-2">Payments</h1>
        <p className="text-gray-600">View and manage all your wedding payments</p>
      </div>
      
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Total Amount</h3>
          <p className="text-3xl font-bold">${calculateTotal(payments)}</p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Amount Paid</h3>
          <p className="text-3xl font-bold text-green-600">
            ${calculatePaid(payments)}
          </p>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium mb-2">Amount Due</h3>
          <p className="text-3xl font-bold text-yellow-600">
            ${calculateDue(payments)}
          </p>
        </div>
      </div>
      
      {/* Payment List */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-medium">Payment History</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {payments.length > 0 ? (
            payments.map(payment => (
              <div key={payment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-medium">{payment.description}</h3>
                    <p className="text-sm text-gray-500">
                      Invoice #{payment.id} • {new Date(payment.date).toLocaleDateString()}
                    </p>
                    {payment.status === 'pending' && payment.dueDate && (
                      <p className="text-sm text-yellow-600 mt-1">
                        Due by {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{getStatusText(payment.status)}</span>
                    </span>
                    
                    <div className="font-medium text-lg">
                      ${payment.amount.toLocaleString()}
                    </div>
                    
                    {payment.status === 'paid' && (
                      <button className="btn btn-outline flex items-center text-sm py-1">
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </button>
                    )}
                    
                    {payment.status === 'pending' && (
                      <button className="btn btn-primary flex items-center text-sm py-1">
                        <CreditCard className="w-4 h-4 mr-1" />
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No payments yet</h3>
              <p className="mt-1 text-gray-500">
                No payment records found for your bookings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const calculateTotal = (payments: Payment[]) => {
  return payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString();
};

const calculatePaid = (payments: Payment[]) => {
  return payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0)
    .toLocaleString();
};

const calculateDue = (payments: Payment[]) => {
  return payments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0)
    .toLocaleString();
};

// Mock data
const mockPayments: Payment[] = [
  {
    id: "INV-2024-001",
    bookingId: "WB-2024-001",
    description: "Wedding Deposit - Sunset Gardens",
    amount: 3000,
    status: 'paid',
    date: "2025-01-15T12:30:00Z",
    paymentMethod: "Credit Card"
  },
  {
    id: "INV-2024-002",
    bookingId: "WB-2024-001",
    description: "Catering Service - Partial Payment",
    amount: 2000,
    status: 'pending',
    date: "2025-01-20T15:45:00Z",
    dueDate: "2025-05-15T23:59:59Z"
  },
  {
    id: "INV-2024-003",
    bookingId: "WB-2024-001",
    description: "Photography & Videography Package",
    amount: 3500,
    status: 'pending',
    date: "2025-01-25T09:20:00Z",
    dueDate: "2025-06-01T23:59:59Z"
  },
  {
    id: "INV-2024-004",
    bookingId: "WB-2024-002",
    description: "Full Wedding Package - Beachside Resort",
    amount: 8500,
    status: 'paid',
    date: "2024-01-10T14:15:00Z",
    paymentMethod: "Bank Transfer"
  }
];

export default ClientPayments;