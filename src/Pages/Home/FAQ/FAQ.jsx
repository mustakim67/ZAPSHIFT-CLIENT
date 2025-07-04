import React from 'react';

const FAQ = () => {
    return (
        <div className="px-[10%] py-16 bg-white text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#03373D] text-center mb-8">
                Frequently Asked Questions
            </h2>

            <div className="join join-vertical bg-base-100 w-full mx-auto">
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        How do I create an account?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        Click the "Sign Up" button in the top right corner and follow the registration process.
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        I forgot my password. What should I do?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        Click on "Forgot Password" on the login page and follow the instructions sent to your email.
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        How do I update my profile information?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        Go to "My Account" settings and select "Edit Profile" to make changes.
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        How can I join a hobby group?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        Navigate to the "Groups" section, browse based on your interest, and click "Join" on any group you like.
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        Can I create my own group?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        Yes! Go to the "Create Group" tab, fill in your hobby details, and click "Publish".
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title font-semibold text-[#03373D]">
                        Is there a mobile app available?
                    </div>
                    <div className="collapse-content text-sm text-gray-600">
                        We’re working on it! For now, you can use the fully responsive web version from any device.
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FAQ;