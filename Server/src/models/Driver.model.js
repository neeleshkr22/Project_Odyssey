import mongoose from "mongoose"


const DriverSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true, // Full name of the driver
      },
      contact: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
      },
      address: {
        type: String,
        required: true, // Address of the driver
      },
      licenseNumber: {
        type: String,
        unique: true,
        required: true, // Driver's license number
      },
      licenseExpiryDate: {
        type: Date,
        required: true, // Expiry date of the driver's license
      },
      assignedVehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle', // References the Vehicle schema
      }],
      drivingExperience: {
        type: Number,
        required: false, // Driving experience in years
      },
      certifications: {
        type: [String],
        required: false, // Any additional certifications (e.g., Defensive Driving, Hazmat)
      },
      status: {
        type: String,
        enum: ['Available', 'On Duty', 'Inactive', 'Suspended'],
        default: 'Available',
      },
    }, {
      timestamps: true, // Automatically includes createdAt and updatedAt
    
});



export default mongoose.model('Driver', DriverSchema);
