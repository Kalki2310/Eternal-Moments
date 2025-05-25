import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Venue', 'Catering', 'Decoration', 'Photography', 'Entertainment', 'Full Service']
  },
  price: {
    type: Number,
    required: true
  },
  priceType: {
    type: String,
    enum: ['fixed', 'starting'],
    default: 'fixed'
  },
  tier: {
    type: String,
    enum: ['budget', 'standard', 'premium', 'luxury'],
    default: 'standard'
  },
  features: {
    type: [String],
    default: []
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Package = mongoose.model('Package', PackageSchema);

export default Package;