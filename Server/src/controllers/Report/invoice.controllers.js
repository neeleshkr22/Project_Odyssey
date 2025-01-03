import mongoose from "mongoose";
import Trip from "../../models/Trip.model.js";
import Party from "../../models/Party.model.js";  // Assuming you have a Party model

export const Invoice = async (req, res) => {
    try {
        const { partyName } = req.query; // Use partyName from query parameters
        if (!partyName) {
            return res.status(400).json({ message: "Party name is required" });
        }

        // Find the party by name
        const party = await Party.findOne({ name: { $regex: partyName, $options: 'i' } });  // Case-insensitive search
        if (!party) {
            return res.status(404).json({ message: "Party not found" });
        }

        // Find trips associated with the found party
        const data = await Trip.find({ party: party._id }).populate("party").populate("vehicle").populate("driver");
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No trips found for this party" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
