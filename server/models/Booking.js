import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  packageIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  eventDate: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  guestCount: {
    type: Number,
    required: true
  },
  specialRequests: {
    type: String
  },
  services: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;