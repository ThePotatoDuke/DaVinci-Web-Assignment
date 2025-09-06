import { useEffect, useState } from "react";
import type { Post } from "../types";
import { apiDelete, apiGet, apiPost } from "../services/api";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  useEffect(() => {
    apiGet<Post[]>("/posts").then(setPosts);
  }, []);

  async function addPost() {
    const newPost = await apiPost<Post>("/posts", {
      title,
      body: "sample body",
      userId: 1,
    });
    setPosts((prev) => [...prev, newPost]);
    setTitle("");
  }

  async function deletePost(id: number) {
    await apiDelete(`/posts/${id}`);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h2>Posts</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button onClick={addPost}>Add Post</button>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} (User {p.userId})
            <button onClick={() => deletePost(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
