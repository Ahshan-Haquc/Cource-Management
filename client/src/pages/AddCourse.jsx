import React, { useState } from "react";
import axios from "axios";
import { Plus, Trash2, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function AddCourse() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const initialState = {
        title: "",
        description: "",
        category: "Web Development",
        price: "",
        thumbnail: "",
        targetAudience: "",
        instructor: { name: "", photo: "", bio: "" },
        lessons: [{ title: "", duration: "", videoUrl: "" }],
        objectives: [""],
        prerequisites: [""],
        faqs: [{ question: "", answer: "" }],
    };

    const [form, setForm] = useState(initialState);

    // Generic simple input handler for top-level fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    // Instructor nested fields
    const handleInstructorChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, instructor: { ...s.instructor, [name]: value } }));
    };

    // Lessons handlers
    const addLesson = () => {
        setForm((s) => ({ ...s, lessons: [...s.lessons, { title: "", duration: "", videoUrl: "" }] }));
    };
    const removeLesson = (index) => {
        setForm((s) => ({ ...s, lessons: s.lessons.filter((_, i) => i !== index) }));
    };
    const handleLessonChange = (index, key, value) => {
        setForm((s) => {
            const lessons = [...s.lessons];
            lessons[index] = { ...lessons[index], [key]: value };
            return { ...s, lessons };
        });
    };

    // Array helpers (objectives, prerequisites)
    const addArrayField = (field) => {
        setForm((s) => ({ ...s, [field]: [...s[field], ""] }));
    };
    const removeArrayField = (field, index) => {
        setForm((s) => ({ ...s, [field]: s[field].filter((_, i) => i !== index) }));
    };
    const handleArrayChange = (field, index, value) => {
        setForm((s) => {
            const arr = [...s[field]];
            arr[index] = value;
            return { ...s, [field]: arr };
        });
    };

    // FAQs handlers
    const addFaq = () => setForm((s) => ({ ...s, faqs: [...s.faqs, { question: "", answer: "" }] }));
    const removeFaq = (index) => setForm((s) => ({ ...s, faqs: s.faqs.filter((_, i) => i !== index) }));
    const handleFaqChange = (index, key, value) => {
        setForm((s) => {
            const faqs = [...s.faqs];
            faqs[index] = { ...faqs[index], [key]: value };
            return { ...s, faqs };
        });
    };

    // Basic validation before submit
    const validate = () => {
        if (!form.title.trim()) return "Course title is required.";
        if (!form.description.trim()) return "Course description is required.";
        if (!form.category.trim()) return "Category is required.";
        if (!form.price || isNaN(Number(form.price))) return "Valid numeric price is required.";
        if (!form.instructor.name.trim()) return "Instructor name is required.";
        // lessons validation
        for (let i = 0; i < form.lessons.length; i++) {
            const l = form.lessons[i];
            if (!l.title.trim()) return `Lesson ${i + 1}: title is required.`;
            if (!l.duration || isNaN(Number(l.duration))) return `Lesson ${i + 1}: duration in minutes is required.`;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        const v = validate();
        if (v) {
            setError(v);
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // Prepare payload: convert numeric strings to numbers
        const payload = {
            ...form,
            price: Number(form.price),
            lessons: form.lessons.map((l) => ({
                title: l.title,
                duration: Number(l.duration || 0),
                videoUrl: l.videoUrl || "",
            })),
            objectives: form.objectives.filter(Boolean),
            prerequisites: form.prerequisites.filter(Boolean),
            faqs: form.faqs.filter((f) => f.question || f.answer),
        };

        try {
            setSubmitting(true);
            const res = await axios.post(
                "https://cource-management-backend.vercel.app/api/admin/courses/addNewCourse",
                payload,
                { withCredentials: true } // send cookies
            );

            setMessage(res.data?.message || "Course added successfully.");
            setForm(initialState); // reset
            setTimeout(() => navigate("/admin"), 1200); // go back to admin list
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Server error while adding course.";
            setError(msg);
        } finally {
            setSubmitting(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#222831] text-[#EEEEEE] p-6 sm:p-10">
            <div className="max-w-5xl mx-auto bg-[#31363F] rounded-2xl shadow-xl p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#76ABAE] mb-4">Add New Course</h1>

                {message && <div className="bg-green-700 text-[#EEEEEE] p-3 rounded mb-4">{message}</div>}
                {error && <div className="bg-red-700 text-[#EEEEEE] p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Course Title *"
                            className="col-span-2 p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                        />
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                        >
                            <option>Web Development</option>
                            <option>App Development</option>
                            <option>SEO</option>
                            <option>Digital Marketing</option>
                            <option>Machine Learning</option>
                            <option>Data Mining</option>
                            <option>Artificial Intelligence</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Course Description *"
                        rows={5}
                        className="w-full p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price (e.g., 199.99) *"
                            className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                        />
                        <input
                            name="thumbnail"
                            value={form.thumbnail}
                            onChange={handleChange}
                            placeholder="Thumbnail URL"
                            className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                        />
                        <input
                            name="targetAudience"
                            value={form.targetAudience}
                            onChange={handleChange}
                            placeholder="Target Audience"
                            className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                        />
                    </div>

                    {/* Instructor */}
                    <div className="bg-[#222831] p-4 rounded-lg border border-gray-700">
                        <h3 className="font-semibold text-lg text-[#76ABAE] mb-3">Instructor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                                name="name"
                                value={form.instructor.name}
                                onChange={handleInstructorChange}
                                placeholder="Instructor Name *"
                                className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none col-span-2"
                            />
                            <input
                                name="photo"
                                value={form.instructor.photo}
                                onChange={handleInstructorChange}
                                placeholder="Photo URL"
                                className="p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none"
                            />
                        </div>
                        <textarea
                            name="bio"
                            value={form.instructor.bio}
                            onChange={handleInstructorChange}
                            placeholder="Instructor Bio"
                            rows={3}
                            className="w-full p-3 rounded bg-[#222831] border border-gray-700 focus:outline-none mt-3"
                        />
                    </div>

                    {/* Lessons */}
                    <div className="bg-[#222831] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg text-[#76ABAE]">Lessons</h3>
                            <button type="button" onClick={addLesson} className="flex items-center gap-2 px-3 py-1.5 bg-[#76ABAE] text-[#222831] rounded">
                                <Plus size={14} /> Add Lesson
                            </button>
                        </div>

                        <div className="space-y-3">
                            {form.lessons.map((lesson, idx) => (
                                <div key={idx} className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-center">
                                    <input
                                        value={lesson.title}
                                        onChange={(e) => handleLessonChange(idx, "title", e.target.value)}
                                        placeholder={`Lesson ${idx + 1} Title *`}
                                        className="sm:col-span-3 p-2 rounded bg-[#31363F] border border-gray-700"
                                    />
                                    <input
                                        value={lesson.duration}
                                        onChange={(e) => handleLessonChange(idx, "duration", e.target.value)}
                                        placeholder="Duration (min) *"
                                        className="sm:col-span-1 p-2 rounded bg-[#31363F] border border-gray-700"
                                    />
                                    <input
                                        value={lesson.videoUrl}
                                        onChange={(e) => handleLessonChange(idx, "videoUrl", e.target.value)}
                                        placeholder="Video URL (optional)"
                                        className="sm:col-span-1 p-2 rounded bg-[#31363F] border border-gray-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeLesson(idx)}
                                        className="sm:col-span-1 flex items-center justify-center p-2 bg-red-600 rounded text-sm"
                                        aria-label={`Remove lesson ${idx + 1}`}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Objectives & Prerequisites */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#222831] p-4 rounded-lg border border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg text-[#76ABAE]">Objectives</h3>
                                <button type="button" onClick={() => addArrayField("objectives")} className="flex items-center gap-2 px-3 py-1.5 bg-[#76ABAE] text-[#222831] rounded">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {form.objectives.map((obj, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input
                                            value={obj}
                                            onChange={(e) => handleArrayChange("objectives", i, e.target.value)}
                                            placeholder={`Objective ${i + 1}`}
                                            className="flex-1 p-2 rounded bg-[#31363F] border border-gray-700"
                                        />
                                        <button type="button" onClick={() => removeArrayField("objectives", i)} className="p-2 bg-red-600 rounded">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#222831] p-4 rounded-lg border border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg text-[#76ABAE]">Prerequisites</h3>
                                <button type="button" onClick={() => addArrayField("prerequisites")} className="flex items-center gap-2 px-3 py-1.5 bg-[#76ABAE] text-[#222831] rounded">
                                    <Plus size={14} /> Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {form.prerequisites.map((pre, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                        <input
                                            value={pre}
                                            onChange={(e) => handleArrayChange("prerequisites", i, e.target.value)}
                                            placeholder={`Prerequisite ${i + 1}`}
                                            className="flex-1 p-2 rounded bg-[#31363F] border border-gray-700"
                                        />
                                        <button type="button" onClick={() => removeArrayField("prerequisites", i)} className="p-2 bg-red-600 rounded">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="bg-[#222831] p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg text-[#76ABAE]">FAQs</h3>
                            <button type="button" onClick={addFaq} className="flex items-center gap-2 px-3 py-1.5 bg-[#76ABAE] text-[#222831] rounded">
                                <Plus size={14} /> Add FAQ
                            </button>
                        </div>

                        <div className="space-y-3">
                            {form.faqs.map((faq, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-start">
                                    <input
                                        value={faq.question}
                                        onChange={(e) => handleFaqChange(i, "question", e.target.value)}
                                        placeholder={`Question ${i + 1}`}
                                        className="md:col-span-3 p-2 rounded bg-[#31363F] border border-gray-700"
                                    />
                                    <input
                                        value={faq.answer}
                                        onChange={(e) => handleFaqChange(i, "answer", e.target.value)}
                                        placeholder="Answer"
                                        className="md:col-span-2 p-2 rounded bg-[#31363F] border border-gray-700"
                                    />
                                    <button type="button" onClick={() => removeFaq(i)} className="md:col-span-1 p-2 bg-red-600 rounded flex items-center justify-center">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-3 bg-[#76ABAE] text-[#222831] font-bold px-6 py-3 rounded-lg shadow hover:bg-[#5e8f91] transition"
                        >
                            <Check size={18} />
                            {submitting ? "Saving..." : "Add Course"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setForm(initialState)}
                            className="px-4 py-3 border border-gray-600 rounded hover:bg-gray-700"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
