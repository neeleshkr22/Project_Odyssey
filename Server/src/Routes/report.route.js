import express from 'express';
import { fuelRep } from '../controllers/Report/fuelReport.controllers.js';
import { maintainRep } from '../controllers/Report/maintenanceReport.controllers.js';
import { getDutySlips , createDutySlip } from '../controllers/Report/dutyslip.controllers.js';
import {addCar, getCar } from '../controllers/Report/hireCar.contoller.js'
import { Invoice } from '../controllers/Report/invoice.controllers.js';

const ReportRouter = express.Router();

ReportRouter.get('/fuelReport', async (req, res) => {
    fuelRep(req, res);
});

ReportRouter.get('/maintainReport', async (req, res) => {
    maintainRep(req, res);
});

ReportRouter.post('/createDuty/:id', async(req,res)=>{
    createDutySlip(req,res);
});

ReportRouter.get('/getdutyslips/:id', async(req,res)=>{
    getDutySlips(req,res);
})

ReportRouter.post("/addCar",async(req,res)=>{
    addCar(req,res);
})

ReportRouter.get('/getCars',async(req,res)=>{
    getCar(req,res);
})

ReportRouter.get('/invoice/:partyId',async(req,res)=>{
    Invoice(req,res);
})



export default ReportRouter;