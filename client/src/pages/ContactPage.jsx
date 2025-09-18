import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from "lucide-react";

function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // just show success message, no backend
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="bg-[#222831] min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto w-full bg-[#31363F] p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-700 flex flex-col lg:flex-row overflow-hidden">

                {/* Left Side: Contact Information */}
                <div className="lg:w-1/2 p-6 sm:p-8 bg-[#2a2f36] rounded-xl flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0 lg:mr-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#76ABAE] mb-4">Get in Touch</h2>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        Have any questions or feedback? We'd love to hear from you! Our team is ready to assist you with any inquiries you may have.
                    </p>
                    <div className="space-y-6 text-gray-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#76ABAE] text-[#222831] rounded-full drop-shadow-md">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Email Address</h3>
                                <a href="mailto:support@byteacademy.com" className="text-gray-400 hover:text-[#76ABAE] transition-colors">support@byteacademy.com</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#76ABAE] text-[#222831] rounded-full drop-shadow-md">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Phone Number</h3>
                                <p className="text-gray-400">+1 234 567 890</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#76ABAE] text-[#222831] rounded-full drop-shadow-md">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Office Address</h3>
                                <p className="text-gray-400">123 Learning Street, Knowledge City</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:w-1/2 p-6 sm:p-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#76ABAE] mb-8 text-center lg:text-left">Send Us a Message</h2>

                    {success && (
                        <div className="bg-green-600/20 text-green-400 font-semibold p-4 rounded-lg mb-6 text-center">
                            Your message was sent successfully! We will contact you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-white">
                        <div className="relative">
                            <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full p-4 pl-12 rounded-lg bg-[#222831] border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#76ABAE] transition-colors "
                            />
                        </div>
                        <div className="relative">
                            <AtSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="w-full p-4 pl-12 rounded-lg bg-[#222831] border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#76ABAE] transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <MessageSquare size={20} className="absolute left-3 top-4 text-gray-400" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="6"
                                required
                                className="w-full p-4 pl-12 rounded-lg bg-[#222831] border border-[#444] focus:outline-none focus:ring-2 focus:ring-[#76ABAE] transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-4 bg-[#76ABAE] text-[#222831] font-bold rounded-lg shadow-lg hover:bg-[#5e8f91] transition-colors transform hover:scale-105"
                        >
                            <Send size={20} />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;