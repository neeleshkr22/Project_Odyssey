import Party from "../../models/Party.model.js"

const partyForm = async (req, res) => {
    try {
        
        const { name, contactNumber, email, address, idProof, rentalHistory, paymentDetails } = req.body;

        
        const newParty = new Party({
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


export { partyForm, parties };
