import React from "react";
import SeoHead from "@/components/SeoHead";

export default function LegalPage() {
    return (
        <>
            <SeoHead
                title={`Legal - AI Tool Pouch`}
                description={`Legal and Affiliate Disclosures`}
                url={`https://aitoolpouch.com/legal/`}
            />
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-full md:w-[90%] mx-auto flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] flex justify-center">
                    {/* INNER WRAPPER: 75% of left column, padded on mobile */}
                    <div className="w-full md:w-[75%] text-left flex flex-col ">
                        <div>
                            <h1 className="text-2xl text-headingWhite font-bold mb-6">
                                Legal & Disclosures
                            </h1>
                            {/* Affiliate Disclosure */}
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Affiliate Disclosure
                            </h1>
                            <p className="mb-4 text-grayText">
                                AI Tool Pouch participates in various affiliate
                                marketing programs, which means we may earn
                                commissions on qualifying purchases made through
                                links on this site to third-party products or
                                services. When you click on an affiliate link
                                and make a purchase, we may receive a small
                                commission from the vendor, at no additional
                                cost to you. These commissions are a primary way
                                we support the significant time and resources
                                required to research, curate, maintain, and grow
                                this platform, allowing us to continue providing
                                valuable content and unbiased information. Our
                                editorial integrity is paramount, and our
                                participation in affiliate programs does not
                                influence our unbiased reviews, assessments, or
                                the selection of tools featured. We only
                                recommend products and services that we believe
                                offer genuine value to our audience.
                            </p>
                            {/* Expanded No Guarantees */}
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Disclaimer & No Guarantees
                            </h1>
                            <p className="mb-4 text-grayText">
                                The information provided on AI Tool Pouch is for
                                general informational purposes only. While we
                                strive to ensure that all details about the
                                tools listed, including their features, pricing,
                                and availability, are accurate and up-to-date,
                                the AI landscape is constantly evolving.
                                Therefore, we make no warranties or guarantees
                                of any kind, express or implied, about the
                                completeness, accuracy, reliability,
                                suitability, or availability with respect to the
                                website or the information, products, services,
                                or related graphics contained on the website for
                                any purpose. Any reliance you place on such
                                information is therefore strictly at your own
                                risk. It is your responsibility to verify any
                                information directly with the respective tool
                                vendor before making any purchasing decisions or
                                commitments.
                            </p>
                            {/* Expanded Privacy Section */}
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Privacy & Data Use
                            </h1>
                            <p className="mb-4 text-grayText">
                                Your privacy is important to us. AI Tool Pouch
                                does not collect any personally identifiable
                                information from your visit beyond basic,
                                aggregated, and anonymized analytics data to
                                understand website traffic, user behavior
                                patterns (e.g., popular pages, referral
                                sources), and overall site performance. This
                                data helps us improve the user experience and
                                tailor our content. We do not use cookies for
                                tracking individual users, nor do we sell,
                                share, or rent any user data to third parties
                                for marketing or any other purposes. For a more
                                detailed explanation of our data practices,
                                please refer to our full Privacy Policy, which
                                will be published soon.
                            </p>
                            {/* Expanded Copyright */}
                            <h1 className="text-xl text-headingWhite font-semibold mb-1">
                                Copyright
                            </h1>
                            <p className="text-grayText mb-4">
                                © {new Date().getFullYear()} AI Tool Pouch. All
                                content and materials on this website, including
                                but not limited to text, graphics, logos,
                                images, and tool descriptions, are the
                                intellectual property of AI Tool Pouch unless
                                otherwise stated. All rights are reserved.
                                Unauthorized use, reproduction, distribution, or
                                duplication of any content from this site
                                without express written permission from AI Tool
                                Pouch is strictly prohibited. For inquiries
                                regarding content licensing or permissions,
                                please contact us through the provided channels.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[75%] ">
                        <img
                            src="/images/wrench3.webp"
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
