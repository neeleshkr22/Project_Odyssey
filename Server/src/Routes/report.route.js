import express from 'express';
import Fuel from '../models/Fuel.model.js';
import { fuelRep } from '../controllers/Report/fuelReport.controllers.js';

const ReportRouter = express.Router();

ReportRouter.get('/fuelReport', async (req, res) => {
    fuelRep(req, res);
});



export default ReportRouter;