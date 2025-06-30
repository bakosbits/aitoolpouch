import React from "react";

export default function AboutPage() {
    return (
        <div className="w-[80%] mx-auto py-12">
            <div className="flex flex-col md:flex-row items-start gap-10">
                {/* Left: Image Column */}
                <div className="w-full md:w-[35%] flex justify-center items-start">
                    <img
                        src="/images/wrench2.jpg"
                        style={{
                            filter: "grayscale(.7) saturate(110%) brightness(0.95) contrast(0.98)",
                        }}
                        alt="AI Wrenches"
                        className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                    />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[2%]" />

                {/* Right: Content Column */}
                <div className="w-full md:w-[53%]">
                    <h1 className="text-2xl text-headingWhite font-semibold mt-6 mb-4">
                        About AI Tool Pouch
                    </h1>
                    <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">
                        Our Mission & Vision
                    </h2>
                    <p className="mb-4 text-grayText">
                        In a rapidly evolving landscape of artificial
                        intelligence, finding valuable and relevant tools for
                        your profession can be overwhelming. We intendto cut
                        through the noise, providing a focused and reliable
                        resource that empowers professionals to leverage AI
                        effectively in their daily tasks. It woon't be too far
                        off into the future where every individual and business
                        is looking to integrate AI to their daily routine. We
                        want to help you avoid the paradox of choice.
                    </p>

                    {/* New Section: How We Curate */}
                    <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">
                        How We Curate
                    </h2>
                    <p className="mb-4 text-grayText">
                        Our process is straightforward. We tear into each tool
                        by assessing its core functionality, unique features,
                        target audience, and real-world benefits. Our goal is to
                        provide insights that help you understand "what" the
                        tool is, "who" it's for, and "why" it matters to someone
                        in that role. We prioritize tools that offer clear value
                        and solve specific problems, ensuring our directory
                        remains a high-quality resource.
                    </p>

                    {/* New Section: Why Trust Us? */}
                    <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">
                        Why Trust Us?
                    </h2>
                    <p className="mb-4 text-grayText">
                        All tools are independently researched and categorized
                        by us. The reviews and classifications are based on
                        evaluation, not paid placements. While listings may
                        contain affiliate links, these relationships do not
                        influence our assessment or inclusion criteria; they
                        simply help support the operational costs of maintaining
                        and improving this valuable resource at no additional
                        cost to you. Our commitment is always to transparency
                        and unbiased information.
                    </p>

                    <p className="mb-4 text-grayText">
                        We’re building a smarter, more practical way to explore
                        the AI landscape.
                    </p>

                    {/* Optional: Future Outlook - A small addition for a forward-looking touch */}
                    <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">
                        Our Future
                    </h2>
                    <p className="text-grayText">
                        As the world of AI continues to evolve, so too will AI
                        Tool Pouch. We will continue to add new tools, refine
                        our categories, and work to make our platform simple and
                        affective so you're able to integrate AI into your
                        professional life quickly.
                    </p>
                </div>
            </div>
        </div>
    );
}
