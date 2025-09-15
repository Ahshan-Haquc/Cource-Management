import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star, BookOpen, Clock, Users, Award, ChevronDown, CheckCircle } from "lucide-react"; // Added new icons
import axios from "axios";

function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false); // Set to false for dummy data
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [openFAQIndex, setOpenFAQIndex] = useState(null); // State for FAQ accordion

    // Uncomment and adapt if you want to fetch real data
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/courses/displayOneCourseToUser/${id}`,
                    { withCredentials: true }
                );
                setCourse(res.data.courses[0]);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching course:", err);
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const addToWishlist = async () => {
        try {
            // await axios.post(
            //     `http://localhost:5000/api/courses/addToWishlist/${id}`,
            //     {},
            //     { withCredentials: true }
            // );
            setAddedToWishlist(true);
            alert("Course added to wishlist!");
        } catch (err) {
            console.error(err);
            alert("Error adding course to wishlist.");
        }
    };

    const purchaseCourse = async () => {
        try {
            // await axios.get(
            //     `http://localhost:5000/api/courses/purchaseCourse/${id}`,
            //     { withCredentials: true }
            // );
            setPurchased(true);
            alert("Course purchased successfully!");
        } catch (err) {
            console.error(err);
            alert("Error purchasing course.");
        }
    };

    if (loading)
        return <div className="text-center text-[#EEEEEE] py-20 bg-[#222831] min-h-screen">Loading course details...</div>;

    if (!course)
        return <div className="text-center text-[#EEEEEE] py-20 bg-[#222831] min-h-screen">Course not found.</div>;

    const totalLessons = course.lessons?.length || 0;
    const totalDurationMinutes = course.lessons?.reduce((sum, l) => sum + (l.duration || 0), 0) || 0;
    const totalDurationHours = (totalDurationMinutes / 60).toFixed(1);
    const discountPercentage = 25; // Example discount
    const discountedPrice = course.price * (1 - discountPercentage / 100);

    return (
        <div className="bg-[#222831] text-[#EEEEEE] min-h-screen font-sans">
            {/* Hero Section */}
            <div
                className="relative h-96 flex items-end pb-12 px-6 sm:px-10 lg:px-20 overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(34, 40, 49, 0.7), rgba(34, 40, 49, 0.9)), url(${course.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="relative z-10 max-w-4xl">
                    <p className="text-[#76ABAE] text-sm font-semibold mb-2 uppercase tracking-wide">{course.category}</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#EEEEEE] leading-tight drop-shadow-lg">
                        {course.title}
                    </h1>
                    <p className="text-lg text-gray-300 mt-4 max-w-xl hidden md:block">{course.description.substring(0, 150)}...</p>
                    <div className="flex items-center mt-4 text-gray-300">
                        <div className="flex items-center mr-4">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    fill={i < Math.round(course.rating?.average || 0) ? "#FFD700" : "none"}
                                    stroke="#FFD700"
                                    className="mr-1"
                                />
                            ))}
                            <span className="ml-1 font-semibold">{course.rating?.average?.toFixed(1) || 'N/A'}</span>
                            <span className="text-sm text-gray-400 ml-2">({course.rating?.count || 0} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto py-12 px-6 sm:px-10 lg:px-20 grid md:grid-cols-3 gap-10 lg:gap-16">
                {/* Left Column: Course Details */}
                <div className="md:col-span-2 space-y-10">
                    {/* Full Description */}
                    <div>
                        <h2 className="text-3xl font-bold text-[#76ABAE] mb-4">Course Overview</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">{course.description}</p>
                    </div>

                    {/* What you'll learn */}
                    {course.objectives?.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-[#76ABAE] mb-4">What you'll learn</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {course.objectives.map((obj, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-[#31363F] p-4 rounded-lg shadow-md">
                                        <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                                        <p className="text-gray-300">{obj}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instructor Section */}
                    <div className="bg-[#31363F] p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <img
                            src={course.instructor?.photo || "https://randomuser.me/api/portraits/men/32.jpg"}
                            alt={course.instructor?.name || "Instructor"}
                            className="w-28 h-28 rounded-full border-4 border-[#76ABAE] object-cover flex-shrink-0"
                        />
                        <div>
                            <h3 className="text-2xl font-bold text-[#76ABAE] mb-1">Meet Your Instructor</h3>
                            <p className="text-xl font-semibold text-[#EEEEEE] mb-2">{course.instructor?.name || "John Doe"}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{course.instructor?.bio || "Experienced professional and developer with a passion for teaching."}</p>
                        </div>
                    </div>

                    {/* Course Content / Lessons */}
                    <section>
                        <h3 className="text-2xl font-bold text-[#76ABAE] mb-4">Course Content</h3>
                        <div className="space-y-3">
                            {course.lessons?.length > 0 ? (
                                course.lessons.map((lesson, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#31363F] p-4 rounded-lg shadow-md flex justify-between items-center hover:bg-[#383d47] transition-colors"
                                    >
                                        <p className="font-semibold text-gray-200">
                                            {index + 1}. {lesson.title}
                                        </p>
                                        <p className="text-sm text-gray-400 flex items-center">
                                            <Clock size={16} className="mr-1" /> {lesson.duration || "5"} min
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No lessons available yet.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Price Card & Actions */}
                <div className="md:col-span-1 sticky top-28 h-fit">
                    <div className="bg-[#31363F] p-8 rounded-2xl shadow-xl border-2 border-[#31363F] hover:border-[#76ABAE] transition-all duration-300 space-y-6">
                        {/* Price */}
                        <div>
                            <p className="text-gray-300 text-base mb-2">Current Price</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-[#76ABAE] text-4xl font-extrabold">${discountedPrice.toFixed(2)}</span>
                                {course.price > discountedPrice && (
                                    <span className="text-gray-500 line-through text-lg">${course.price.toFixed(2)}</span>
                                )}
                                {discountPercentage > 0 && (
                                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {discountPercentage}% OFF
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400 text-sm mt-2">Limited time offer!</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-3 text-gray-300 text-base">
                            <div className="flex items-center">
                                <BookOpen size={20} className="text-[#76ABAE] mr-3" />
                                <span>{totalLessons} Lessons</span>
                            </div>
                            <div className="flex items-center">
                                <Clock size={20} className="text-[#76ABAE] mr-3" />
                                <span>{totalDurationHours} Total Hours</span>
                            </div>
                            <div className="flex items-center">
                                <Users size={20} className="text-[#76ABAE] mr-3" />
                                <span>Lifetime Access</span>
                            </div>
                            <div className="flex items-center">
                                <Award size={20} className="text-[#76ABAE] mr-3" />
                                <span>Certificate of Completion</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={purchaseCourse}
                            disabled={purchased}
                            className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#76ABAE] text-[#222831] font-bold rounded-lg shadow-lg hover:bg-[#5e8f91] transition-all duration-300 transform hover:-translate-y-1 ${purchased ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            <ShoppingCart size={22} />
                            {purchased ? "Course Purchased!" : `Buy Now for $${discountedPrice.toFixed(2)}`}
                        </button>

                        <button
                            onClick={addToWishlist}
                            disabled={addedToWishlist}
                            className={`w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#76ABAE] text-[#76ABAE] font-bold rounded-lg shadow-md hover:bg-[#76ABAE] hover:text-[#222831] transition-all duration-300 ${addedToWishlist ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            <Heart size={22} fill={addedToWishlist ? "#76ABAE" : "none"} />
                            {addedToWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Prerequisites & Target Audience Section */}
            {(course.prerequisites?.length > 0 || course.targetAudience) && (
                <div className="max-w-7xl mx-auto py-8 px-6 sm:px-10 lg:px-20 bg-[#31363F] rounded-2xl shadow-xl mb-12">
                    <h2 className="text-3xl font-bold text-[#76ABAE] mb-6 text-center">Who is this course for?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {course.prerequisites?.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold text-[#EEEEEE] mb-3 flex items-center gap-2">
                                    <BookOpen size={20} className="text-[#76ABAE]" /> Prerequisites
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                                    {course.prerequisites.map((pre, i) => (
                                        <li key={i}>{pre}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold text-[#EEEEEE] mb-3 flex items-center gap-2">
                                <Users size={20} className="text-[#76ABAE]" /> Target Audience
                            </h3>
                            <p className="text-gray-300 leading-relaxed ml-4">{course.targetAudience || "Anyone interested in learning."}</p>
                        </div>
                    </div>
                </div>
            )}


            {/* FAQ Section */}
            {course.faqs?.length > 0 && (
                <section className="max-w-7xl mx-auto py-12 px-6 sm:px-10 lg:px-20">
                    <h2 className="text-3xl font-extrabold mb-8 text-[#76ABAE] text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {course.faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-[#31363F] p-5 rounded-lg shadow-lg cursor-pointer hover:bg-[#383d47] transition-colors duration-200"
                                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-lg text-gray-200">{faq.question}</p>
                                    <ChevronDown
                                        size={24}
                                        className={`text-[#76ABAE] transition-transform duration-300 ${openFAQIndex === index ? 'rotate-180' : ''}`}
                                    />
                                </div>
                                {openFAQIndex === index && (
                                    <p className="text-gray-400 mt-3 leading-relaxed animate-fade-in">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default CourseDetails;
