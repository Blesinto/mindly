/** @format */

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import DashboardHeader from "../../component/Header";

interface Post {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    email: string;
    profileImage?: string;
  };
  formattedDate: string;
  readTime: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/post/${params.postId}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.postId) {
      fetchPost();
    }
  }, [params.postId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className='min-h-screen bg-white'>
      <DashboardHeader />

      {/* Main container with responsive padding */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
        {/* Author info and stats bar - Responsive layout */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 border-b pb-4'>
          <div className='flex items-center space-x-4 mb-4 sm:mb-0'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0'>
              {post.author.profileImage ? (
                <Image
                  src={post.author.profileImage}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className='rounded-full'
                />
              ) : (
                <span className='text-lg sm:text-xl font-bold'>
                  {post.author.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h2 className='font-medium text-sm sm:text-base'>
                {post.author.name}
              </h2>
              <div className='flex flex-wrap items-center text-xs sm:text-sm text-gray-600 gap-2'>
                <span>{post.formattedDate}</span>
                <span className='hidden sm:inline'>·</span>
                <span>{post.readTime}</span>
                <span className='hidden sm:inline'>·</span>
                <span>{post.stats.views} views</span>
              </div>
            </div>
          </div>

          {/* Social sharing and actions - Responsive spacing */}
          <div className='flex items-center space-x-3 sm:space-x-4'>
            <button className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'>
              <svg
                className='w-4 h-4 sm:w-5 sm:h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                />
              </svg>
            </button>
            <button className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'>
              <svg
                className='w-4 h-4 sm:w-5 sm:h-5'
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
        </div>

        {/* Title and content - Responsive typography */}
        <article className='prose prose-sm sm:prose lg:prose-lg max-w-none'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6'>
            {post.title}
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8'>
            {post.description}
          </p>
          <div
            className='mt-6 sm:mt-8'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Engagement footer - Responsive layout */}
        <footer className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex items-center space-x-4 sm:space-x-8'>
              <button className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors'>
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
                <span className='text-sm sm:text-base'>{post.stats.likes}</span>
              </button>
              <button className='flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 py-2 transition-colors'>
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  />
                </svg>
                <span className='text-sm sm:text-base'>
                  {post.stats.comments}
                </span>
              </button>
            </div>
            <div className='flex items-center'>
              <button className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors'>
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
