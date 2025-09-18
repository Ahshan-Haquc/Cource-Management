import React from "react";
import { Shield } from "lucide-react";

function PrivacyPage() {
    return (
        <section className="bg-[#222831] min-h-screen text-[#EEEEEE] py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-[#31363F] p-8 sm:p-12 rounded-2xl shadow-xl border border-[#444]">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-gray-600 pb-4">
                    <Shield className="w-8 h-8 text-[#76ABAE]" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#EEEEEE]">
                        Privacy Policy
                    </h1>
                </div>

                {/* Introduction */}
                <div className="text-gray-300 leading-relaxed mb-8">
                    <p className="mb-4">
                        At ByteAcademy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our services.
                    </p>
                    <p>
                        By using our Service, you agree to the collection and use of information in accordance with this policy.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8 text-gray-300 leading-relaxed">

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">1. Information We Collect</h2>
                        <p className="mb-3">We collect several types of information to provide and improve our Service:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Personal Data:</strong> Name, email address, and payment information you provide during registration and purchase.</li>
                            <li><strong>Usage Data:</strong> Information on how you access and use the Service, such as pages visited, time spent on the site, and course progress.</li>
                            <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to track activity on our Service and store certain information.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">2. How We Use Your Information</h2>
                        <p className="mb-3">We use the collected data for various purposes:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>To provide and maintain the Service.</li>
                            <li>To manage your account and provide customer support.</li>
                            <li>To monitor the usage of the Service and improve user experience.</li>
                            <li>To send you updates, promotional materials, and other information about our courses.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">3. Data Security</h2>
                        <p>The security of your data is important to us. We use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee its absolute security.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">4. Disclosure of Data</h2>
                        <p>We may share your information with third-party service providers to facilitate our Service. We will not sell or rent your personal data to any third party. We may also disclose your data if required by law or in response to valid requests by public authorities.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">5. Your Data Protection Rights</h2>
                        <p>You have the right to access, update, and request deletion of your personal data. Please contact us to exercise these rights.</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-[#76ABAE]">6. Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We advise you to review this Privacy Policy periodically for any changes.</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default PrivacyPage;