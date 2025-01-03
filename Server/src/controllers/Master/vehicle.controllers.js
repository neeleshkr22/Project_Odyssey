import Vehicle from '../../models/Vehicle.Model.js';
import Maintenance from '../../models/Maintainence.model.js';
import Fuel from '../../models/Fuel.model.js';
// Function to handle vehicle form submission
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

// Function to fetch all vehicles
const vehicles = async (req, res) => {
    
    try {
        const vehicleList = await Vehicle.find();  // Query the Vehicle collection

        // Check if any vehicles were found
        if (!vehicleList.length) {
            return res.status(404).json({ message: 'No vehicles found' });
        }
        res.json(vehicleList);  // Respond with the list of vehicles
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
}

const vehiclesInfo = async (req, res) => {
    const { id } = req.params;
    const vehicleData = await Vehicle.findById(id);
    const MaintenenceData = await Maintenance.find({ vehicle: id });
    const FuelData = await Fuel.find({ vehicle: id });
    res.json({ vehicleData, MaintenenceData , FuelData });
}


export { vehicleForm, vehicles , vehiclesInfo };
