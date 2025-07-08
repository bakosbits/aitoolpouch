import Link from "next/link";
import { getAllTools } from "@/lib/airtable";
import SearchBar from "@/components/SearchBar";
import MiniToolCard from "@/components/MiniToolCard";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
    const tools = await getAllTools();

    const newestTools = tools
        .filter(tool => !!tool.Created)
        .sort((a, b) => new Date(b.Created) - new Date(a.Created))
        .slice(0, 6);

    const latestTools = newestTools.sort((a, b) => a.Name.localeCompare(b.Name));

    return {
        props: {
            tools,
            latestTools,
        },
        revalidate: 1800,
    };
}

export default function Home({ tools, latestTools }) {
    return (
        <>
            <SeoHead
                title={`AI Tool Pouch`}
                description={
                    "Discover top AI tools for professionals and creators. Filter by role, compare features, and find the tools that fit your workflow"
                }
                url={`https://aitoolpouch.com/`}
            />
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-full w-[90%] mx-auto flex flex-col md:flex-row gap-8">
                {/* LEFT COLUMN: 60% of outer container */}
                <div className="w-full md:w-[60%] pt-[0%] md:pt-[5%] flex justify-center">
                    {/* INNER WRAPPER: 60% of left column, padded on mobile */}
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
                            <h1 className="text-headingWhite text-xl md:text-xl font-bold mb-4">
                                Discover powerful AI tools tailored to your
                                profession.
                            </h1>
                            <p className="text-grayText">
                                We'll show you a manageable list of tools to
                                choose from. From there you'll have access to
                                relevant details for each tool in your target
                                category. You can conduct side-by-side
                                comparisons to help you narrow down your search
                                to something that best fits your needs. We answer
                                the who, what and why so you can quickly determine
                                which tools belong in your tool pouch. To jumpstart 
                                your selection process choose from one of our
                                <Link
                                    href="/categories"
                                    className="text-accentGreen hover:text-headingWhite transition"
                                >
                                    {" "}
                                    categories{" "}
                                </Link>
                                to get started.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right column: image */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[80%]">
                        <div className="mb-6">
                            <SearchBar tools={tools} />
                        </div>
                            <h1 className="text-headingWhite text-xl md:text-xl font-bold mb-4">
                                Latest Additions:
                            </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {latestTools.map((tool) => (
                                <MiniToolCard key={tool.Slug} tool={tool} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}