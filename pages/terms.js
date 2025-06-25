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

export default function TermsOfUsePage() {

    return (
        <div className="relative z-[10] max-w-4xl mx-auto w-full px-4 py-4">
            <div className="max-w-3xl mx-auto w-full px-4 py-10">
                <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
                <p className="mb-4 text-gray-700">
                    By using AI Tool Pouch, you agree to the following terms and conditions.
                </p>
                <h2 className="text-xl font-semibold mt-4">Content Accuracy</h2>
                <p className="mb-4 text-gray-700">
                    We strive to provide accurate and timely information, but we make no guarantees regarding completeness, correctness, or availability of any listings or data on this site.
                </p>
                <h2 className="text-xl font-semibold mt-4">Use of Site</h2>
                <p className="mb-4 text-gray-700">
                    You agree to use AI Tool Pouch for lawful purposes only. You may not attempt to gain unauthorized access to any part of the site or use our data for malicious purposes.
                </p>
                <h2 className="text-xl font-semibold mt-4">Affiliate Disclosure</h2>
                <p className="mb-4 text-gray-700">
                    Some links on this site may be affiliate links. If you click and make a purchase, we may earn a commission at no additional cost to you.
                </p>
                <h2 className="text-xl font-semibold mt-4">Limitation of Liability</h2>
                <p className="mb-4 text-gray-700">
                    We are not liable for any direct or indirect damages resulting from the use of this site or any tools or services listed on it.
                </p>
                <h2 className="text-xl font-semibold mt-4">Changes to These Terms</h2>
                <p className="text-gray-700">
                    We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of those changes.
                </p>
            </div>
        </div>
    );
}
