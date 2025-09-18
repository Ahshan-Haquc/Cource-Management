// src/App.jsx
import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppLayout from "./layout/AppLayout";
import Courses from "./pages/Courses"; // Home means see all courses page
import CourseDetails from "./pages/CourseDetails";
import PurchasedCourses from "./pages/PurchasedCourses";
import AdminHome from "./pages/AdminHome";
import AdminSignup from "./pages/AdminSignup"
import AddCourse from "./pages/AddCourse";
import EditCourse from "./components/EditCourse";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import WishListPage from "./pages/WishListPage";
import NotificationPage from "./pages/NotificationPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminSignup" element={<AdminSignup />} />

          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishListPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />

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
