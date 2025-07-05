import React from "react";
import SeoHead from "@/components/SeoHead";

export default function AboutPage() {
    return (
        <>
            <SeoHead
                title={`About AI Tool Pouch`}
                description={
                    "Find the best AI tools for you, group and compare side-by-side"
                }
                url={`https://aitoolpouch.com/about/`}
            />
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-[90%] mx-auto flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] flex justify-center">
                    {/* INNER WRAPPER: 75% of left column, padded on mobile */}
                    <div className="w-full md:w-[75%] text-left flex flex-col">
                        <div>
                            <h1 className="text-2xl text-headingWhite font-semibold mb-6">
                                About AI Tool Pouch
                            </h1>
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Our Mission & Vision
                            </h2>
                            <p className="mb-4 text-grayText">
                                In a rapidly evolving landscape of artificial
                                intelligence, finding valuable and relevant
                                tools for your profession can be overwhelming.
                                We intend to cut through the noise, providing a
                                focused and reliable resource that empowers
                                professionals to leverage AI effectively in
                                their daily tasks. It won't be too far off into
                                the future where every individual and business
                                is looking to integrate AI to their daily
                                routine. We want to help you avoid the paradox
                                of choice.
                            </p>

                            {/* New Section: How We Curate */}
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                How We Curate
                            </h2>
                            <p className="mb-4 text-grayText">
                                Our process is straightforward. We tear into
                                each tool by assessing its core functionality,
                                unique features, target audience, and real-world
                                benefits. Our goal is to provide insights that
                                help you understand "what" the tool is, "who"
                                it's for, and "why" it matters to someone in
                                that role. We prioritize tools that offer clear
                                value and solve specific problems, ensuring our
                                directory remains a high-quality resource.
                            </p>

                            {/* New Section: Why Trust Us? */}
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Why Trust Us?
                            </h2>
                            <p className="mb-4 text-grayText">
                                All tools are independently researched and
                                categorized by us. The reviews and
                                classifications are based on evaluation, not
                                paid placements. While listings may contain
                                affiliate links, these relationships do not
                                influence our assessment or inclusion criteria;
                                they simply help support the operational costs
                                of maintaining and improving this valuable
                                resource at no additional cost to you. Our
                                commitment is always to transparency and
                                unbiased information.
                            </p>

                            <p className="mb-4 text-grayText">
                                We’re building a smarter, more practical way to
                                explore the AI landscape.
                            </p>

                            {/* Optional: Future Outlook - A small addition for a forward-looking touch */}
                            <h2 className="text-xl text-headingWhite font-semibold mb-1">
                                Our Future
                            </h2>
                            <p className="mb-4 text-grayText">
                                As the world of AI continues to evolve, so too
                                will AI Tool Pouch. We will continue to add new
                                tools, refine our categories, and work to make
                                our platform simple and affective so you're able
                                to integrate AI into your professional life
                                quickly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[75%]">
                        <img
                            src="/images/wrench2.webp"
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
