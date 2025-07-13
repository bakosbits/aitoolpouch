import Link from "next/link";
import { getAllTools, getFeaturedTools } from "@/lib/airtable";
import SearchBar from "@/components/SearchBar";
import MiniToolCard from "@/components/MiniToolCard";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
    const tools = await getAllTools();
    const featuredTools = await getFeaturedTools();


    const newestTools = tools
        .filter((tool) => !!tool.Created)
        .sort((a, b) => new Date(b.Created) - new Date(a.Created))
        .slice(0, 8);

    const latestTools = newestTools.sort((a, b) =>
        a.Name.localeCompare(b.Name),
    );

    return {
        props: {
            tools,
            latestTools,
            featuredTools,
        },
        revalidate: 300,
    };
}

export default function Home({ tools, latestTools, featuredTools }) {
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
                <div className="w-full md:w-[60%] mt-[0%] md:mt-[5%] flex justify-center">
                    {/* INNER WRAPPER: 60% of left column, padded on mobile */}
                    <div className="w-full md:w-[80%] text-left flex flex-col">
                        <div>
                            <h1 className="text-headingWhite text-3xl font-bold mb-4">
                                Welcome!
                            </h1>
                            <p className="text-grayText mb-2">
                                You can't help but notice the endless sea of AI
                                driven tools in the market today. It's no
                                surprise that many of us end up feeling
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
                            <h1 className="text-headingWhite text-xl font-bold mb-4">
                                Discover powerful AI tools tailored to your
                                profession.
                            </h1>
                            <p className="text-grayText mb-5">
                                We'll show you a manageable list of tools to
                                choose from. From there you'll have access to
                                relevant details for each tool in your target
                                category. You can conduct side-by-side
                                comparisons to help you narrow down your search
                                to something that best fits your needs. We
                                answer the who, what and why so you can quickly
                                determine which tools belong in your tool pouch.
                                To jumpstart your selection process choose from
                                one of our
                                <Link
                                    href="/categories"
                                    className="text-accentGreen hover:text-headingWhite transition"
                                >
                                    {" "}
                                    categories{" "}
                                </Link>
                                to get started.
                            </p>
                            <h1 className="text-headingWhite text-xl font-bold mb-6">
                                Hot Topics:
                            </h1>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {featuredTools.map((tool) => (
                                    <Link
                                        href={`/tool/${tool.Slug}`}
                                        className="block h-full group" // Added 'group' class for potential group-hover styling
                                        passHref // Ensures the href is passed to the underlying <a> tag for proper SEO and accessibility
                                    >
                                        <img
                                            key={tool.Slug}
                                            src={`https://cdn.brandfetch.io/${tool.Domain}/icon?c=1id03xd53EDa-VjPpgF`}
                                            alt={`${tool.Name} logo`}
                                            className="w-[180px] h-[180px] object-contain rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                {/* Right column: Search + Newest */}
                <div className="w-full md:w-[40%]">
                    <div className="w-full md:w-[80%]">
                        <div className="mb-6">
                            <SearchBar tools={tools} />
                        </div>
                        <h1 className="text-headingWhite text-xl font-bold mb-4">
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
