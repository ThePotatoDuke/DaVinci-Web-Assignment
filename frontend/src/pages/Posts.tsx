import { useEffect, useState } from "react";
import { ItemList } from "../components/ItemList";
import { apiDelete, apiGet, apiPost } from "../services/api";
import type { Post } from "../types";
import Pagination from "../components/pagination";

export default function Posts({ currentUserId }: { currentUserId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const postsPerPage = 10;

  // Load posts
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
      userId: currentUserId,
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
    setCurrentPosts(updatedPosts.slice(0, postsPerPage));
  }

  const handlePageChange = (page: number) => {
    const start = (page - 1) * postsPerPage;
    setCurrentPosts(posts.slice(start, start + postsPerPage));
  };

  return (
    <>
      <ItemList<Post>
        title="Posts"
        items={currentPosts}
        inputFields={[{ name: "title", value: title, placeholder: "Title" }]}
        onChange={(fieldName, value) => {
          if (fieldName === "title") setTitle(value);
        }}
        onAdd={addPost}
        onDelete={deletePost}
        renderItem={(p) => (
          <span className="font-medium">
            {p.title}{" "}
            <span className="text-sm text-gray-400">(User {p.userId})</span>
          </span>
        )}
      />

      <div className="max-w-6xl mx-auto mt-6">
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
