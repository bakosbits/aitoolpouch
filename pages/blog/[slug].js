import { getAllArticles, getArticleBySlug } from "@/lib/airtable";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const records = await getAllArticles();

    const paths = records
        .filter((a) => a.Slug)
        .map((a) => ({
            params: { slug: a.Slug },
        }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const articles = await getAllArticles();
    const article = articles.find((a) => a.Slug === params.Slug);

    return {
        props: {
            ...article,
        },
    };
}

export default function BlogPost({ Title, Summary, Content, Author, Date }) {
    return (
        <div className="px-6 md:px-12 py-12 max-w-4xl mx-auto">
            <SeoHead
                title={Title}
                description={Summary}
                url={`https://aitoolpouch.com/blog/`}
            />
            <article>
                <h1 className="text-2xl font-bold text-white mb-3">{Title}</h1>
                <div className="text-gray-500 text-xs mb-6">
                    By {Author} • {new Date(Date).toLocaleDateString()}
                </div>
                <p className="text-gray-400 italic mb-8">{Summary}</p>
                <hr className="border-gray-700 mb-8" />
                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{Content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
