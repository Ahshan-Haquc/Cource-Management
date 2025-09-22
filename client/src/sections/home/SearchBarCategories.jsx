// src/components/Landing/SearchBarCategories.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchBarCategories() {
    const categories = [
        "Development",
        "Business",
        "Design",
        "Marketing",
        "Data Science",
        "Personal Growth",
    ];

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (q) => {
        if (!q.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const res = await axios.get(`https://cource-management-backend.vercel.app/api/courses/search?q=${q}`);
            setResults(res.data.results || []);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-black text-[#EEEEEE] py-12 px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Find the Right Course for You</h2>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleSearch(e.target.value); // trigger search as user types
                    }}
                    placeholder="Search for courses..."
                    className="w-full max-w-lg p-3 rounded-l-lg bg-[#222831] text-[#EEEEEE] focus:outline-none"
                />
                <button
                    onClick={() => handleSearch(query)}
                    className="bg-[#76ABAE] text-[#222831] px-6 rounded-r-lg font-semibold hover:opacity-90 transition"
                >
                    Search
                </button>
            </div>


            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setQuery(cat);
                            handleSearch(cat);
                        }}
                        className="bg-[#222831] border border-[#76ABAE] text-[#EEEEEE] px-4 py-2 rounded-full hover:bg-[#76ABAE] hover:text-[#222831] transition"
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Search Results */}
            <div className="max-w-4xl mx-auto text-left">
                {loading ? (
                    <p className="text-gray-400">Searching...</p>
                ) : results.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {results.map((course) => (
                            <Link
                                key={course._id}
                                to={`/course/${course._id}`}
                                className="flex items-center gap-4 bg-[#222831] p-4 rounded-lg hover:bg-[#333] transition"
                            >
                                <img
                                    src={course.thumbnail || "https://via.placeholder.com/80"}
                                    alt={course.title}
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-[#EEEEEE]">{course.title}</h4>
                                    <p className="text-sm text-gray-400">
                                        {course.category} · {course.instructor?.name}
                                    </p>
                                    <p className="text-sm font-bold text-[#76ABAE]">${course.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : query ? (
                    <p className="text-gray-400">No results found.</p>
                ) : null}
            </div>
        </section>
    );
}

export default SearchBarCategories;
