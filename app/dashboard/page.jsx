/** @format */

"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardHeader from "./component/Header";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const justPosted = searchParams.get("posted");
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    postId: null,
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched posts:", data); // Debug log

      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
        console.log("Posts set to state:", data.posts); // Debug log
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  useEffect(() => {
    if (justPosted) {
      alert("Post published successfully!");
      fetchPosts(); // Refresh posts after new post
    }
  }, [justPosted]);

  const handleDeletePost = async (postId) => {
    if (!postId) {
      console.error("Post ID is missing");
      return;
    }

    setDeleteConfirmation({ isOpen: true, postId });
  };

  const confirmDelete = async () => {
    if (!deleteConfirmation.postId) return;

    try {
      const response = await fetch(`/api/post/${deleteConfirmation.postId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post._id !== deleteConfirmation.postId)
        );
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setDeleteConfirmation({ isOpen: false, postId: null });
    }
  };

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
      <DashboardHeader />

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
            {loading ? (
              <div className='flex justify-center items-center h-32'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
              </div>
            ) : posts.length === 0 ? (
              <div className='text-center text-gray-500 py-10'>
                No posts yet. Why not create one?
              </div>
            ) : (
              posts.map((post) => (
                <article
                  key={post._id}
                  className='border-b pb-6 cursor-pointer group'
                  onClick={() => router.push(`/dashboard/blog/${post._id}`)}>
                  {/* Author Info */}
                  <div
                    className='flex items-center space-x-2 mb-4'
                    onClick={(e) => e.stopPropagation()}>
                    <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className='font-medium'>{post.author.name}</h3>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className='group-hover:opacity-90 transition-opacity duration-200'>
                    <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
                    <p className='text-gray-600 mb-4'>
                      {post.description.length > 200
                        ? `${post.description.substring(0, 200)}...`
                        : post.description}
                    </p>
                  </div>

                  {/* Post Meta */}
                  <div
                    className='flex items-center justify-between text-gray-500 text-sm'
                    onClick={(e) => e.stopPropagation()}>
                    <div className='flex items-center space-x-4'>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                        })}
                      </span>
                      <span className='hidden sm:inline'>·</span>
                      <span className='hidden sm:inline'>
                        {post.readingTime}
                      </span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {user?.email === post.author.email && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post._id);
                          }}
                          className='text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200'
                          title='Delete post'>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all scale-100 animate-fade-in'>
            <div className='flex items-center justify-center mb-4'>
              <div className='bg-red-100 rounded-full p-3'>
                <svg
                  className='w-6 h-6 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
            </div>
            <h3 className='text-lg font-medium text-center mb-4'>
              Delete Post?
            </h3>
            <p className='text-sm text-gray-500 text-center mb-6'>
              This action cannot be undone. This will permanently delete your
              post.
            </p>
            <div className='flex justify-center space-x-3'>
              <button
                onClick={() =>
                  setDeleteConfirmation({ isOpen: false, postId: null })
                }
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300'>
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
