import mongoose from 'mongoose';
const maintenanceSchema = new mongoose.Schema({
    _id:{
        type: String,
    },
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
    type: {
        type: String,
        required: true,
        enum: ['Repair', 'Service', 'Inspection', 'Other'] 
    },
    
    

}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the model

export default mongoose.model('Maintenance', maintenanceSchema);

