import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditCourse() {
    const { id } = useParams(); // get course ID from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        instructor: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch course details
    useEffect(() => {
        console.log("Fetching course details for ID:", id);
        const fetchCourse = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/admin/courses/${id}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    setFormData({
                        title: res.data.course.title,
                        description: res.data.course.description,
                        price: res.data.course.price,
                        instructor: res.data.course.instructor,
                    });
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch course details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.instructor || !formData.description) {
            alert("All fields are required.");
            return;
        }
        setError("");
        try {
            const res = await axios.patch(
                `http://localhost:5000/api/admin/courses/editCourseInfo/${id}`,
                formData,
                { withCredentials: true }
            );
            if (res.data.success) {
                alert("Course updated successfully!");
                navigate("/admin");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to update course.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#222831] flex items-center justify-center text-[#EEEEEE]">
                Loading course details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#222831] flex justify-center items-center p-8">
            <div className="bg-[#31363F] p-8 rounded-xl shadow-lg w-full max-w-lg text-[#EEEEEE]">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>
                {/* {error && <p className="text-red-500 mb-3">{error}</p>} */}

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
                        className="w-full bg-[#76ABAE] text-white py-2 rounded hover:bg-[#5e8f91] transition"
                    >
                        Update Course
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCourse;
