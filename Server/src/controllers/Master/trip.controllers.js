
import Trip from '../../models/Trip.model.js';

const TripForm = async (req, res) => {
    try {
        
        const {
            vehicle,
            driver,
            party,
            tripStartLocation,
            tripEndLocation,
            startDate,
            endDate,
            distance,
            fareDetails,
            tripStatus,
            notes
        } = req.body;

       
        
        const newTrip = new Trip({
            vehicle,
            driver,
            party,
            tripStartLocation,
            tripEndLocation,
            startDate,
            endDate,
            distance,
            fareDetails,
            tripStatus,
            notes
        });

        
        const savedTrip = await newTrip.save();

        res.status(201).json({
            message: 'Trip created successfully',
            trip: savedTrip
        });
    } catch (error) {
    
        
        console.error(error);
        res.status(500).json({
            message: 'Error creating trip',
            error: error.message
        });
    }
};

export { TripForm };
