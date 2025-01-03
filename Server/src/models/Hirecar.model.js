import mongoose from 'mongoose';

const hireCarSchema = new mongoose.Schema({
  _id:{
    type: String,
  },
  carname: { type: String, required: true },
  companyname: { type: String, required: true },
  purchasedDate: { type: Date, required: true },
  bookingDate: { type: Date, required: true },
  fuelType: { type: String, required: true },
  cartype: { type: String, required: true },
  modelNumber: { type: String, required: true },
  purchasedPrice: { type: Number, required: true },  // This is required
  insuranceDetails: {
    provider: { type: String, required: true },  // This is required
    expiryDate: { type: Date, required: true },  // This is required
    policyNumber: { type: String, required: true },  // This is required
  },
  color: { type: String, required: true },
});

const HireCar = mongoose.model('HireCar', hireCarSchema);

export default HireCar;
