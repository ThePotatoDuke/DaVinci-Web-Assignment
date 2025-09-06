import { useEffect, useState } from "react";
import type { User } from "../types";
import { apiDelete, apiGet, apiPost } from "../services/api";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  useEffect(() => {
    apiGet<User[]>("/users").then(setUsers);
  }, []);

  async function addUser() {
    const newUser = await apiPost<User>("/users", {
      name,
      username: name.toLowerCase(),
      email: `${name}@test.com`,
    });
    setUsers((prev) => [...prev, newUser]);
    setName("");
  }

  async function deleteUser(id: number) {
    await apiDelete(`/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div>
      <h2>Users</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.username}) – {u.email}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
