import React from 'react';
import Link from 'next/link';

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
    // components/NavBar.tsx
      <Link href="/">InsightAgent</Link>
      <Link href="/upload">Upload</Link>
      <Link href="/results">Results</Link>
    </nav>
  )
}

export default NavBar