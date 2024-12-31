import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import car from "../../assets/car.png";

const VehiclePage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/vehicles/${id}`
        );
        console.log("Vehicle:", response.data);
        setVehicle(response.data); // Save the single object
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar></Navbar>
      <Sidebar></Sidebar>

      <div>
        <h1>Vehicle Details</h1>
        {vehicle ? (
          <div>
            <div className=" flex justify-center gap-5 mt-20">
              <div className="bg-gray-50 shadow-md rounded-2xl w-3/6 p-5 text-base">
                {[
                  { label: "Vehicle Type :", value: vehicle.vehicleData.VehicleType },
                  { label: "Vehicle Number :", value: vehicle.vehicleData.licenceNumber },
                  { label: "Company Name :", value: vehicle.vehicleData.comapnyName },
                  { label: "Color :", value: vehicle.vehicleData.color },
                  { label: "Fuel Type :", value: vehicle.vehicleData.fuelType },
                  { label: "Transmission :", value: vehicle.vehicleData.transmission },
                  { label: "Status", value: vehicle.vehicleData.status },
                  {
                    label: "Last Serviced :",
                    value: new Date(vehicle.vehicleData.lastServiced).toLocaleDateString(),
                  },
                  {
                    label: "Registration Date :",
                    value: new Date(
                      vehicle.vehicleData.registrationDate
                    ).toLocaleDateString(),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-200 py-2"
                  >
                    <h3 className="font-medium text-gray-600">{item.label}</h3>
                    <p className="text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className=" bg-gray-50 shadow-md rounded-2xl w-2/6 ">
                <img src={car} alt="" className=" relative top-20" />
              </div>
            </div>

            <div className="2 flex justify-center gap-5 mt-6">
              <div className="bg-gray-50 shadow-md rounded-2xl w-2/6 p-8 text-base mt-5">
                <h2 className=" text-xl  font-semibold border-b-2 pb-2">
                  Owner Details
                </h2>
                <div className=" mt-3">
                  {[
                    { label: "Owner Name :", value: vehicle.vehicleData.ownerName },
                    { label: "Contact Number :", value: vehicle.vehicleData.ownerConntact },
                    { label: "Owner address :", value: vehicle.vehicleData.ownerAddress },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-gray-200 py-2"
                    >
                      <h3 className="font-medium text-gray-600">
                        {item.label}
                      </h3>
                      <p className="text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 shadow-md rounded-2xl w-2/6 p-8 text-base mt-5">
                    <h2 className=" text-xl  font-semibold border-b-2 pb-2">
                      Insurance Details
                    </h2>
                    <div className=" mt-3">
                      {[
                        {
                          label: "Insurance Provider :",
                          value: vehicle.vehicleData.insuranceDetails.provider || "Not Available",
                        },
                        {
                          label: "Policy Number :",
                          value: vehicle.vehicleData.insuranceDetails.policyNumber || "Not Available",
                        },
                        {
                          label: "Expiry Date :",
                          value: vehicle.vehicleData.insuranceDetails.expiryDate
                            ? new Date(vehicle.vehicleData.insuranceDetails.expiryDate).toLocaleDateString()
                            : "Not Available",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b border-gray-200 py-2"
                        >
                          <h3 className="font-medium text-gray-600">{item.label}</h3>
                          <p className="text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>
              </div>


              <div className="flex flex-col w-60 mt-10">
              <h2 className=" text-xl font-semibold border-b-2 pb-2">
                Add Data
              </h2>
              <Link
                to={`/maintenance/${id}`}
                className="bg-primary shadow-md rounded-full w-full p-5 h-16 text-base mt-5 flex justify-between items-center"
              >
                <h2 className="text-xl font-semibold">Maintenance</h2>
                <h2 className="text-xl font-semibold">+</h2>
              </Link>
              <Link
                to={`/fuel/${id}`}
                className="bg-primary shadow-md rounded-full w-full p-5 h-16 text-base mt-5 flex justify-between items-center"
              >
                <h2 className="text-xl font-semibold">Fuel</h2>
                <h2 className="text-xl font-semibold">+</h2>
              </Link>
              </div>


              
            </div>

            <div className=" flex justify-centre gap-5 ml-[7.5rem] mb-10 ">

                <div className="bg-gray-50 shadow-md rounded-2xl w-[36%] p-8 text-base mt-5">
                    <h2 className=" text-xl font-semibold border-b-2 pb-2">
                      Maintenance Details
                    </h2>
                    <div className="mt-3">
                      {vehicle?.MaintenenceData && vehicle.MaintenenceData.length > 0 ? (
                        vehicle.MaintenenceData.map((maintenance, index) => (
                          <div
                            key={index}
                            className="flex flex-col border-b border-gray-200 py-2"
                            >
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-600">Date:</h3>
                              <p className="text-gray-800">
                                {new Date(maintenance.date).toLocaleDateString() || "Not Available"}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-600">Cost:</h3>
                              <p className="text-gray-800">
                                {maintenance.cost || "Not Available"}
                              </p>
                            </div>
                            <div className="flex justify-between pb-4">
                              <h3 className="font-medium text-gray-600">Type:</h3>
                              <p className="text-gray-800">{maintenance.type || "Not Available"}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-800">No Maintenance Data Available</p>
                      )}
                    </div>
                  </div>
                    
                    
                <div className="bg-gray-50 shadow-md rounded-2xl w-[55%] p-8 text-base mt-5">
                    <h2 className=" text-xl font-semibold border-b-2 pb-2">
                      Fuel Details
                    </h2>
                    <div className="mt-3">
                      {vehicle?.FuelData && vehicle.FuelData.length > 0 ? (
                        vehicle.FuelData.map((fuel, index) => (
                          <div
                            key={index}
                            className="flex flex-col border-b border-gray-200 py-2"
                            >
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-600">Date:</h3>
                              <p className="text-gray-800">
                                {new Date(fuel.date).toLocaleDateString() || "Not Available"}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <h3 className="font-medium text-gray-600">Cost:</h3>
                              <p className="text-gray-800">
                                {fuel.cost || "Not Available"}
                              </p>
                            </div>
                            <div className="flex justify-between pb-4">
                              <h3 className="font-medium text-gray-600">Amount:</h3>
                              <p className="text-gray-800">{fuel.amount || "Not Available"}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-800">No Fuel Data Available</p>
                      )}
                    </div>
                  </div>
                    
                  </div>
          </div>
        ) : (
          <p>Loading vehicle details...</p>
        )}
      </div>




    </div>
  );
};

export default VehiclePage;
