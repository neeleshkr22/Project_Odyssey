import mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validates a 10-digit contact number
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  address: {
    type: String,
    required: false, 
  },
  idProof: {
    type: String,
    required: false, 
  },
  rentalHistory: [{
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle', 
      required: true,
    },
    startDate: {
      type: Date,
      required: true, 
    },
    endDate: {
      type: Date,
      required: true, 
    },
   
    status: {
      type: String,
      enum: ['Ongoing', 'Completed', 'Cancelled'],
      required: true,
    },
  }],
  paymentDetails: {
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Other'],
      required: false,
    },
    paymentHistory: [{
      date: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      method: {
        type: String,
        enum: ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Other'],
        required: true,
      },
      transactionId: {
        type: String,
        required: false,
      },
    }],
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Banned'],
    default: 'Active',
  },
}, {
  timestamps: true, 
});

export default mongoose.model('Party', partySchema);
