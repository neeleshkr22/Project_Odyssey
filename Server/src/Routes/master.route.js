import express from "express";
import { vehicleForm } from "../controllers/Master/vehicle.controllers.js";
import { TripForm } from "../controllers/Master/trip.controllers.js";
import { partyForm } from "../controllers/Master/party.controllers.js";
import { driverForm } from "../controllers/Master/driver.controllers.js";
import { vehicles } from "../controllers/Master/vehicle.controllers.js";


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


export default MasterRouter;