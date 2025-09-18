import React from "react";
import { FileText } from "lucide-react";

function TermsPage() {
    return (
        <section className="bg-[#222831] min-h-screen text-[#EEEEEE] py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-[#31363F] p-8 sm:p-12 rounded-2xl shadow-xl border border-[#444] ">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-gray-600 pb-4">
                    <FileText className="w-8 h-8 text-[#76ABAE]" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#EEEEEE]">
                        Terms of Service
                    </h1>
                </div>

                {/* Table of Contents */}
                <div className="bg-[#2a2f36] p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-[#76ABAE]">
                        Table of Contents
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li><a href="#introduction" className="hover:text-[#76ABAE] transition-colors">1. Introduction</a></li>
                        <li><a href="#user-accounts" className="hover:text-[#76ABAE] transition-colors">2. User Accounts</a></li>
                        <li><a href="#use-of-service" className="hover:text-[#76ABAE] transition-colors">3. Permitted Use of the Service</a></li>
                        <li><a href="#intellectual-property" className="hover:text-[#76ABAE] transition-colors">4. Intellectual Property Rights</a></li>
                        <li><a href="#disclaimer" className="hover:text-[#76ABAE] transition-colors">5. Disclaimer of Warranties</a></li>
                        <li><a href="#limitation-of-liability" className="hover:text-[#76ABAE] transition-colors">6. Limitation of Liability</a></li>
                        <li><a href="#termination" className="hover:text-[#76ABAE] transition-colors">7. Termination</a></li>
                        <li><a href="#changes" className="hover:text-[#76ABAE] transition-colors">8. Changes to the Terms</a></li>
                        <li><a href="#contact" className="hover:text-[#76ABAE] transition-colors">9. Contact Information</a></li>
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-8 text-gray-300 leading-relaxed">

                    <div id="introduction">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">1. Introduction</h2>
                        <p>Welcome to ByteAcademy. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not use our services.</p>
                    </div>

                    <div id="user-accounts">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">2. User Accounts</h2>
                        <p>To access certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.</p>
                    </div>

                    <div id="use-of-service">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">3. Permitted Use of the Service</h2>
                        <p>You agree to use the Service only for lawful purposes. Prohibited activities include, but are not limited to, copyright infringement, harassment, and unauthorized access to our systems.</p>
                    </div>

                    <div id="intellectual-property">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">4. Intellectual Property Rights</h2>
                        <p>All content on ByteAcademy, including courses, videos, and text, is the property of ByteAcademy and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our express permission.</p>
                    </div>

                    <div id="disclaimer">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">5. Disclaimer of Warranties</h2>
                        <p>The Service is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the Service.</p>
                    </div>

                    <div id="limitation-of-liability">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">6. Limitation of Liability</h2>
                        <p>In no event shall ByteAcademy be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service.</p>
                    </div>

                    <div id="termination">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">7. Termination</h2>
                        <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </div>

                    <div id="changes">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">8. Changes to the Terms</h2>
                        <p>We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
                    </div>

                    <div id="contact">
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">9. Contact Information</h2>
                        <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@byteacademy.com" className="text-[#76ABAE] hover:underline">support@byteacademy.com</a>.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default TermsPage;