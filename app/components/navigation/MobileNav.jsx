/** @format */

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { NavLinks } from "@/app/constants/navigation";

export default function MobileNav({ isOpen, setIsOpen, setIsModalOpen }) {
  return (
    <nav className='lg:hidden bg-white shadow-md'>
      <div className='flex justify-between items-center px-6 py-4'>
        <Link href='/' className='text-xl font-bold'>
          Mindly
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-gray-600 hover:text-gray-900 z-50'>
          {isOpen ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className='px-6 py-20'>
          <div className='flex flex-col gap-6'>
            {NavLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className='text-lg hover:text-gray-600 transition-colors transform hover:translate-x-2 duration-200'>
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className='bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-2'>
              Sign in
              <HiArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300'
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
