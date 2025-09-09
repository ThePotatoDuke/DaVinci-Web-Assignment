// src/pages/Home.tsx
import { Link } from "react-router-dom";
import HomeImage from "../assets/467810203_10235491965109835_9064352264537950060_n.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Hero section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 max-w-6xl w-full">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-6 text-indigo-400">
            Welcome to DaVinci
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Manage users and posts with ease. Click below to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <Link
              to="/users"
              className="px-8 py-6 bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg text-center transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-2">Users</h2>
              <p className="text-gray-200">View and manage all users</p>
            </Link>

            <Link
              to="/posts"
              className="px-8 py-6 bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg text-center transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-bold mb-2">Posts</h2>
              <p className="text-gray-200">View and manage all posts</p>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src={HomeImage}
            alt="DaVinci"
            className="rounded-2xl shadow-xl object-cover w-full max-w-md mx-auto"
          />
        </div>
      </div>

      <footer className="mt-16 text-gray-500">
        © 2025 DaVinci. All rights reserved.
      </footer>
    </div>
  );
}
