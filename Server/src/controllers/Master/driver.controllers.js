import Driver from '../../models/Driver.model.js';

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
