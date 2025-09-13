// src/components/Landing/SearchBarCategories.jsx
import React from "react";

function SearchBarCategories() {
    const categories = [
        "Development",
        "Business",
        "Design",
        "Marketing",
        "Data Science",
        "Personal Growth",
    ];

    return (
        <section className="bg-[#31363F] text-[#EEEEEE] py-12 px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Find the Right Course for You</h2>
            {/* Search Bar */}
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search for courses..."
                    className="w-full max-w-lg p-3 rounded-l-lg bg-[#222831] text-[#EEEEEE] focus:outline-none"
                />
                <button className="bg-[#76ABAE] text-[#222831] px-6 rounded-r-lg font-semibold hover:opacity-90 transition">
                    Search
                </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className="bg-[#222831] border border-[#76ABAE] text-[#EEEEEE] px-4 py-2 rounded-full hover:bg-[#76ABAE] hover:text-[#222831] transition"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default SearchBarCategories;
