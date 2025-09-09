// src/pages/AddCourse.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCourse() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        instructor: ""
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(
                "http://localhost:5000/api/admin/courses/addNewCourse",
                formData,
                { withCredentials: true }
            );
            if (res.data.success) {
                alert("Course added successfully!");
                navigate("/admin");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to add course.");
        }
    };

    return (
        <div className="min-h-screen bg-[#222831] flex justify-center items-center p-8">
            <div className="bg-[#31363F] p-8 rounded-xl shadow-lg w-full max-w-lg text-[#EEEEEE]">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Course</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE] border border-gray-600"
                    />
                    <textarea
                        name="description"
                        placeholder="Course Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE] border border-gray-600"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Course Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE] border border-gray-600"
                    />
                    <input
                        type="text"
                        name="instructor"
                        placeholder="Instructor Name"
                        value={formData.instructor}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-[#222831] text-[#EEEEEE] border border-gray-600"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#76ABAE] text-[#222831] py-2 rounded hover:bg-[#5e8f91] transition"
                    >
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;
