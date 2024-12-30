import Driver from '../../models/Driver.model.js';
import Trip from '../../models/Trip.model.js';

export const driverForm = async (req, res) => {
  try {
    // Destructure the fields sent from the frontend
    const { 
      name, 
      contact,  // contact should match the frontend field name
      email, 
      address, 
      licenseNumber, 
      licenseExpiryDate, 
      drivingExperience, 
      certifications, 
      status 
    } = req.body;

    // Validate that required fields are not empty
    if (!contact) {
      return res.status(400).json({ message: 'Contact number is required.' });
    }

    // Create a new driver object with the received data
    const driver = new Driver({
      name,
      contact,  // Assign the correct contact value here
      email,
      address,
      licenseNumber,
      licenseExpiryDate,
      drivingExperience,
      certifications,
      status
    });

    // Save the driver details to the database
    await driver.save();

    return res.status(201).json({ message: 'Driver details successfully added!', driver });
  } catch (error) {
    console.error('Error saving driver details:', error);
    return res.status(500).json({ message: 'Error saving driver details', error });
  }
};


const drivers = async (req, res) => {
    
    try {
        const DriverList = await Driver.find();  // Query the Vehicle collection

        // Check if any vehicles were found
        if (!DriverList.length) {
            return res.status(404).json({ message: 'No driver found' });
        }
        res.json(DriverList);  // Respond with the list of vehicles
    } catch (error) {
        console.error('Error fetching Drivers:', error);
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
}

export const driverInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the driver data
    const DriverData = await Driver.findById(id);

    // If driver not found, send a 404 response
    if (!DriverData) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Fetch the trips for the driver and populate vehicle details
    const TripData = await Trip.find({ driver: id }).populate('vehicle', 'modelNumber color comapnyName');

    // Return driver data and trips, even if no trips exist
    res.json({ DriverData, TripData });
  } catch (error) {
    console.error("Error fetching driver or trip data:", error);
    res.status(500).json({ message: 'Server error' });
  }
};





export default drivers;