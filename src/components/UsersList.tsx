// src/components/UsersList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';
import UserForm from './UserForm';
import { useAuth } from '../AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

const UsersList: React.FC = () => {
  const { jwt } = useAuth();
  const [users, setUsers] = useState<User[]>([]); // List of users
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Current user for editing

  useEffect(() => {
    if (jwt) {
      // Fetch all users from the API when the component loads
      axios.get(`${apiUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => {
          console.log("Fetched users:", response.data.data); // Log response data to confirm it matches expectations
          setUsers(response.data.data);
        })
        .catch((error) => console.error('Error fetching users:', error));
    }
  }, [jwt, currentUser]); // Re-fetch users when currentUser changes (after create/edit)

  const handleEdit = (user: User): void => {
    setCurrentUser(user);
  };

  const handleDelete = (userId: string): void => {
    if (jwt) {
      axios.delete(`${apiUrl}/auth/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then(() => {
          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((error) => console.error('Error deleting user:', error));
    }
  };

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <UserForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </div>
  );
};

export default UsersList;
