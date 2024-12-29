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

export { partyForm };
