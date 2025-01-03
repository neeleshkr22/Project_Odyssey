import Party from "../../models/Party.model.js"
import Vehicle from "../../models/Vehicle.Model.js";
import Trip from "../../models/Trip.model.js";
import crypto from 'crypto';
const partyForm = async (req, res) => {
    try {
        
        const { name, contactNumber, email, address, idProof, rentalHistory, paymentDetails } = req.body;

        const id = crypto.randomBytes(3).toString('hex');
        const newParty = new Party({
            _id: id,
            name,
            contactNumber,
            email,
            address,
            idProof,
            rentalHistory,
            paymentDetails
        });

       
        await newParty.save();

        
        res.status(201).json({
            message: "Party created successfully",
            party: newParty
        });
    } catch (error) {
       
        res.status(400).json({
            message: "Error creating party",
            error: error.message
        });
    }
};

const parties = async (req, res) => {
    
    try {
        const partiesList = await Party.find();  // Query the parties collection

        // Check if any partiess were found
        if (!partiesList.length) {
            return res.status(404).json({ message: 'No parties found' });
        }
        res.json(partiesList);  // Respond with the list of partiess
    } catch (error) {
        console.error('Error fetching parties:', error);
        res.status(500).json({ message: 'Error fetching parties', error: error.message });
    }
}

export const partyInfo = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Fetch party data by ID
        const partyData = await Party.findById(id);
        
        // Fetch Trip data associated with the party and populate vehicle details
        const tripData = await Trip.find({ party: id }).populate('vehicle', 'modelNumber color companyName');
        
        // Send both party and trip data as a response
        res.json({ party: partyData, trips: tripData });
    } catch (err) {
        res.status(500).send({ message: "Error fetching data", error: err.message });
    }
};


export { partyForm, parties };
