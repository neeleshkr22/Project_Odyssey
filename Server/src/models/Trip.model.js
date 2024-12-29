import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle', 
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party', 
    required: true,
  },
  tripStartLocation: {
    type: String,
    required: true, 
  },
  tripEndLocation: {
    type: String,
    required: true, 
  },
  startDate: {
    type: Date,
    required: true, 
  },
  endDate: {
    type: Date,
    required: false, 
  },
  distance: {
    type: Number,
    required: false,
  },
  fareDetails: {
    baseFare: {
      type: Number,
      required: true, 
    },
    additionalCharges: {
      type: Number,
      required: false, 
    },
    totalFare: {
      type: Number,
      required: true, 
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      required: true,
      default: 'Pending',
    },
  },
  tripStatus: {
    type: String,
    enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
    required: true,
    default: 'Scheduled',
  },
  notes: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, 
});

export default mongoose.model('Trip', tripSchema);
