/** @format */

"use client";
import DashboardHeader from "../dashboard/component/Header";

export default function Write() {
  return (
    <div className='min-h-screen bg-white'>
      <DashboardHeader hideWriteButton={true} hideSearchBar={false} />

      <main className='max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8'>
        <div className='space-y-6 sm:space-y-8'>
          <h1 className='text-4xl font-bold mb-6'>Write</h1>
          {/* Add your writing interface here */}
          write
        </div>
      </main>
    </div>
  );
}
