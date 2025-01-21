
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const fetchUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    await axios.post('/api/users', newUser);
    setNewUser({ name: '', email: '' });
    fetchUsers();
  };

  const updateUser = async (id: string, updatedUser: Partial<User>) => {
    await axios.put(`/api/users/${id}`, updatedUser);
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2" onClick={addUser}>
          Add User
        </button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white p-2 mr-2"
                  onClick={() => updateUser(user.id, { name: 'Updated Name' })}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white p-2"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

// Dockerfile for Frontend
// File: Dockerfile
/*FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]*/




