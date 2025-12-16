import { useEffect, useState } from "react";
import type { User } from "../../interfaces/User.interface";
export default function Utilisateurs() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log("Error while try to get user data " + err));
  }, []);

  return (
    <>
      <h2>Utilisateurs</h2>

      <table>
        <tbody>
          <tr>
            <th>Nom</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {users.map((user) => (
            <tr>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
