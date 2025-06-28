import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between  px-20 py-20">

      {/* Left: Text centered in its own div */}
      <div className="md:w-[60%] w-full flex text-center">
        <div className="w-full mt-[10%]">
          <h1 className="text-headingWhite text-3xl md:text-4xl font-bold mb-4">
            Welcome to The AI Tool Pouch
          </h1>
          <p className="text-grayText">There is an endless sea of AI driven tools in the market today.</p>
          <p className="text-grayText">Do you need to reseaerch tools that can increase your productivity?</p>
          <p className="text-grayText">You don't have to fumble throught endless feature lists anymore.</p>
          <p className="text-grayText">We're here to help you quickly select the right tool for your project.</p>
          <h1 className="text-headingWhite text-xl md:text-xl font-bold mt-4 mb-4">
            Discover powerful AI tools tailored to your profession.
          </h1>
          <p className="text-grayText">We'll show you a manageble list of tools to choose from.</p>
          <p className="text-grayText">We'll show you detailed side by side comparisons.</p>
          <p className="text-grayText">We'll show you <strong>who</strong> each one is for.</p>
          <p className="text-grayText">We'll show you <strong>what</strong> each one does.</p>
          <p className="text-grayText">We'll show you <strong>why</strong> each one should matter.</p>
          <p className="text-grayText">We'll provide links so you know <strong>where</strong> to get each one.</p>
          
          <p className="text-grayText mt-4 mb-4"><strong>- so act now -</strong></p>
          
          <p className="text-grayText">Stop fumbling through feature lists.</p>
          <p className="text-grayText">You can quickly determine which tools belong in your tool pouch.</p>
          <p className="text-grayText">Select from one of our
            <Link href="/categories" className="text-accentGreen hover:text-headingWhite transition"> categories </Link>
            to get started.
          </p>
        </div>
      </div>

      {/* Right: Image aligned right */}
      <div className="md:w-[40%] w-full flex justify-end pr-12 md:pr-12">
        <img
          src="/images/image1.jpg"
          alt="AI illustration"
          className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"


        />
      </div>
    </div>
  )
}
