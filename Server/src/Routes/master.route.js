import express from "express";
import { vehicleForm } from "../controllers/Master/vehicle.controllers.js";
import { TripForm, getTrips } from "../controllers/Master/trip.controllers.js";
import { parties, partyForm, partyInfo } from "../controllers/Master/party.controllers.js";
import drivers, { driverForm } from "../controllers/Master/driver.controllers.js";
import { vehicles } from "../controllers/Master/vehicle.controllers.js";
import { vehiclesInfo } from "../controllers/Master/vehicle.controllers.js";
import { driverInfo } from "../controllers/Master/driver.controllers.js";
import Vehicle from "../models/Vehicle.Model.js";
import { maintainForm } from "../controllers/Master/maintainence.controllers.js";
import { fuelForm } from "../controllers/Master/Fuel.controllers.js";

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

MasterRouter.get('/party/:id', async (req, res) => {
    partyInfo(req, res);
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
MasterRouter.post('/maintenance/:id',async(req,res)=>{
    maintainForm(req,res);
})
MasterRouter.post('/fuel/:id',async(req,res)=>{
    fuelForm(req,res);
})




export default MasterRouter;