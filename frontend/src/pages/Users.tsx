import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../services/api";
import { ItemList } from "../components/ItemList";
import Pagination from "../components/Pagination";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Load users
  useEffect(() => {
    apiGet<User[]>("/users").then((data) => setUsers(data));
  }, []);

  // Compute users to show on current page
  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  async function addUser() {
    const newUser = await apiPost<User>("/users", { name, username, email });
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setName("");
    setUsername("");
    setEmail("");

    // Navigate to last page
    const totalPages = Math.ceil(updatedUsers.length / usersPerPage);
    setCurrentPage(totalPages);
  }

  async function deleteUser(id: number) {
    await apiDelete(`/users/${id}`);
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);

    // Adjust page if current page is now empty
    const totalPages = Math.ceil(updatedUsers.length / usersPerPage);
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }

  return (
    <>
      <ItemList<User>
        title="Users"
        items={currentUsers}
        inputFields={[
          { name: "name", value: name, placeholder: "Name" },
          { name: "username", value: username, placeholder: "Username" },
          { name: "email", value: email, placeholder: "Email" },
        ]}
        onChange={(fieldName, value) => {
          if (fieldName === "name") setName(String(value));
          if (fieldName === "username") setUsername(String(value));
          if (fieldName === "email") setEmail(String(value));
        }}
        renderItem={(user) => (
          <>
            {user.name} ({user.username}) – {user.email} – id: {user.id}
          </>
        )}
        onAdd={addUser}
        onDelete={deleteUser}
      />

      <div className="max-w-6xl mx-auto mt-6">
        <Pagination
          totalPosts={users.length} // or posts.length
          postsPerPage={usersPerPage} // or postsPerPage
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
