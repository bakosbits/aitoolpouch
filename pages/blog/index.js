import Link from "next/link";
import { getAllArticles } from "@/lib/airtable";

export async function getStaticProps() {
    const articles = await getAllArticles();
    return {
        props: {
            articles,
        },
        revalidate: 21600,
    };
}

export default function BlogIndex({ articles }) {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-headingWhite mb-8">
                Bit by Bit
            </h1>
            <ul className="space-y-6">
                {articles.map((article) => (
                    <li
                        key={article.id}
                        className="border border-gray-700 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Link href={`/blog/${article.slug}`}>
                            <h2 className="text-2xl font-semibold text-accentGreen hover:underline">
                                {article.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                            {article.date}
                        </p>
                        {article.summary && (
                            <p className="text-grayText mt-2">
                                {article.summary}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div> 
    );
}
