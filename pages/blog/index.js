import Link from "next/link";
import { getAllArticles } from "@/lib/airtable";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
    const articles = await getAllArticles();
    return {
        props: {
            articles,
        },
        revalidate: 1800,
    };
}

export default function BlogIndex({ articles }) {
    console.log("articles:", articles);
    const validArticles = articles.filter((a) => a?.slug);

    return (
        <>
            <SeoHead
                title={"Insights & Comparisons | AI Tool Pouch Blog"}
                description={
                    "Explore detailed AI tool comparisons, productivity tips, and insights for professionals using the latest AI technologies."
                }
                url={`https://aitoolpouch.com/blog/`}
            />
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-2xl font-bold text-headingWhite mb-8">
                    Bit by Bit
                </h1>
                <ul className="space-y-6">
                    {articles.map((article) => (
                        <li
                            key={article.id}
                            className="border border-gray-700 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <Link href={`/blog/${article.slug}`}>
                                <h1 className="text-xl font-semibold text-accentGreen hover:underline">
                                    {article.Title}
                                </h1>
                            </Link>
                            <p className="text-gray-400 text-xs mt-1">
                                {article.Date}
                            </p>
                            {article.Summary && (
                                <p className="text-grayText mt-2">
                                    {article.Summary}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
