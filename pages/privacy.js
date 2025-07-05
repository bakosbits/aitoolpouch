import React from "react";
import SeoHead from "@/components/SearchBar";

export default function PrivacyPolicyPage() {
    return (
        <>
            <SeoHead
                title={`Privacy - AI Tool Pouch`}
                description={`Privacy Policy`}
                url={`https://aitoolpouch.com/privacy/`}
            />
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] flex justify-center">
                    {/* INNER WRAPPER: 75% of left column, padded on mobile */}
                    <div className="w-full md:w-[75%] text-left flex flex-col">
                        <div>
                            <h1 className="text-2xl text-headingWhite font-bold mb-6">
                                Privacy Policy
                            </h1>
                            <p className="mb-6 text-grayText">
                                This Privacy Policy explains how AI Tool Pouch
                                collects, uses, and protects your information
                                when you use our website.
                            </p>
                            <h2 className="text-xl text-headingWhite font-semibold">
                                Information We Collect
                            </h2>
                            <p className="mb-4 text-grayText">
                                We do not collect personal information unless
                                you explicitly provide it (e.g., via contact
                                forms). We use basic analytics tools (such as
                                Google Analytics or Plausible) to understand
                                aggregate site usage.
                            </p>
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                How We Use Your Information
                            </h2>
                            <p className="mb-4 text-grayText">
                                We use non-personal data to improve website
                                performance, content relevance, and user
                                experience.
                            </p>
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Third-Party Links
                            </h2>
                            <p className="mb-4 text-grayText">
                                Our site contains links to external websites,
                                some of which are affiliate partners. We are not
                                responsible for the privacy practices or content
                                of those sites.
                            </p>
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Your Rights
                            </h2>
                            <p className="mb-4 text-grayText">
                                You may request to access, correct, or delete
                                any personal information you've provided.
                                Contact us at via the form listed on our Contact
                                page.
                            </p>
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Updates
                            </h2>
                            <p className="mb-4 text-grayText">
                                We may update this Privacy Policy periodically.
                                Changes will be posted on this page with an
                                updated revision date.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[75%]">
                        <img
                            src="/images/wrench4.webp"
                            style={{
                                filter: "saturate(110%) brightness(0.95) contrast(0.98)",
                            }}
                            alt="AI Wrenches"
                            className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
