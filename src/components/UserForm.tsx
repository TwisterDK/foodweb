import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Role } from '../types'; // Import Role enum
import { useAuth } from '../AuthContext'; // Import useAuth hook

interface UserFormProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const apiUrl = process.env.REACT_APP_API_URL;

const UserForm: React.FC<UserFormProps> = ({ currentUser, setCurrentUser }) => {
  const { jwt } = useAuth(); // Get JWT from AuthContext
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Added password state
  const [role, setRole] = useState<Role>(Role.User); // Updated role state to use Role enum

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPassword(''); // Clear password field for security
      setRole(currentUser.role as Role); // Cast role to Role enum
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const user = { name, email, password, role }; // Include password and role

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    if (currentUser) {
      // Update existing user
      axios.put(`${apiUrl}/auth/users/${currentUser.id}`, user, config)
        .then(() => {
          setCurrentUser(null); // Clear the form after update
        })
        .catch((error) => console.error('Error updating user:', error));
    } else {
      // Create new user
      axios.post(`${apiUrl}/auth/signup`, user, config)
        .then(() => {
          setName('');
          setEmail('');
          setPassword(''); // Clear password field after creation
          setRole(Role.User); // Reset role to default
        })
        .catch((error) => console.error('Error creating user:', error));
    }
  };

  return (
    <div>
      <h3>{currentUser ? 'Edit User' : 'Create User'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            required
          >
            <option value={Role.Administrator}>Administrator</option>
            <option value={Role.User}>User</option>
          </select>
        </div>
        <button type="submit">{currentUser ? 'Update' : 'Create'}</button>
        {currentUser && (
          <button type="button" onClick={() => setCurrentUser(null)}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
