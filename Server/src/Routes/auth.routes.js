import express from "express";
import {login , logout , signup} from "../controllers/auth.controllers.js";
import cors from "cors";


const Router = express.Router();
Router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));  

Router.post("/signup", (req, res) => {
    signup(req, res);
})

Router.post("/login", (req, res) => {
    login(req, res);
})

Router.post("/logout", (req, res) => {
    logout(req, res);
})

export default Router;