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
                description={"Top AI Tools. AI tools for all professions"}
                url={`https://aitoolpouch.com/categories/`}
            />
            <div className="max-w-6xl mx-auto">
                <div className="w-full flex  grid grid-cols-1 justify-between items-center mb-4">
                    <h1 className="text-2xl text-headingWhite font-bold mb-4">
                        Explore Our Categories
                    </h1>
                    <p className="text-grayText mb-4">Each category below contains a listing of top AI tools best suited for the category. 
                        We find that grouping these tools by profession helps the end user quickly understand
                        they types of use cases it handles best. Once you've selected a category you can get detail 
                        on individual tools or compare two side-by-side to compare and contrast.
                    </p> 
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
                                <h1 className="text-xl text-accentGreen hover:text-headingWhite font-bold mb-2">
                                    {cat.name}
                                </h1>
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
