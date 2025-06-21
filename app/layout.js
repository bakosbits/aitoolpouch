export const metadata = {
  title: 'AI Tool Pouch',
  description: 'Discover the best AI tools, organized by profession and use case.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
