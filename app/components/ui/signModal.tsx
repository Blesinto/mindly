/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignModal({ isOpen, onClose }: SignModalProps) {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State for success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const validateEmail = (email: string) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        // Handle Sign In
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Login failed");
        }

        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Close modal and redirect to dashboard
        onClose();
        router.push("/dashboard");
      } else {
        // Handle Sign Up
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        if (formData.password.length < 8) {
          throw new Error("Password must be at least 8 characters long");
        }

        if (!formData.name.trim()) {
          throw new Error("Name is required");
        }

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Sign up failed");
        }

        // Show success message
        setIsSuccess(true);

        // After successful signup, switch to sign in
        setTimeout(() => {
          setIsSignIn(true);
          setFormData((prev) => ({
            ...prev,
            confirmPassword: "",
            name: "",
          }));
          setIsSuccess(false); // Hide success message after 3 seconds
        }, 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      {/* Success Message */}
      {isSuccess && (
        <div className='fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in'>
          Registration successful!
        </div>
      )}

      <div className='bg-white rounded-lg p-4 sm:p-8 w-full max-w-[400px] relative'>
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700'
          aria-label='Close modal'>
          ✕
        </button>

        {/* Logo */}
        <div className='text-center mb-6 sm:mb-8'>
          <h2 className='text-2xl sm:text-3xl font-serif mb-2'>Mindly</h2>
          <p className='text-xs sm:text-sm text-gray-600'>
            {isSignIn
              ? "Inspire Someone by your Stories and Writing"
              : "Show the world your emotions in words."}
          </p>
        </div>

        {error && (
          <div
            role='alert'
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
          {!isSignIn && (
            <div>
              <label className='block text-sm mb-2'>Full Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='John Doe'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
                required={!isSignIn}
              />
            </div>
          )}

          <div>
            <label className='block text-sm mb-2'>Email Address</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='abc@xyz.com'
              className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
              required
            />
          </div>

          <div>
            <label className='block text-sm mb-2'>Password</label>
            <div className='relative'>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='********'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
                required
              />
            </div>
          </div>

          {!isSignIn && (
            <div>
              <label className='block text-sm mb-2'>Confirm Password</label>
              <div className='relative'>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='********'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400'
                  required={!isSignIn}
                />
              </div>
            </div>
          )}

          {isSignIn && (
            <Link
              href='#'
              className='block text-right text-sm text-gray-600 hover:text-gray-800'>
              Forgot Password?
            </Link>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400'
            aria-disabled={loading}>
            {loading ? "Processing..." : isSignIn ? "Sign in" : "Sign up"}
          </button>
        </form>

        {/* Toggle Sign in/up */}
        <div className='text-center mt-4 sm:mt-6'>
          <p className='text-xs sm:text-sm text-gray-600'>
            {isSignIn ? "Don't Have An Account? " : "Already Have An Account? "}
            <button
              type='button'
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError("");
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: "",
                  name: "",
                }));
              }}
              className='text-gray-900 hover:underline font-medium'>
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
