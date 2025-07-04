import { getAllArticles, getArticleBySlug } from "@/lib/airtable";
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const records = await getAllArticles();

    const paths = records
        .filter((a) => a.slug)
        .map((a) => ({
            params: { slug: a.slug },
        }));

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    const articles = await getAllArticles();
    const article = articles.find((a) => a.slug === params.slug);

    return {
        props: {
            ...article,
        },
    };
}


export default function BlogPost({ title, summary, content, author, date }) {
    return (
        <div className="px-6 md:px-12 py-12 max-w-4xl mx-auto">
            <SeoHead
                title={title}
                description={summary}
                url={`https://aitoolpouch.com/blog/`}
            />
            <article>
                <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
                <div className="text-gray-500 text-sm mb-6">
                By {author} • {new Date(date).toLocaleDateString()}
                </div>
                <p className="text-lg text-gray-400 italic mb-8">{summary}</p>
                <hr className="border-gray-700 mb-8" />                
                <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}