
import Trip from '../../models/Trip.model.js';
import Driver from '../../models/Driver.model.js';

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

        const driverRecord = await Driver.findById(driver);
        if (driverRecord) {
        driverRecord.assignedVehicles.push(vehicle); // Add vehicle to driver's assigned vehicles
            await driverRecord.save();
            }

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

const getTrips = async(req,res)=>{
    try{
        const trips = await Trip.find();
        res.status(200).json(trips);
    }catch(error){
        console.error("error to fetch data");
        res.status(500).json({
            msg:"error in internal backend"
        })
    }
};



export { TripForm, getTrips };
