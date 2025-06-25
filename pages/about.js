import React from 'react';
import { getAllCategories } from '@/lib/airtable';

  export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}

export default function AboutPage() {
    return (

        <div className="relative z-[10] max-w-4xl mx-auto w-full px-4 py-4">
            <div className="max-w-3xl mx-auto w-full px-4 py-10">
                <h1 className="text-2xl font-bold mb-4">About AI Tool Pouch</h1>

                <p className="mb-4 text-gray-700">
                    AI Tool Pouch is your curated directory of powerful AI tools, organized by professional role and real-world use case. We believe the right tools should be easy to find, easy to understand, and easy to trust.
                </p>

                <p className="mb-4 text-gray-700">
                    Whether you're a writer, developer, marketer, or part of a growing business, AI Tool Pouch helps you discover solutions that match how you actually work—not just what's trending.
                </p>

                {/* New Section: Our Mission and Vision */}
                <h2 className="text-xl font-semibold mt-4">Our Mission & Vision</h2>
                <p className="mb-4 text-gray-700">
                    In a rapidly evolving landscape of artificial intelligence, finding the truly valuable tools can be overwhelming. Our mission is to cut through the noise, providing a focused and reliable resource that empowers professionals to leverage AI effectively in their daily tasks. We envision a future where every individual and business can effortlessly integrate cutting-edge AI to enhance creativity, productivity, and strategic decision-making.
                </p>

                {/* New Section: How We Curate */}
                <h2 className="text-xl font-semibold mt-4">How We Curate</h2>
                <p className="mb-4 text-gray-700">
                    Our curation process is meticulous. We delve deep into each tool, assessing its core functionality, unique features, target audience, and real-world benefits. Our goal is to provide concise, actionable insights that help you understand "what" the tool is, "who" it's for, and "why" it matters to someone in that role. We prioritize tools that offer clear value and solve specific problems, ensuring our directory remains a high-quality resource.
                </p>

                {/* New Section: Why Trust Us? */}
                <h2 className="text-xl font-semibold mt-4">Why Trust Us?</h2>
                <p className="mb-4 text-gray-700">
                    All tools are independently researched and categorized by our team. Our reviews and classifications are based on thorough analysis, not paid placements. While many listings contain affiliate links, these relationships do not influence our assessment or inclusion criteria; they simply help support the operational costs of maintaining and improving this valuable resource at no additional cost to you. Our commitment is always to transparency and unbiased information.
                </p>

                <p className="mb-4 text-gray-700">
                    We’re building a smarter, more practical way to explore the AI landscape—one pouch at a time.
                </p>

                {/* Optional: Future Outlook - A small addition for a forward-looking touch */}
                <h2 className="text-xl font-semibold mt-4">Our Future</h2>
                <p className="text-gray-700">
                    As the world of AI continues to evolve, so too will AI Tool Pouch. We are continuously adding new tools, refining our categories, and striving to make our platform the most intuitive and comprehensive guide for integrating AI into your professional life.
                </p>

            </div>
        </div>
    );
}
