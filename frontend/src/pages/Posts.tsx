import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../services/api";
import { ItemList } from "../components/ItemList";
import Pagination from "../components/Pagination";
import type { Post } from "../types";

type User = {
  id: number;
  username: string;
};

type PostWithUser = Post & { username?: string };

export default function Posts() {
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [title, setTitle] = useState("");
  const [currentUserId, setCurrentUserID] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [users, setUsers] = useState<User[]>([]);

  // Fetch users
  useEffect(() => {
    apiGet<User[]>("/users").then((data) => setUsers(data));
  }, []);

  // Fetch posts and attach usernames
  useEffect(() => {
    apiGet<Post[]>("/posts").then((data) => {
      const postsWithUsernames = data.map((p) => {
        const user = users.find((u) => u.id === p.userId);
        return { ...p, username: user?.username };
      });
      setPosts(postsWithUsernames);
    });
  }, [users]); // wait until users are loaded

  // Compute posts for current page
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  async function addPost() {
    const newPost = await apiPost<Post>("/posts", {
      title,
      body: "sample body",
      userId: currentUserId,
    });

    // Attach username
    const user = users.find((u) => u.id === currentUserId);
    const newPostWithUser: PostWithUser = {
      ...newPost,
      username: user?.username,
    };

    const updatedPosts = [...posts, newPostWithUser];
    setPosts(updatedPosts);
    setTitle("");

    // Navigate to last page
    const totalPages = Math.ceil(updatedPosts.length / postsPerPage);
    setCurrentPage(totalPages);
  }

  async function deletePost(id: number) {
    await apiDelete(`/posts/${id}`);
    const updatedPosts = posts.filter((p) => p.id !== id);
    setPosts(updatedPosts);

    // Adjust page if current page is now empty
    const totalPages = Math.ceil(updatedPosts.length / postsPerPage);
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <ItemList<PostWithUser>
        title="Posts"
        items={currentPosts}
        inputFields={[
          { name: "title", value: title, placeholder: "Title" },
          {
            name: "userID",
            value: currentUserId,
            placeholder: "User ID",
            type: "number",
          },
        ]}
        onChange={(fieldName, value) => {
          if (fieldName === "title") setTitle(String(value));
          if (fieldName === "userID") setCurrentUserID(Number(value));
        }}
        renderItem={(p) => (
          <span className="font-medium">
            {p.title}{" "}
            <span className="text-sm text-gray-400">
              ({p.username ?? p.userId})
            </span>
          </span>
        )}
        onAdd={() => {
          if (!currentUserId || currentUserId <= 0) {
            alert("Please select a valid user before adding a post.");
            return;
          }

          const userExists = users.some((u) => u.id === currentUserId);
          if (!userExists) {
            alert(`User with ID ${currentUserId} does not exist.`);
            return;
          }

          addPost();
        }}
        onDelete={deletePost}
      />

      <div className="max-w-6xl mx-auto mt-6">
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
