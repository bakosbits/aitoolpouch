import { getAllArticles } from "@/lib/airtable";

export async function getStaticPaths() {
  const posts = await getAllArticles(); // e.g., from Airtable


  if (!posts || posts.length === 0) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
    const articles = await getAllArticles();
    const article = articles.find((a) => a.slug === params.slug);

    if (!article) {
        console.error("Article not found for slug:", params.slug);
        console.log(
            "Available slugs:",
            articles.map((a) => a.slug),
        );
        return { notFound: true };
    }
    console.log("Found article:", article);
    return {
        props: {
            article: JSON.parse(JSON.stringify(article)),
        },
        revalidate: 21600,
    };
}

export default function ArticlePage({ article }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-headingWhite mb-6">
                {article.title}
            </h1>
            {article.summary && (
                <p className="text-grayText mb-4 italic">{article.summary}</p>
            )}
            <div className="text-grayText whitespace-pre-wrap">
                {article.content}
            </div>
        </div>
    );
}