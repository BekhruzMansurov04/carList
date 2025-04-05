
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import EditCar from "./components/EditCar";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="AddCar" element={<AddCar />} />
          <Route path="EditCar/:id" element={<EditCar />} />
        </Routes>
    </Router>
  );
};

export default App;

