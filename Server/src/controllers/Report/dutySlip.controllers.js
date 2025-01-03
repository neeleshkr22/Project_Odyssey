import DutySlip from "../../models/DutySlip.model.js";
import crypto from "crypto";

export const createDutySlip = async (req, res) => {
    try {
        const { id: vehicle } = req.params; 
        const { driver, startTime, endTime, startLocation, endLocation, description } = req.body; 
        const id = crypto.randomBytes(3).toString('hex');
        const newDutySlip = new DutySlip({
            _id: id,
            vehicle,
            driver,
            startTime,
            endTime,
            startLocation,
            endLocation,
            description,
        });

        await newDutySlip.save();

        res.status(200).json(newDutySlip);
    } catch (error) {
        console.error("Error creating duty slip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getDutySlips = async (req, res) => {
    try {
        const { id } = req.params; // Now using path parameter like /getdutyslips/:id

        const dutySlip = await DutySlip.find({ vehicle: id }).populate("vehicle");


        if (!dutySlip) {
            return res.status(404).json({ message: "Duty slip not found" });
        }

        res.status(200).json(dutySlip);
    } catch (error) {
        console.error("Error fetching duty slip:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


