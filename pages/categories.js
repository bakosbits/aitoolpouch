// pages/categories.js
import { getAllCategories } from "@/lib/airtable";
import Link from "next/link";

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
        <div className="w-[80%] mx-auto py-12">
            <div className="flex flex-col md:flex-row items-start gap-y-12 lg:gap-x-12">

                {/* Left: Image Column */}
                <div className="w-full md:w-[35%] flex justify-center items-start">
                    <img
                        src="/images/wrench1.webp"
                        style={{
                            filter: "saturate(110%) brightness(.85) contrast(1)",
                        }}
                        alt="AI Wrenches"
                        className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                    />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[2%]" />

                {/* Right: Content Column */}
                <div className="w-full md:w-[53%]">
                    <h1 className="text-3xl text-headingWhite font-bold mt-6 mb-8 ">
                        Explore Our Categories
                    </h1>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...categories]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/category/${cat.slug}`}
                                className="block bg-cardDark p-6 rounded-md"
                            >
                                <h2 className="text-lg text-accentGreen hover:text-headingWhite font-bold">
                                    {cat.name}
                                </h2>
                                <p className=" text-grayText mt-1">
                                    {cat.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
