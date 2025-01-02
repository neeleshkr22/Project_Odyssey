import HireCar from "../../models/Hirecar.model.js";
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
  
      const newCar = new HireCar({
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
  