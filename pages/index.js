import Link from "next/link";
import { getAllTools } from "@/lib/airtable";
import SearchBar from "@/components/SearchBar";
import SeoHead from "@/components/SeoHead";

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
        <>
            <SeoHead
                title={`AI Tool Pouch`}
                description={
                    "Discover top AI tools for professionals and creators. Filter by role, compare features, and find the tools that fit your workflow"
                }
                url={`https://aitoolpouch.com/`}
            />
            // OUTER WRAPPER: 90% of screen width, centered
            <div className="w-full w-[90%] mx-auto flex flex-col md:flex-row gap-8">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] pt-[0%] md:pt-[5%] flex justify-center">
                    {/* INNER WRAPPER: 80% of left column, padded on mobile */}
                    <div className="w-full md:w-[60%] text-left flex flex-col">
                        <div>
                            <h1 className="text-headingWhite text-3xl md:text-4xl font-bold mb-4">
                                Welcome
                            </h1>
                            <p className="text-grayText mb-2">
                                You can't help but notice the endless sea of AI
                                driven tools in the market today. It's no
                                suprise that many of us end up feeling
                                overwhelmed when deciding on the right AI tool.
                            </p>
                            <p className="text-grayText mb-4">
                                Are you new to AI? Maybe you have a project with
                                increased productivity goals and you're not sure
                                where to start? You don't have to fumble through
                                countless feature lists to find a solution. We
                                hope you find our information to be laid out in
                                a format that enables you to make quick, well
                                informed choices.
                            </p>
                            <h1 className="text-headingWhite text-xl md:text-xl font-bold">
                                Discover powerful AI tools tailored to your
                                profession.
                            </h1>
                            <p className="text-grayText mb-4">
                                We'll show you a manageable list of tools to
                                choose from. From there you'll have access to
                                relevant details for each tool in your target
                                category. You can conduct side-by-side
                                comparisons to help you narrow down your search
                                to something that best fits your needs. Here
                                you'll find answers to three key questions:
                            </p>
                            <ul className="text-grayText mb-4">
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
                            <p className="text-grayText mb-2">
                                You can quickly determine which tools belong in
                                your tool pouch. Select from one of our
                                <Link
                                    href="/categories"
                                    className="text-accentGreen hover:text-headingWhite transition"
                                >
                                    {" "}
                                    categories{" "}
                                </Link>
                                to get started.
                            </p>
                            <p className="text-grayText mb-2">
                                ...or search for a tool that you already had in
                                mind:
                            </p>
                        </div>

                        {/* Bottom text block */}
                        <div mb-4>
                            <SearchBar tools={tools} />
                        </div>
                    </div>
                </div>

                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[80%]">
                        <img
                            src="/images/wrench1.webp"
                            style={{
                                filter: "saturate(110%) brightness(0.95) contrast(1)",
                            }}
                            alt="AI Wrenches"
                            className="w-auto h-auto object-cover rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
