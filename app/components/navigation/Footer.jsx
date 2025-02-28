/** @format */

import Link from "next/link";
import { FooterLinks } from "@/app/constants/navigation";

export default function Footer() {
  return (
    <footer className='border-t mt-20'>
      <div className='flex flex-col lg:flex-row justify-between items-center px-6 lg:px-20 py-6 max-w-[1400px] mx-auto gap-4 lg:gap-0'>
        <Link href='/' className='text-xl font-bold'>
          Mindly
        </Link>
        <div className='flex flex-wrap justify-center gap-4 lg:gap-8 text-sm text-gray-600'>
          {FooterLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className='hover:text-gray-900 transition-colors'>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
