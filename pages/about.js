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

    <div className="w-[80%] mx-auto py-12">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Column */}
        <div className="w-full md:w-[35%] flex justify-center items-start">
          <img
            src={`/images/image4.jpg`}
            alt="page image"
            className="w-auto h-auto object-cover rounded-lg shadow-2xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
          />
        </div>

        {/* Spacer */}
        <div className="hidden md:block w-[2%]" />

        {/* Right: Content Column */}
        <div className="w-full md:w-[53%]">
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Our Mission & Vision</h2>
          <p className="mb-4 text-grayText">
            In a rapidly evolving landscape of artificial intelligence, finding the truly valuable tools can be overwhelming. Our mission is to cut through the noise, providing a focused and reliable resource that empowers professionals to leverage AI effectively in their daily tasks. We envision a future where every individual and business can effortlessly integrate cutting-edge AI to enhance creativity, productivity, and strategic decision-making.
          </p>

          {/* New Section: How We Curate */}
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">How We Curate</h2>
          <p className="mb-4 text-grayText">
            Our curation process is meticulous. We delve deep into each tool, assessing its core functionality, unique features, target audience, and real-world benefits. Our goal is to provide concise, actionable insights that help you understand "what" the tool is, "who" it's for, and "why" it matters to someone in that role. We prioritize tools that offer clear value and solve specific problems, ensuring our directory remains a high-quality resource.
          </p>

          {/* New Section: Why Trust Us? */}
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Why Trust Us?</h2>
          <p className="mb-4 text-grayText">
            All tools are independently researched and categorized by our team. Our reviews and classifications are based on thorough analysis, not paid placements. While many listings contain affiliate links, these relationships do not influence our assessment or inclusion criteria; they simply help support the operational costs of maintaining and improving this valuable resource at no additional cost to you. Our commitment is always to transparency and unbiased information.
          </p>

          <p className="mb-4 text-grayText">
            We’re building a smarter, more practical way to explore the AI landscape—one pouch at a time.
          </p>

          {/* Optional: Future Outlook - A small addition for a forward-looking touch */}
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Our Future</h2>
          <p className="text-grayText">
            As the world of AI continues to evolve, so too will AI Tool Pouch. We are continuously adding new tools, refining our categories, and striving to make our platform the most intuitive and comprehensive guide for integrating AI into your professional life.
          </p>
        </div>
      </div>
    </div>
  )
};    
