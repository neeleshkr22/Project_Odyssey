import Fuel from '../../models/Fuel.model.js';

export const fuelRep = async (req, res) => {
    const { vehicle } = req.query; 
    try {
        const fuelData = await Fuel.find({ vehicle }).populate('vehicle');
        if (!fuelData) {
            return res.status(404).send({ message: 'Vehicle not found' });
        }
        res.send(fuelData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}