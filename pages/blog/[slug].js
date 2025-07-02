import { getAllArticles } from "@/lib/airtable";

export async function getStaticPaths() {
  const posts = await getAllArticles();

    if (!posts || posts.length === 0) {
        return {
        paths: [],
        fallback: false // or 'blocking' if preferred
    };
}

  const paths = posts && posts.length
    ? posts.map((post) => ({ params: { slug: post.slug } }))
    : [];

    console.log('🛠 Blog paths being built:', paths)

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const posts = await getAllArticles();
    const post = posts.find((a) => a.slug === params.slug);

    if (!post) {
        console.error("Article not found for slug:", params.slug);
        console.log(
            "Available slugs:",
            posts.map((a) => a.slug),
        );
        return { notFound: true };
    }
    console.log("Found post:", post);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
        },
        revalidate: 21600,
    };
}

export default function ArticlePage({ post }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-headingWhite mb-6">
                {post.title}
            </h1>
            {post.summary && (
                <p className="text-grayText mb-4 italic">{post.summary}</p>
            )}
            <div className="text-grayText whitespace-pre-wrap">
                {post.content}
            </div>
        </div>
    );
}