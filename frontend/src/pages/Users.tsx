import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../services/api";
import { ItemList } from "../components/ItemList";
import Pagination from "../components/pagination";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUsers, setCurrentUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const usersPerPage = 10;

  // Load users
  useEffect(() => {
    apiGet<User[]>("/users").then((data) => {
      setUsers(data);
      setCurrentUsers(data.slice(0, usersPerPage));
    });
  }, []);

  async function addUser() {
    const newUser = await apiPost<User>("/users", { name, username, email });
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setName("");
    setUsername("");
    setEmail("");
    setCurrentUsers(updatedUsers.slice(0, usersPerPage)); // reset to first page
  }

  async function deleteUser(id: number) {
    await apiDelete(`/users/${id}`);
    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    setCurrentUsers(updatedUsers.slice(0, usersPerPage));
  }

  const handlePageChange = (page: number) => {
    const start = (page - 1) * usersPerPage;
    setCurrentUsers(users.slice(start, start + usersPerPage));
  };

  return (
    <>
      <ItemList<User>
        title="Users"
        items={currentUsers} // use current page slice
        inputFields={[
          { name: "name", value: name, placeholder: "Name" },
          { name: "username", value: username, placeholder: "Username" },
          { name: "email", value: email, placeholder: "Email" },
        ]}
        onChange={(fieldName, value) => {
          if (fieldName === "name") setName(value);
          if (fieldName === "username") setUsername(value);
          if (fieldName === "email") setEmail(value);
        }}
        renderItem={(user) => (
          <>
            {user.name} ({user.username}) – {user.email}
          </>
        )}
        onAdd={addUser}
        onDelete={deleteUser}
      />

      {/* Pagination */}
      <div className="max-w-6xl mx-auto mt-6">
        <Pagination
          totalPosts={users.length}
          postsPerPage={usersPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
