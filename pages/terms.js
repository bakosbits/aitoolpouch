import React from 'react';

export default function TermsOfUsePage() {

  return (

    <div className="w-[80%] mx-auto py-12">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Column */}
        <div className="w-full md:w-[35%] flex justify-center items-start">
          <img
            src={`/images/image7.jpg`}
            alt="page image"
            className="w-auto h-auto object-cover rounded-lg shadow-2xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
          />
        </div>

        {/* Spacer */}
        <div className="hidden md:block w-[2%]" />

        {/* Right: Content Column */}
        <div className="w-full md:w-[53%]">
          <h1 className="text-2xl text-headingWhite font-bold my-6 mb-2">Terms of Use</h1>
          <p className="mb-4 text-grayText">
            By using AI Tool Pouch, you agree to the following terms and conditions.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Content Accuracy</h2>
          <p className="mb-4 text-grayText">
            We strive to provide accurate and timely information, but we make no guarantees regarding completeness, correctness, or availability of any listings or data on this site.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Use of Site</h2>
          <p className="mb-4 text-grayText">
            You agree to use AI Tool Pouch for lawful purposes only. You may not attempt to gain unauthorized access to any part of the site or use our data for malicious purposes.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Affiliate Disclosure</h2>
          <p className="mb-4 text-grayText">
            Some links on this site may be affiliate links. If you click and make a purchase, we may earn a commission at no additional cost to you.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Limitation of Liability</h2>
          <p className="mb-4 text-grayText">
            We are not liable for any direct or indirect damages resulting from the use of this site or any tools or services listed on it.
          </p>
          <h2 className="text-xl text-headingWhite font-semibold mt-6 mb-2">Changes to These Terms</h2>
          <p className="text-grayText">
            We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of those changes.
          </p>
        </div>
      </div>
    </div>
  )
};    
