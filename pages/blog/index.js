import Link from "next/link";
import { getAllArticles } from "@/lib/airtable";

export async function getStaticProps() {
    const posts = await getAllArticles();
    return {
        props: {
            posts,
        },
        revalidate: 21600,
    };
}

export default function BlogIndex({ posts }) {
    return (
        <div className="w-full max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-headingWhite mb-8">
                Bit by Bit
            </h1>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li
                        key={post.id}
                        className="border border-gray-700 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-2xl font-semibold text-accentGreen hover:underline">
                                {post.title}
                            </h2>
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                            {post.date}
                        </p>
                        {post.summary && (
                            <p className="text-grayText mt-2">{post.summary}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
