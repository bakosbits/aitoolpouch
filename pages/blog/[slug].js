import { getAllArticles, getArticleBySlug } from "@/lib/airtable";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const articles = await getAllArticles();

    const paths = articles
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
    if (!params?.slug) {
        return { notFound: true };
    }

    const post = await getArticleBySlug(params.slug);
    if (!post) {
        return { notFound: true };
    }

    return {
        props: { post },
    };
}

export default function BlogPost({ post }) {
    if (!post) return <p>Post not found.</p>;

    return (
        <>
            <SeoHead
                title={`${post.title}`}
                description={`${post.title}`}
                url={`https://aitoolpouch.com/${post.Title}/`}
            />

            <article className="prose">
                <h1>{post.title}</h1>
                <div>{post.content}</div>
            </article>
        </>
    );
}
