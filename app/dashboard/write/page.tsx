/** @format */

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
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

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='border-b sticky top-0 bg-white z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link href='/dashboard' className='flex items-center'>
              <h1 className='text-2xl font-serif italic'>Mindly</h1>
            </Link>

            {/* Right Section */}
            <div className='flex items-center space-x-4'>
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

              {/* Profile Dropdown */}
              <div className='relative'>
                <button
                  id='profile-avatar'
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className='flex items-center space-x-2'>
                  <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    id='profile-dropdown'
                    className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border z-50'>
                    <div className='px-4 py-2 border-b'>
                      <p className='text-sm text-gray-600 truncate'>
                        {user?.email}
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

      {/* Main Content */}
      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          {/* Title and Description Inputs */}
          <div className='space-y-2'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='text-4xl font-medium w-full outline-none placeholder-gray-500'
            />
            <input
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='text-xl text-gray-600 w-full outline-none placeholder-gray-400'
            />
          </div>

          {/* Subtext */}
          <p className='text-gray-600 text-lg'>
            Convey those emotions and thoughts.
          </p>

          {/* Editor Toolbar */}
          <div className='flex flex-wrap items-center gap-1 border-t pt-4'>
            <button className='p-2 hover:bg-gray-100 rounded' title='Bold'>
              <span className='font-bold text-sm'>B</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Italic'>
              <span className='italic text-sm'>I</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Underline'>
              <span className='underline text-sm'>U</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Quote'>
              <span className='text-sm'>"</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Strike'>
              <span className='line-through text-sm'>S</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Link'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z' />
              </svg>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Code'>
              <span className='font-mono text-sm'>&lt;&gt;</span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Voice'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z' />
              </svg>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded' title='Add'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
