import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function SearchBox() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // fetch results when query changes
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/courses/search?q=${query}`);
                setResults(res.data.results || []);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        }, 400); // debounce 400ms

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="relative">
            <div className="flex items-center gap-3">
                {/* Search Icon */}
                <button
                    onClick={() => setOpen(!open)}
                    className="hover:text-[#76ABAE] transition-transform duration-200 transform hover:scale-110"
                >
                    <Search size={22} />
                </button>

                {/* Input */}
                <div
                    className={`flex items-center bg-[#EEEEEE] rounded-lg overflow-hidden transition-all duration-300 ${open ? "w-[250px] px-3 py-2" : "w-0 px-0 py-0"
                        }`}
                >
                    {open && (
                        <>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search courses..."
                                className="flex-1 bg-transparent outline-none text-[#222831] font-medium"
                            />
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setQuery("");
                                    setResults([]);
                                }}
                                className="ml-2 text-[#222831] hover:text-red-500"
                            >
                                <X size={18} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Results Dropdown */}
            {open && query.trim() && (
                <div className="absolute top-[110%] right-0 w-[350px] max-h-[300px] overflow-y-auto bg-[#EEEEEE] rounded-lg shadow-lg p-3 z-50">
                    {loading ? (
                        <p className="text-gray-500">Searching...</p>
                    ) : results.length > 0 ? (
                        results.map((course) => (
                            <Link
                                key={course._id}
                                to={`/course/${course._id}`}
                                className="flex items-center gap-3 p-2 hover:bg-[#ddd] rounded-lg transition"
                                onClick={() => {
                                    setOpen(false);
                                    setQuery("");
                                    setResults([]);
                                }}
                            >
                                <img
                                    src={course.thumbnail || "https://via.placeholder.com/50"}
                                    alt={course.title}
                                    className="w-12 h-12 rounded-md object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-[#222831]">{course.title}</h4>
                                    <p className="text-sm text-gray-600">
                                        {course.category} · {course.instructor?.name}
                                    </p>
                                    <p className="text-sm font-bold text-[#76ABAE]">${course.price}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBox;
