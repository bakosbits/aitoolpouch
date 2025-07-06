import { useRouter } from "next/router";
import { getAllTools, getAllCategories } from "@/lib/airtable";
import ToolDetailCard from "@/components/ToolDetailCard";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const tools = await getAllTools();

    const paths = tools.map((tool) => ({
        params: { slug: tool.Slug.toLowerCase() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const tools = await getAllTools();

    const tool = tools.find((t) => t.Slug.toLowerCase() === params.slug);

    return {
        props: {
            tool,
        },
        revalidate: 21600,
    };
}

export default function ToolPage({ tool }) {
    const categoriesList = Array.isArray(tool.Categories)
        ? tool.Categories
        : [];

    return (
        <>
            <SeoHead
                title={`${tool.Name}`}
                description={`Detailed Information about ${tool.Name}`}
                url={`https://aitoolpouch.com/tool/${tool.Name}/`}
            />
            {/* OUTER WRAPPER: 80% of screen width, centered */}
            <div className="w-[80%] mx-auto flex flex-col md:flex-row">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start">
                    {/* LEFT COLUMN: 100% of outer container */}
                    <div className="w-full flex justify-center">
                        {/* INNER WRAPPER: 90% of left column, padded on mobile */}
                        <div className="w-full md:w-[90%] px-4 sm:px-6 md:px-0 text-left flex flex-col">
                            <div className="w-full flex justify-between items-center border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                                <h1 className="text-3xl text-headingWhite font-bold ">
                                    Reviewing {tool.Name}
                                </h1>
                                <BackButton />
                            </div>
                            <div>
                                <ToolDetailCard tool={tool} />
                            </div>
                        </div>
                    </div>

                    {/* Right column: image + categories stacked */}
                    <div className="w-full md:w-[20%] flex flex-col items-left text-left">
                        <img
                            src={tool.Logo}
                            alt={tool.Name}
                            className="w-auto object-contain rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)] mb-4"
                        />

                        <h2 className="text-xl font-bold text-headingWhite mb-2">
                            Found in:
                        </h2>
                        <p className="text-left">
                            {""}
                            {tool.Categories && tool.Categories.length > 0
                                ? tool.Categories.map((cat, idx) => (
                                      <span key={cat.slug || cat.name}>
                                          <Link
                                              href={`/category/${cat.slug || cat.name.toLowerCase()}`}
                                              className="text-left text-accentGreen hover:text-headingWhite"
                                          >
                                              {cat.name}
                                          </Link>
                                          {idx < tool.Categories.length - 1
                                              ? ", "
                                              : ""}
                                      </span>
                                  ))
                                : "Uncategorized"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
