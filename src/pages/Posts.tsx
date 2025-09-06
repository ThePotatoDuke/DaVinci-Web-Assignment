import { useEffect, useState } from "react";
import type { Post } from "../types";
import { apiDelete, apiGet, apiPost } from "../services/api";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Pagination from "../components/pagination";

export default function Posts({ currentUserId }: { currentUserId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const postsPerPage = 10;

  useEffect(() => {
    apiGet<Post[]>("/posts").then((data) => {
      setPosts(data);
      setCurrentPosts(data.slice(0, postsPerPage)); // show first page
    });
  }, []);

  async function addPost() {
    const newPost = await apiPost<Post>("/posts", {
      title,
      body: "sample body",
      userId: currentUserId, // use selected user ID
    });
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setTitle("");
    setCurrentPosts(updatedPosts.slice(0, postsPerPage)); // reset to first page
  }

  async function deletePost(id: number) {
    await apiDelete(`/posts/${id}`);
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);
    // update current page slice
    setCurrentPosts(updatedPosts.slice(0, postsPerPage));
  }

  const handlePageChange = (page: number) => {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    setCurrentPosts(posts.slice(start, end));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-400">Posts</h2>

      {/* Input for new post title */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."
          className="flex-1 border border-gray-700 bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addPost}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Post
          <PlusCircleIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Post list */}
      <ul className="space-y-3">
        {currentPosts.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-xl shadow-md hover:bg-gray-700 transition"
          >
            <span className="font-medium">
              {p.title}{" "}
              <span className="text-sm text-gray-400">(User {p.userId})</span>
            </span>
            <button
              onClick={() => deletePost(p.id)}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
