/** @format */

"use client";
import { useState } from "react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import SignModal from "./components/ui/signModal";
import { Scheherazade_New } from "next/font/google";
import MobileNav from "./components/navigation/MobileNav";
import DesktopNav from "./components/navigation/DesktopNav";
import Footer from "./components/navigation/Footer";

const scheherazade = Scheherazade_New({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated] = useState(false);

  return (
    <div className='min-h-screen font-[family-name:var(--font-geist-sans)]'>
      {/* Desktop Navigation */}
      <DesktopNav
        setIsModalOpen={setIsModalOpen}
        isAuthenticated={isAuthenticated}
      />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Hero Section */}
      <main className='px-6 lg:px-[2rem] py-10 lg:py-20 max-w-[1400px] mx-auto'>
        <div className='flex flex-col lg:flex-row items-center gap-8 justify-between'>
          {/* Left side - Illustration */}
          <div className='w-full lg:w-[55%] order-2 lg:order-1'>
            <Image
              src='/hero-img.png'
              alt='People interacting with letters'
              width={600}
              height={600}
              priority
              className='w-full h-auto'
            />
          </div>

          {/* Right side - Text content */}
          <div className='w-full lg:w-[40%] flex flex-col items-center lg:items-end order-1 lg:order-2'>
            <div className='w-full lg:w-[80%] text-center lg:text-right'>
              <h1
                className={`text-4xl lg:text-6xl font-bold leading-tight ${scheherazade.className}`}>
                Unveil Thoughts Voice Yours
                <hr className='mt-8 border-gray-900 border-t-2' />
              </h1>
            </div>
            <p className='text-gray-500 text-lg lg:text-xl py-5 text-center lg:text-right'>
              Place Where Your Stories Meet Others Emotions.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-gray-900 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full hover:bg-gray-700 transition-colors flex items-center gap-3 text-base lg:text-lg'>
              Get Started
              <HiArrowRight className='w-5 lg:w-6 h-5 lg:h-6' />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      <SignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
