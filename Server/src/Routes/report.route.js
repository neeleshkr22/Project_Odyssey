import express from 'express';
import { fuelRep } from '../controllers/Report/fuelReport.controllers.js';
import { maintainRep } from '../controllers/Report/maintenanceReport.controllers.js';
import { getDutySlips , createDutySlip } from '../controllers/Report/dutyslip.controllers.js';

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



export default ReportRouter;