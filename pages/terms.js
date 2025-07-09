import React from "react";
import SeoHead from "@/components/SeoHead";

export default function TermsOfUsePage() {
    return (
        <>
            <SeoHead
                title={`Terms - AI Tool Pouch`}
                description={`Terms And Conditions Of Use`}
                url={`https://aitoolpouch.com/terms/`}
            />
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-[80%] mx-auto flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] flex justify-center">
                    {/* INNER WRAPPER: 80% of left column, padded on mobile */}
                    <div className="w-full md:w-[75%] text-left flex flex-col">
                        <div>
                            <h1 className="text-2xl text-headingWhite font-bold mb-6">
                                Terms of Use
                            </h1>
                            <p className="mb-6 text-grayText">
                                By using AI Tool Pouch, you agree to the
                                following terms and conditions.
                            </p>
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Content Accuracy
                            </h1>
                            <p className="mb-4 text-grayText">
                                We strive to provide accurate and timely
                                information, but we make no guarantees regarding
                                completeness, correctness, or availability of
                                any listings or data on this site.
                            </p>
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Use of Site
                            </h1>
                            <p className="mb-4 text-grayText">
                                You agree to use AI Tool Pouch for lawful
                                purposes only. You may not attempt to gain
                                unauthorized access to any part of the site or
                                use our data for malicious purposes.
                            </p>
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Affiliate Disclosure
                            </h1>
                            <p className="mb-4 text-grayText">
                                Some links on this site may be affiliate links.
                                If you click and make a purchase, we may earn a
                                commission at no additional cost to you.
                            </p>
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Limitation of Liability
                            </h1>
                            <p className="mb-4 text-grayText">
                                We are not liable for any direct or indirect
                                damages resulting from the use of this site or
                                any tools or services listed on it.
                            </p>
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Changes to These Terms
                            </h1>
                            <p className="text-grayText mb-4">
                                We reserve the right to update these terms at
                                any time. Continued use of the site after
                                changes are posted constitutes acceptance of
                                those changes.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[75%]">
                        <img
                            src="/images/wrench5.webp"
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
