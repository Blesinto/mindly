/** @format */

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { NavLinks } from "@/app/constants/navigation";

export default function DesktopNav({ setIsModalOpen, isAuthenticated }) {
  return (
    <nav className='hidden lg:flex justify-between items-center px-20 py-6 shadow-md bg-white'>
      <Link href='/' className='text-2xl font-bold'>
        Mindly
      </Link>
      <div className='flex gap-12 items-center'>
        {NavLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className='hover:text-gray-600 transition-colors'>
            {link.label}
          </Link>
        ))}
        {isAuthenticated && (
          <Link
            href='/dashboard'
            className='hover:text-gray-600 transition-colors'>
            Dashboard
          </Link>
        )}
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-gray-900 text-white px-8 py-2.5 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2'>
          Register
          <HiArrowRight className='w-4 h-4' />
        </button>
      </div>
    </nav>
  );
}
