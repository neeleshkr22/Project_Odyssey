import express from "express";
import { vehicleForm } from "../controllers/Master/vehicle.controllers.js";
import { TripForm, getTrips } from "../controllers/Master/trip.controllers.js";
import { parties, partyForm } from "../controllers/Master/party.controllers.js";
import drivers, { driverForm } from "../controllers/Master/driver.controllers.js";
import { vehicles } from "../controllers/Master/vehicle.controllers.js";
import { vehiclesInfo } from "../controllers/Master/vehicle.controllers.js";
import { driverInfo } from "../controllers/Master/driver.controllers.js";

const MasterRouter = express.Router();

MasterRouter.post("/vehicleForm", (req, res) => {
    vehicleForm(req, res);
})

MasterRouter.post("/tripForm", (req, res) => {
    TripForm(req, res);
})

MasterRouter.post("/partyForm", (req, res) => {
    partyForm(req, res);
})

MasterRouter.post("/driverForm", (req, res) => {
    driverForm(req, res);
})

MasterRouter.get('/vehicles', async (req, res) => {
    vehicles(req, res);
});

MasterRouter.get('/vehicles/:id', async (req, res) => {
    vehiclesInfo(req, res);
});
MasterRouter.get('/driver/:id', async (req, res) => {
    driverInfo(req, res);
});

MasterRouter.get('/drivers', async (req, res) => {
    drivers(req, res);
});

MasterRouter.get('/parties', async (req, res) => {
    parties(req, res);
});

MasterRouter.get('/trips',async(req,res)=>{
    getTrips(req,res);
})

// MasterRouter.get('/driver/:id', async (req, res) => {
//     try {
//         const driver = await Driver.findById(req.params.id).populate('assignedVehicles');
//         if (!driver) {
//             return res.status(404).send('Driver not found');
//         }
//         res.json(driver);
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });




export default MasterRouter;