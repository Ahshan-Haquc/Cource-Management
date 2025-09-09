// src/App.jsx
import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import PurchasedCourses from "./pages/PurchasedCourses";
import AdminHome from "./pages/AdminHome";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/purchased" element={<PurchasedCourses />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/edit-course/:id" element={<EditCourse />} />
          <Route path="*" element={<div className="text-center text-white">404 Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
