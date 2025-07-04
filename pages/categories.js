// pages/categories.js
import { getAllCategories } from "@/lib/airtable";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";

export async function getStaticProps() {
    const categories = await getAllCategories();

    if (!Array.isArray(categories) || categories.length === 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            categories,
        },
        revalidate: 21600,
    };
}

export default function CategoriesPage({ categories }) {
    return (
        <>
            <SeoHead
                title={`AI Tool Categories`}
                description={"Top AI Tools Broken Down By Category"}
                url={`https://aitoolpouch.com/categories/`}
            />
            <div className="max-w-6xl mx-auto">
                <div className="w-full flex justify-between items-center border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                    <h1 className="text-3xl text-headingWhite font-bold">
                        Explore Our Categories
                    </h1>
                </div>

                <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...categories]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="block border border-gray-700 p-6 rounded-lg bg-cardDark hover:bg-gray-800 transition-colors"
                            >
                                <h2 className="text-lg text-accentGreen hover:text-headingWhite font-bold mb-2">
                                    {cat.name}
                                </h2>
                                <p className=" text-grayText">
                                    {cat.description}
                                </p>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
}
