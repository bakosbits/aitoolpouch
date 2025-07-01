import Link from "next/link";
import { getAllTools } from "@/lib/airtable";
import SearchBar from "@/components/SearchBar";

export async function getStaticProps() {
    const tools = await getAllTools();

    return {
        props: {
            tools,
        },
        revalidate: 21600,
    };
}

export default function Home({ tools }) {
    return (
        // Full-page wrapper with background
        <div className="w-full px-4 sm:px-8 md:px-20 py-12">
            <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row items-start gap-y-12 lg:gap-x-12">
                {/* Left Column: Text */}
                <div className="w-full lg:w-1/2 flex justify-center px-2">
                    <div className="w-full lg:w-[85%] max-w-none lg:mt-[8%] text-left">
                        <h1 className="text-headingWhite text-3xl md:text-4xl font-bold mb-4">
                            Welcome
                        </h1>
                        <p className="text-grayText mb-4">
                            You can't help but notice the endless sea of AI
                            driven tools in the market today. It's no suprise
                            that many of us end up feeling overwhelmed when
                            deciding on the right AI tool.
                        </p>
                        <p className="text-grayText">
                            Are you new to AI? Maybe you have a project with
                            increased productivity goals and you're not sure
                            where to start? You don't have to fumble through
                            countless feature lists to find a solution. We hope
                            you find our information to be laid out in a format
                            that enables you to make quick, well informed
                            choices.
                        </p>
                        <h1 className="text-headingWhite text-xl md:text-xl font-bold mt-6 mb-4">
                            Discover powerful AI tools tailored to your
                            profession.
                        </h1>
                        <p className="text-grayText mb-4">
                            We'll show you a manageable list of tools to choose
                            from. From there you'll have access to relevant
                            details for each tool in your target category. You
                            can conduct side-by-side comparisons to help you
                            narrow down your search to something that best fits
                            your needs. Here you'll find answers to three key
                            questions:
                        </p>
                        <ul className="text-grayText">
                            <li>
                                1. <strong>Who</strong> is it for?
                            </li>
                            <li>
                                2. <strong>What</strong> does it do?
                            </li>
                            <li>
                                3. <strong>Why</strong> does it matter?
                            </li>
                        </ul>

                        <p className="text-grayText mt-6 mb-4">
                            Stop fumbling through feature lists. You can quickly
                            determine which tools belong in your tool pouch.
                            Select from one of our
                            <Link
                                href="/categories"
                                className="text-accentGreen hover:text-headingWhite transition"
                            >
                                {" "}
                                categories{" "}
                            </Link>
                            to get started.
                        </p>
                        <p className="text-grayText mt-6 mb-4">
                            ...or search for a tool that you already had in
                            mind:
                        </p>

                        <div className="w-[85%] lg:w-[100%] text-left mt-6 mb-4">
                            <SearchBar tools={tools} />
                        </div>
                    </div>
                </div>

                {/* Right: Image aligned right */}
                <div className="w-full lg:w-1/2 flex justify-center px-2">
                    <div className="w-full max-w-full lg:max-w-[600px]">
                        <img
                            src="/images/toolbox.webp"
                            style={{
                                transform: "scaleX(-1)",
                                filter: "saturate(110%) brightness(0.95) contrast(1)",
                            }}
                            alt="AI Wrenches"
                            className="object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
