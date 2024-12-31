
import Maintenance from '../../models/Maintainence.model.js';
export const maintainForm = async (req, res) => {
    try {
        const vehicle = req.params.id;
        const { date, cost, type } = req.body;
        const newMaintenance = new Maintenance({
            vehicle,
            date,
            cost,
            type
        });

        await newMaintenance.save();
        res.status(201).json({
            message: 'Maintenance details successfully added!',
            maintenance: newMaintenance
        });
    } catch (error) {
        console.error('Error saving maintenance details:', error);
        res.status(500).json({
            message: 'There was an error saving the maintenance details',
            error: error.message
        });
    }   
}