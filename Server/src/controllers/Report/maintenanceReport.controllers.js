import Maintenance from '../../models/Maintainence.model.js';

export const maintainRep = async (req, res) => {
    const { vehicle } = req.query; 
    try {
        const fuelData = await Maintenance.find({ vehicle }).populate('vehicle');
        if (!fuelData) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }
        res.send(fuelData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}