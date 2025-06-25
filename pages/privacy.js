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
    <div className="relative z-[10] max-w-4xl mx-auto w-full px-4 py-4">
      <div className="max-w-3xl mx-auto w-full px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          This Privacy Policy explains how AI Tool Pouch collects, uses, and protects your information when you use our website.
        </p>
        <h2 className="text-xl font-semibold mt-4">Information We Collect</h2>
        <p className="mb-4 text-gray-700">
          We do not collect personal information unless you explicitly provide it (e.g., via contact forms). We use basic analytics tools (such as Google Analytics or Plausible) to understand aggregate site usage.
        </p>
        <h2 className="text-xl font-semibold mt-4">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">
          We use non-personal data to improve website performance, content relevance, and user experience.
        </p>
        <h2 className="text-xl font-semibold mt-4">Third-Party Links</h2>
        <p className="mb-4 text-gray-700">
          Our site contains links to external websites, some of which are affiliate partners. We are not responsible for the privacy practices or content of those sites.
        </p>
        <h2 className="text-xl font-semibold mt-4">Your Rights</h2>
        <p className="mb-4 text-gray-700">
          You may request to access, correct, or delete any personal information you've provided. Contact us at [your email address].
        </p>
        <h2 className="text-xl font-semibold mt-4">Updates</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.
        </p>
      </div>
    </div>
  );
}
