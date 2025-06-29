import Link from 'next/link';
import { getAllTools } from '@/lib/airtable';
import { useState } from 'react';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const tools = await getAllTools();

  return {
    props: {
      tools,
    },
  };
}

export default function Home({ tools }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // ✅ Added: guard to prevent crashing if tools is undefined
  const handleSearch = (e) => {
    e.preventDefault();

    if (!Array.isArray(tools)) {
      return;
    }

    const normalized = query.trim().toLowerCase().replace(/\s+/g, '');
    
    const match = tools.find(
      (tool) =>
        tool.Name?.toLowerCase().replace(/\s+/g, '') === normalized ||
        tool.Slug?.toLowerCase() === normalized
    );

    console.log('Match found:', match);  

    if (match) {
      router.push(`/tool/${match.Slug}`);
    } else {
      router.push('/404');
    }
  };

  // ✅ Optional: fail-safe for display if tools are missing
  if (!Array.isArray(tools)) {
    return (
      <div className="p-8 text-red-500 text-xl">
        Error loading tools. Please try refreshing or check your Airtable config.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between  px-20 py-20">

      {/* Left: Text centered in its own div */}
      <div className="md:w-[60%] w-full flex text-center">
        <div className="w-full mt-[10%]">
          <h1 className="text-headingWhite text-3xl md:text-4xl font-bold mb-4">
            Welcome to The AI Tool Pouch
          </h1>
          <p className="text-grayText">There is an endless sea of AI driven tools in the market today.</p>
          <p className="text-grayText">Do you need to research tools that can increase your productivity?</p>
          <p className="text-grayText">You don't have to fumble through endless feature lists anymore.</p>
          <p className="text-grayText">We're here to help you quickly select the right tool for your project.</p>
          <h1 className="text-headingWhite text-xl md:text-xl font-bold mt-4 mb-4">
            Discover powerful AI tools tailored to your profession.
          </h1>
          <p className="text-grayText">We'll show you a manageable list of tools to choose from.</p>
          <p className="text-grayText">We'll show you detailed side by side comparisons.</p>
          <p className="text-grayText">We'll show you <strong>who</strong> each one is for.</p>
          <p className="text-grayText">We'll show you <strong>what</strong> each one does.</p>
          <p className="text-grayText">We'll show you <strong>why</strong> each one should matter.</p>
          <p className="text-grayText">We'll provide links so you know <strong>where</strong> to get each one.</p>

          <p className="text-grayText mt-4 mb-4"><strong>- so act now -</strong></p>

          <p className="text-grayText">Stop fumbling through feature lists.</p>
          <p className="text-grayText">You can quickly determine which tools belong in your tool pouch.</p>
          <p className="text-grayText mb-4">
            Select from one of our
            <Link href="/categories" className="text-accentGreen hover:text-headingWhite transition"> categories </Link>
            to get started.
          </p>
          <p className="text-grayText mt- mb-6"><strong>- or -</strong></p>

            {/* ✅ Search Bar Form wired to tool/[slug] */}
            <form onSubmit={handleSearch} className="w-full max-w-md mx-auto py=12">
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a tool..."
                    className="w-full px-4 py-2 rounded-md bg-backgroundDark text-whiteHeading placeholder-text-whiteHeading border border-accentGreen"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 bg-accentGreen rounded-md hover:bg-green-400 transition"
                  aria-label="Search"
                >
                  <svg
                    className="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
        </div>
      </div>
      < br />
      < br />
      {/* Right: Image aligned right */}
      <div className="w-full md:w-[40%] flex justify-center">
        <img
          src="/images/wrench1.jpg" 
          style= {{ transform: 'scaleX(-1)', filter: 'grayscale(.7) saturate(110%) brightness(0.95) contrast(0.98)' }}
          alt="AI Wrenches"
          className="object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
        />
      </div>
    </div>
  );
}
