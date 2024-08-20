import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Inventory Manager
        </Link>
        <div>
          <Link href="/reparations" className="text-white mr-4">
            Reparations
          </Link>
          <Link href="/products" className="text-white">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;