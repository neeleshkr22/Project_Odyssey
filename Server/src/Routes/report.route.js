import express from 'express';
import { fuelRep } from '../controllers/Report/fuelReport.controllers.js';
import { maintainRep } from '../controllers/Report/maintenanceReport.controllers.js';

const ReportRouter = express.Router();

ReportRouter.get('/fuelReport', async (req, res) => {
    fuelRep(req, res);
});

ReportRouter.get('/maintainReport', async (req, res) => {
    maintainRep(req, res);
});



export default ReportRouter;