import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    mileage: "",
    fuelType: "",
    engine: "",
    price: "",
    image: "",
    isAvailable: true,
    location: "",
    description: "",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/cars", car).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">➕ Add New Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={car.brand}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={car.model}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={car.year}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={car.color}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage (km)"
            value={car.mileage}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="fuelType"
            placeholder="Fuel Type"
            value={car.fuelType}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="engine"
            placeholder="Engine"
            value={car.engine}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={car.price}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={car.image}
          onChange={handleChange}
          required
          className="input w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={car.location}
          onChange={handleChange}
          required
          className="input w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={car.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            name="isAvailable"
            checked={car.isAvailable}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Available
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCar;
