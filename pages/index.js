import Link from "next/link";
import { getAllTools } from "@/lib/airtable";
import SearchBar from "@/components/SearchBar";

export async function getStaticProps() {
    const tools = await getAllTools();

    return {
        props: {
            tools,
        },
    };
}

export default function Home({ tools }) {
    return (
        <div className="w-full flex flex-col md:flex-row items-start justify-between px-4 sm:px-8 md:px-20 py-12 md:py-20">
            {/* Left: Text centered in its own div */}
            <div className="md:w-[60%] w-full flex text-center">
                <div className="w-full mt-[5%]">
                    <h1 className="text-headingWhite text-3xl md:text-4xl font-bold mb-4">
                        Welcome to The AI Tool Pouch
                    </h1>
                    <p className="text-grayText">
                        There is an endless sea of AI driven tools in the market
                        today.
                    </p>
                    <p className="text-grayText">
                        Are you new to AI? Maybe you have a project with
                        increased productivity goals?
                    </p>
                    <p className="text-grayText">
                        You don't have to fumble through countless feature lists
                        to find a solution.
                    </p>
                    <p className="text-grayText">
                        We'll present information in a way that enables quick,
                        well informed choices.
                    </p>
                    <h1 className="text-headingWhite text-xl md:text-xl font-bold mt-4 mb-4">
                        Discover powerful AI tools tailored to your profession.
                    </h1>
                    <p className="text-grayText">
                        We'll show you a manageable list of tools to choose
                        from.
                    </p>
                    <p className="text-grayText">
                        We'll show you detailed side by side comparisons.
                    </p>
                    <p className="text-grayText">
                        We'll show you <strong>who</strong> each one is for.
                    </p>
                    <p className="text-grayText">
                        We'll show you <strong>what</strong> each one does.
                    </p>
                    <p className="text-grayText">
                        We'll show you <strong>why</strong> each one should
                        matter.
                    </p>
                    <p className="text-grayText">
                        We'll link back to he vendor so you know{" "}
                        <strong>where</strong> to get each one.
                    </p>

                    <p className="text-grayText mt-4 mb-4">
                        <strong>- so act now -</strong>
                    </p>

                    <p className="text-grayText">
                        Stop fumbling through feature lists.
                    </p>
                    <p className="text-grayText">
                        You can quickly determine which tools belong in your
                        tool pouch.
                    </p>
                    <p className="text-grayText mb-4">
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
                    <p className="text-grayText mt- mb-6">
                        <strong>- or -</strong>
                    </p>

                    {/* Search Bar Form wired to tool/[slug] */}
                    <SearchBar tools={tools} />
                </div>
            </div>
            <br />
            <br />
            {/* Right: Image aligned right */}
            <div className="w-full md:w-[40%] flex justify-center">
                <img
                    src="/images/wrench1.jpg"
                    style={{
                        transform: "scaleX(-1)",
                        filter: "grayscale(.7) saturate(110%) brightness(0.95) contrast(0.98)",
                    }}
                    alt="AI Wrenches"
                    className="object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                />
            </div>
        </div>
    );
}
