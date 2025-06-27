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

export default function PrivacyPolicyPage() {

  return (

    <div className="w-[80%] mx-auto py-12">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Column */}
        <div className="w-full md:w-[35%] flex justify-center items-start">
          <img
            src={`/images/image6.jpg`}
            alt="page image"
            className="w-auto h-auto object-cover rounded-lg shadow-2xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
          />
        </div>

        {/* Spacer */}
        <div className="hidden md:block w-[2%]" />

        {/* Right: Content Column */}
        <div className="w-full md:w-[53%]">
          <h1 className="text-2xl text-headingWhite font-bold my-6 mb-2">Privacy Policy</h1>
          <p className="mb-4 text-grayText">
            This Privacy Policy explains how AI Tool Pouch collects, uses, and protects your information when you use our website.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Information We Collect</h2>
          <p className="mb-4 text-grayText">
            We do not collect personal information unless you explicitly provide it (e.g., via contact forms). We use basic analytics tools (such as Google Analytics or Plausible) to understand aggregate site usage.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">How We Use Your Information</h2>
          <p className="mb-4 text-grayText">
            We use non-personal data to improve website performance, content relevance, and user experience.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Third-Party Links</h2>
          <p className="mb-4 text-grayText">
            Our site contains links to external websites, some of which are affiliate partners. We are not responsible for the privacy practices or content of those sites.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Your Rights</h2>
          <p className="mb-4 text-grayText">
            You may request to access, correct, or delete any personal information you've provided. Contact us at [your email address].
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Updates</h2>
          <p className="text-grayText">
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  )
};    