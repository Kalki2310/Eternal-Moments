import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String
  },
  transactionId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date
  }
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;