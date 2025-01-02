import mongoose from 'mongoose';
const FuelSchema = new mongoose.Schema({
    _id: { type: String },
    vehicle: {
        type: String,
        ref: 'Vehicle',
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model

export default mongoose.model('Fuel', FuelSchema);

