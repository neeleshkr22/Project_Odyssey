
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

const fetchTrip = async(req,res)=>{
    try {
        const trip = await Trip.findById(req.params.id).populate('driver');
        if(!trip){
            res.status(404).json({
                msg:"Can't found",
            })
        }
        res.send(trip);
    } catch (error) {
        console.error("Server error occured", error);
    }
}

export const tripPaymentStatus = async (req, res) => {
        try {
          const { paymentStatus , tripStatus } = req.body; 
          const tripId = req.params.id;
      
          const updatedTrip = await Trip.findByIdAndUpdate(
            tripId,
            { 'fareDetails.paymentStatus': paymentStatus , 'tripStatus' : tripStatus },
            { new: true } 
          );
      
          if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
          }
      
          res.status(200).json(updatedTrip);
        } catch (error) {
          console.error('Error updating payment status:', error);
          res.status(500).json({ message: 'Failed to update payment status' });
        }
}

export { TripForm, getTrips, fetchTrip };
