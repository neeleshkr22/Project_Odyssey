
import Vehicle from '../../models/Vehicle.Model.js';

const vehicleForm = async (req, res) => {
    
    const {
        VehicleType, comapnyName, modelNumber, registrationDate, licenceregistry,
        licenceNumber, color, fuelType, transmission, lastServiced, insuranceDetails,
        status, fuelQuantity, ownerName, ownerConntact, ownerAddress
    } = req.body;

    try {
        // Validate input
        if (!VehicleType || !comapnyName || !modelNumber || !licenceNumber ||
            !color || !fuelType || !transmission || !lastServiced ||
            !ownerName || !ownerConntact || !ownerAddress) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        // Create a new vehicle instance
        const newVehicle = new Vehicle({
            VehicleType,
            comapnyName,
            modelNumber,
            registrationDate,
            licenceregistry,
            licenceNumber,
            color,
            fuelType,
            transmission,
            lastServiced,
            insuranceDetails,
            status,
            fuelQuantity,
            ownerName,
            ownerConntact,
            ownerAddress
        });

        // Save vehicle data to the database
        await newVehicle.save();

        // Respond back with success message
        res.status(201).json({
            message: 'Vehicle details successfully added!',
            vehicle: newVehicle
        });
    } catch (error) {
        console.error('Error saving vehicle details:', error);
        res.status(500).json({
            message: 'There was an error saving the vehicle details',
            error: error.message
        });
    }
    
}

const vehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();  // Query the Vehicle collection
        res.json(vehicles);  // Respond with the list of vehicles
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
} 

export { vehicleForm , vehicles };