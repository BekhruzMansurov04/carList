import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CarList = () => {
  const [cars, setCars] = useState([]);

  const getVisibleCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cars");
      const visibleCars = res.data.filter((car) => !car.isDeleted);
      setCars(visibleCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    getVisibleCars();
  }, []);

  const deleteCar = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/cars/${id}`, { isDeleted: true });
      getVisibleCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
 console.log(cars);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🚗 Car Listings</h1>
        <Link to="/AddCar">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            ➕ Add New Car
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-white"
          >
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-700">
                {car.brand} {car.model} ({car.year})
              </h2>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Location:</span> {car.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Color:</span> {car.color}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Mileage:</span> {car.mileage.toLocaleString()} km
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Fuel:</span> {car.fuelType}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Engine:</span> {car.engine}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Availability:</span>{" "}
                {car.isAvailable ? (
                  <span className="text-green-600 font-semibold">Available</span>
                ) : (
                  <span className="text-red-500 font-semibold">Sold</span>
                )}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Posted on:</span>{" "}
                {new Date(car.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-800">{car.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${car.price.toLocaleString()}
                </span>
                <div className="space-x-2">
                  <Link to={`/EditCar/${car.id}`}>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                      ✏️ Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No cars found.</p>
      )}
    </div>
  );
};

export default CarList;
