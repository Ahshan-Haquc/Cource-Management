import React from "react";
import { Bell, ArrowRight, BookOpen, Clock, BarChart2, Zap } from "lucide-react"; // Added Zap icon

function NotificationPage() {
    return (
        <section className="bg-[#222831] min-h-screen text-[#EEEEEE] py-20 px-4 sm:px-6 lg:px-8 font-inter"> {/* Changed font to inter for modern look */}
            <div className="max-w-4xl mx-auto">
                {/* Main Notification Card */}
                <div className="bg-[#31363F] p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-700 hover:border-[#76ABAE] transition-all duration-500 transform hover:scale-[1.01] hover:shadow-2xl relative overflow-hidden">
                    {/* Background gradient/pattern for flair */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#31363F] via-[#222831] to-[#31363F] opacity-70 rounded-3xl"></div>
                    <div className="relative z-10"> {/* Ensure content is above background */}

                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-600 pb-4">
                            <div className="p-3 rounded-full bg-[#76ABAE] text-[#222831] drop-shadow-lg animate-pulse-once"> {/* Added animation */}
                                <Bell className="w-7 h-7" />
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#EEEEEE] leading-tight tracking-wide">
                                DevZone Academy <span className="text-[#76ABAE]">Alert!</span> {/* Changed "Update" to "Alert" for more impact */}
                            </h1>
                        </div>

                        {/* Notification Image */}
                        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg border border-gray-600 group">
                            <img
                                src="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
                                alt="New courses and huge discounts announcement"
                                className="w-full h-48 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                            {/* <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-opacity duration-300"></div> Image overlay */}
                        </div>

                        {/* Content Section */}
                        <div className="space-y-7"> {/* Increased spacing */}
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#76ABAE] drop-shadow-md">
                                <Zap size={28} className="inline-block mr-2 text-yellow-400" /> {/* Added Zap icon */}
                                Unleash Your Potential: New Courses & Mega Discounts!
                            </h2>

                            <p className="text-gray-300 leading-relaxed text-lg"> {/* Larger text */}
                                We're absolutely thrilled to announce that <strong className="text-[#76ABAE] font-semibold">DevZone Academy</strong> has just launched **10 groundbreaking computer science courses**! Dive deep into cutting-edge fields like Web Development, App Development, Machine Learning, and more. Each course is meticulously crafted by leading industry experts, featuring hands-on projects designed to supercharge your portfolio.
                            </p>

                            <div className="bg-[#2a2f36] p-5 sm:p-7 rounded-lg border-l-4 border-[#76ABAE] relative overflow-hidden group"> {/* Enhanced offer block */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#76ABAE]/10 to-transparent transform -skew-x-12 group-hover:skew-x-0 transition-all duration-500"></div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white relative z-10">
                                    <span className="text-yellow-400 mr-2"></span> Exclusive Early Bird Offer!
                                </h3>
                                <p className="text-gray-300 text-lg relative z-10"> {/* Larger text */}
                                    Be one of the first 200 students to enroll and grab a massive **50% discount**! This incredible offer is valid only until <strong className="text-white text-xl">September 30, 2025</strong>. Don't let this opportunity slip away!
                                </p>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-lg">
                                Each course is designed to empower you with:
                            </p>

                            <div className="grid sm:grid-cols-2 gap-5"> {/* Increased gap */}
                                <div className="flex items-start gap-4 bg-[#2a2f36] p-4 rounded-lg shadow-md border border-gray-700 hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105">
                                    <BookOpen size={24} className="text-[#76ABAE] flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-white">In-depth Video Tutorials</h4>
                                        <span className="text-gray-400 text-sm">Clear, concise, and easy to follow lessons.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-[#2a2f36] p-4 rounded-lg shadow-md border border-gray-700 hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105">
                                    <Clock size={24} className="text-[#76ABAE] flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-white">Lifetime Access & Free Updates</h4>
                                        <span className="text-gray-400 text-sm">Learn at your own pace, forever.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-[#2a2f36] p-4 rounded-lg shadow-md border border-gray-700 hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105">
                                    <BarChart2 size={24} className="text-[#76ABAE] flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-white">Build a Strong Portfolio</h4>
                                        <span className="text-gray-400 text-sm">Practical projects to showcase your skills.</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 bg-[#2a2f36] p-4 rounded-lg shadow-md border border-gray-700 hover:border-[#76ABAE] transition-all duration-300 transform hover:scale-105">
                                    <Bell size={24} className="text-[#76ABAE] flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-white">Direct Instructor Support</h4>
                                        <span className="text-gray-400 text-sm">Get answers to your questions, fast.</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-lg">
                                Whether you're just starting your coding journey or looking to master advanced concepts, our new courses are your pathway to success. Join <strong className="text-[#76ABAE] font-semibold">DevZone Academy</strong> today and start building the future you envision!
                            </p>
                        </div>

                        {/* Call to Action Button */}
                        <div className="mt-10 flex justify-center"> {/* Increased top margin */}
                            <button className="flex items-center gap-2 px-10 py-5 bg-[#76ABAE] text-[#222831] font-extrabold rounded-lg shadow-xl hover:bg-[#5e8f91] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-bounce-once"> {/* Enhanced button */}
                                Enroll Now <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotificationPage;