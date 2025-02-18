/** @format */

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("profile-dropdown");
      const avatar = document.getElementById("profile-avatar");
      if (
        dropdown &&
        avatar &&
        !dropdown.contains(event.target as Node) &&
        !avatar.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='border-b sticky top-0 bg-white z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link href='/dashboard' className='flex items-center'>
              <h1 className='text-2xl font-serif'>Mindly</h1>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className='hidden md:block flex-1 max-w-2xl mx-8'>
              <div className='relative'>
                <input
                  type='search'
                  placeholder="Search 'Traveling'"
                  className='w-full px-4 py-2 bg-gray-50 rounded-full border focus:outline-none focus:ring-1 focus:ring-gray-200'
                />
                <button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className='flex items-center space-x-2 sm:space-x-4'>
              {/* Write Button - Text hidden on mobile */}
              <button className='flex items-center space-x-0 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
                <span className='hidden sm:inline'>Write</span>
              </button>

              <button className='text-gray-700 hover:bg-gray-100 p-2 rounded-full'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              <div className='relative'>
                <button
                  id='profile-avatar'
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className='flex items-center space-x-2'>
                  <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    id='profile-dropdown'
                    className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border z-50'>
                    <div className='px-4 py-2 border-b'>
                      <p className='text-sm text-gray-600 truncate'>
                        {user.email}
                      </p>
                    </div>

                    <div className='py-1'>
                      <button className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                          />
                        </svg>
                        <span>Profile</span>
                      </button>

                      <button className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                        <span>Your Post</span>
                      </button>

                      <button className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                          />
                        </svg>
                        <span>Stats</span>
                      </button>

                      <button className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className='border-t'>
                      <button
                        onClick={() => {
                          localStorage.removeItem("userData");
                          router.push("/");
                        }}
                        className='px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left flex items-center space-x-2'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search - Visible only on mobile */}
      <div className='md:hidden p-4 bg-white border-b'>
        <div className='relative'>
          <input
            type='search'
            placeholder="Search 'Traveling'"
            className='w-full px-4 py-2 bg-gray-50 rounded-full border focus:outline-none focus:ring-1 focus:ring-gray-200'
          />
          <button className='absolute right-3 top-1/2 transform -translate-y-1/2'>
            <svg
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-b'>
          <nav className='px-4 py-3 space-y-2'>
            <button className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
              Following
            </button>
            <button className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
              Trending
            </button>
            <button className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
              Artificial Intelligence
            </button>
            <button className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
              Hollywood Happen
            </button>
            <button className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'>
              Horoscope
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Navigation - Hidden on mobile */}
        <nav className='hidden md:flex items-center space-x-6 mb-8 overflow-x-auto'>
          <button className='p-2 rounded-full hover:bg-gray-100 flex-shrink-0'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 4v16m8-8H4'
              />
            </svg>
          </button>
          <button className='text-gray-600 hover:text-gray-900 whitespace-nowrap'>
            Following
          </button>
          <button className='text-gray-600 hover:text-gray-900 whitespace-nowrap'>
            Trending
          </button>
          <button className='text-gray-600 hover:text-gray-900 whitespace-nowrap'>
            Artificial Intelligence
          </button>
          <button className='text-gray-600 hover:text-gray-900 whitespace-nowrap'>
            Hollywood Happen
          </button>
          <button className='text-gray-600 hover:text-gray-900 whitespace-nowrap'>
            Horoscope
          </button>
        </nav>

        {/* Content Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Main Content Area */}
          <div className='md:col-span-2 space-y-6'>
            {/* Sample Post */}
            <article className='border-b pb-6'>
              <div className='flex items-center space-x-2 mb-4'>
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                  R
                </div>
                <div>
                  <h3 className='font-medium'>Reena Chaturvedi</h3>
                </div>
              </div>
              <h2 className='text-xl font-bold mb-2'>
                Why Most Programmer Burnt Out After the Age of 40
              </h2>
              <p className='text-gray-600 mb-4'>
                I've been programming since I was 14. It started as a hobby and
                eventually became my profession.
              </p>
              <div className='flex items-center justify-between text-gray-500 text-sm'>
                <div className='flex items-center space-x-4'>
                  <span>2 days ago</span>
                  <span className='hidden sm:inline'>·</span>
                  <span className='hidden sm:inline'>5 min read</span>
                </div>
                <button className='hover:text-gray-700'>
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
                    />
                  </svg>
                </button>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className='space-y-6 hidden md:block'>
            <section>
              <h2 className='font-bold mb-4'>Recommended Title</h2>
              <div className='flex flex-wrap gap-2'>
                <span className='px-3 py-1 bg-gray-50 rounded-full text-sm'>
                  Artificial Intelligence
                </span>
                <span className='px-3 py-1 bg-gray-50 rounded-full text-sm'>
                  Work Life
                </span>
                <span className='px-3 py-1 bg-gray-50 rounded-full text-sm'>
                  New Fashion
                </span>
                <span className='px-3 py-1 bg-gray-50 rounded-full text-sm'>
                  Traveling
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
