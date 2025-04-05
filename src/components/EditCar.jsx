import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cars/${id}`);
        setCar(res.data);
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: type === "checkbox" ? checked : value,
    }));
    fetchCar();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/cars/${id}`, car);
      navigate("/");
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  if (!car) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">✏️ Edit Car</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="brand" value={car.brand} onChange={handleChange} placeholder={car.brand ? `Current: ${car.brand}` : "Enter Brand"} className="input" required />
          <input type="text" name="model" value={car.model} onChange={handleChange} placeholder={car.model ? `Current: ${car.model}` : "Enter Model"} className="input" required />
          <input type="number" name="year" value={car.year} onChange={handleChange} placeholder={car.year ? `Current: ${car.year}` : "Enter Year"} className="input" required />
          <input type="text" name="color" value={car.color} onChange={handleChange} placeholder={car.color ? `Current: ${car.color}` : "Enter Color"} className="input" required />
          <input type="number" name="mileage" value={car.mileage} onChange={handleChange} placeholder={car.mileage ? `Current: ${car.mileage} (km)` : "Enter Mileage"} className="input" required />
          <input type="text" name="fuelType" value={car.fuelType} onChange={handleChange} placeholder={car.fuelType ? `Current: ${car.fuelType}` : "Enter FuelType"} className="input" required />
          <input type="text" name="engine" value={car.engine} onChange={handleChange} placeholder={car.engine ? `Current: ${car.engine}` : "Enter Engine"} className="input" required />
          <input type="number" name="price" value={car.price} onChange={handleChange} placeholder={car.price ? `Current: ${car.price}` : "Enter Price"} className="input" required />
        </div>
        <input type="text" name="image" value={car.image} onChange={handleChange} placeholder={car.image ? `Current: ${car.image}` : "Enter Image Url"} className="input w-full" />
        <input type="text" name="location" value={car.location} onChange={handleChange} placeholder={car.location ? `Current: ${car.location}` : "Enter Location"} className="input w-full" />
        <textarea name="description" value={car.description} onChange={handleChange} placeholder={car.description ? `Current: ${car.description}` : "Enter Description"} rows={3} className="w-full p-2 border border-gray-300 rounded-md" />
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" name="isAvailable" checked={car.isAvailable} onChange={handleChange} className="w-4 h-4" />
          Available
        </label>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default EditCar;
