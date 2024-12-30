import mongoose from "mongoose";


const vehicleSchema = new mongoose.Schema({

    VehicleType: {
        type: String,
        enum: ["Car", "Truck", "Bike"],
        required: true,
    },

    comapnyName: {
        type: String,
        required: true,
    },

    modelNumber: {
        type: Number,
        required: true,
    },

    registrationDate: {
        type: Date,
    },

    licenceregistry: {
        type: Boolean,
        required: true,
    },

    licenceNumber: {
        type: Number,
        required: true,
    },

    color: {
        type: String,
        required: true,
    },

    fuelType: {
        type: String,
        enum: ["petrol", "diesel"],  // Fixed typo ('desiel' -> 'diesel')
        required: true,
    },

    transmission: {
        type: String,
        enum: ["semi-automatic", "automatic", "manual"],
        required: true,
    },

    lastServiced: {
        type: Date,
        required: true,
    },

    insuranceDetails: {
        provider: { type: String, required: false },
        policyNumber: { type: String, required: false },
        expiryDate: { type: Date, required: false },
    },

    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Sold', 'Under Maintenance'],
        default: 'Active',
    },

    fuel: {
        type: Number,
        required: false,
    },
    ownerName: {
        type: String,
        required: true,
    },

    ownerConntact: {
        type: Number,
        required: true,
    },

    ownerAddress: {
        type: String,
        required: true,
    },

});

// Exporting using ES Module syntax
export default mongoose.model('Vehicle', vehicleSchema);
