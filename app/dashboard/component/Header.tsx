/** @format */

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  lastLogin: string;
}

interface HeaderProps {
  hideWriteButton?: boolean;
  hideSearchBar?: boolean;
}

export default function DashboardHeader({
  hideWriteButton = false,
  hideSearchBar = false,
}: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(userData));
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

  if (!user) return null;

  return (
    <>
      <header className='border-b sticky top-0 bg-white z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link href='/dashboard' className='flex items-center'>
              <h1 className='text-2xl font-serif'>Mindly</h1>
            </Link>

            {/* Search Bar - Hidden on mobile and conditionally rendered */}
            {!hideSearchBar && (
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
            )}

            {/* Right Section */}
            <div className='flex items-center space-x-2 sm:space-x-4'>
              {/* Write Button - Conditionally rendered */}
              {!hideWriteButton && (
                <Link
                  href='/dashboard/write'
                  className='flex items-center space-x-0 sm:space-x-2 px-2 sm:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full'>
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
                </Link>
              )}

              {/* Notifications Button */}
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

      {/* Mobile Search - Conditionally rendered */}
      {!hideSearchBar && (
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
      )}

      {/* Mobile Menu - Sliding from left */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden'
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sliding Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            {/* Menu Header */}
            <div className='flex items-center justify-between p-4 border-b'>
              <h2 className='text-xl font-semibold'>Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='p-2 hover:bg-gray-100 rounded-full'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className='px-4 py-6 space-y-2'>
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

            {/* User Section at Bottom */}
            <div className='absolute bottom-0 left-0 right-0 p-4 border-t'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className='font-medium'>{user?.name}</p>
                  <p className='text-sm text-gray-600'>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
