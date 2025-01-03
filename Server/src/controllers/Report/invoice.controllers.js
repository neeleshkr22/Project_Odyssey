import mongoose from "mongoose";
import Trip from "../../models/Trip.model.js";

export const Invoice = async (req, res) => {
    try {
        const { partyId } = req.params; // Use partyId instead of id if needed
        if (!partyId) {
            return res.status(400).json({ message: "Party ID is required" });
        }

        const data = await Trip.find({ party: partyId }).populate("party").populate("vehicle").populate("driver");
        if (!data) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

