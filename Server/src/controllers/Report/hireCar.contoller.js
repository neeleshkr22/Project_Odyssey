import HireCar from "../../models/Hirecar.model.js";
import crypto from "crypto";
export const addCar = async (req, res) => {
    try {
      const {
        carname,
        companyname,
        purchasedDate,
        bookingDate,
        fuelType,
        cartype,
        modelNumber,
        purchasedPrice,
        insuranceDetails,
        color
      } = req.body;
      const id = crypto.randomBytes(3).toString('hex');
  
      const newCar = new HireCar({
        _id: id,
        carname,
        companyname,
        purchasedDate,
        bookingDate,
        fuelType,
        cartype,
        modelNumber,
        purchasedPrice,
        insuranceDetails,
        color
      });
  
      const savedCar = await newCar.save();
      res.status(200).json({
        msg: true,
        data: savedCar,
      });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({
        msg: false,
        error: "An error occurred while adding the car",
      });
    }
  };
  

  export const getCar = async (req, res) => {
    try {
      const cars = await HireCar.find();
      res.status(200).json({
        msg: true,
        data: cars,
      });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({
        msg: false,
        error: "An error occurred while fetching the cars",
      });
    }
  };