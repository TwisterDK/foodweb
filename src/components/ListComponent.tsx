import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const apiUrl = process.env.REACT_APP_API_URL;

interface ListProps {
  type: 'categories' | 'users' | 'produce' | 'cutouts';
}

const ListComponent: React.FC<ListProps> = ({ type }) => {
  const { jwt } = useAuth();
  const [data, setData] = useState<{ id: string; name: string }[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editItemValue, setEditItemValue] = useState<string>('');

  const fetchData = () => {
    if (!jwt) return;

    axios.get(`${apiUrl}/api/${type}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(response => {
        console.log("Fetched", type, ":", response.data.data);
        setData(response.data.data);
      })
      .catch(error => console.error(`Error fetching ${type}:`, error));
  };

  useEffect(() => {
    fetchData();
  }, [type, jwt]);

  const handleCreate = () => {
    if (!newItem || !jwt) return;
  
    // Check for duplicates in the local `data` state
    const isDuplicate = data.some(item => item.name.toLowerCase() === newItem.toLowerCase());
    if (isDuplicate) {
      alert(`"${newItem}" already exists in the list.`);
      return;
    }
  
    // Proceed with API call if no duplicates
    axios.post(`${apiUrl}/api/${type}`, { name: newItem }, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(response => {
        setData(prevData => [...prevData, response.data.item]);
        setNewItem('');
      })
      .catch(error => {
        console.error(`Error creating ${type}:`, error);
        // Handle error response for uniqueness constraint (if backend returns one)
        if (error.response && error.response.status === 400) {
          alert(`"${newItem}" already exists (server validation).`);
        }
      });
  };

  const handleEdit = (item: { id: string; name: string }) => {
    setEditItemId(item.id);
    setEditItemValue(item.name);
  };

  const handleSaveEdit = () => {
    if (!editItemValue || !editItemId || !jwt) return;

    axios.put(`${apiUrl}/api/${type}/${editItemId}`, { name: editItemValue }, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(() => {
        setData(prevData =>
          prevData.map(item => item.id === editItemId ? { ...item, name: editItemValue } : item)
        );
        setEditItemId(null);
        setEditItemValue('');
      })
      .catch(error => console.error(`Error updating ${type}:`, error));
  };

  const handleDelete = (itemId: string) => {
    if (!jwt) return;

    axios.delete(`${apiUrl}/api/${type}/${itemId}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(() => {
        setData(prevData => prevData.filter(item => item.id !== itemId));
      })
      .catch(error => console.error(`Error deleting ${type}:`, error));
  };

  // Handler to check for Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} List</h2>

      {/* Create Form */}
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, handleCreate)}
          placeholder={`New ${type}`}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Edit Form */}
      {editItemId && (
        <div>
          <input
            type="text"
            value={editItemValue}
            onChange={(e) => setEditItemValue(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, handleSaveEdit)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditItemId(null)}>Cancel</button>
        </div>
      )}

      {/* List */}
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;