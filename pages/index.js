import { getAllCategories } from '@/lib/airtable'

export async function getStaticProps() {
  const categories = await getAllCategories()

  return {
    props: {
      categories
    }
  }
}


export default function Home() {
  return (
    <div className="pt-16 flex flex-col px-4 py-4 items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to AI Tool Pouch</h1>
      <p className="text-lg mb-2 text-center">Discover powerful AI tools tailored to your profession.</p>
      <p className="text-base text-gray-600 text-center">Select a category from the menu to get started.</p>
    </div>
  )
}