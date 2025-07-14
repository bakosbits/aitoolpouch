import { getAllArticles, getArticleBySlug } from "@/lib/airtable";
import ReactMarkdown from 'react-markdown'
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const articles = await getAllArticles();
    const paths = articles.map((article) => ({
        params: { slug: article.Slug },
    }));
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    const articles = await getAllArticles();
    const article = articles.find((a) => a.Slug === params.slug);
    if (!article) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            title: article.Title,
            summary: article.Summary,
            content: article.Content,
            author: article.Author,
            date: article.Date,
        },
    };
}


export default function BlogPost({ title, summary, content, author, date }) {
    return (
        <>
            <SeoHead
                title={title}
                description={summary}
                image={null} // Add image if available
                url={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
            <div className="px-6 md:px-12 py-12 max-w-4xl mx-auto">


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
        </>
    );
}
