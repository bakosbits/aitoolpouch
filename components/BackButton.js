// components/BackButton.js
import { useRouter } from 'next/router';

export default function BackButton({ className = '' }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center text-accentGreen hover:text-headingWhite transition font-medium ${className}`}
    >
      <svg
        className="w-4 h-4 mr-1 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M10 0 L11.4 1.4 4.8 8H20v2H4.8l6.6 6.6L10 20 0 10z" />
      </svg>
      Back
    </button>
  );
}
