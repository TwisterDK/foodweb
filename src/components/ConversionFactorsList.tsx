import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { ConversionFactors } from '../types';

const apiUrl = process.env.REACT_APP_API_URL;

const ConversionFactorsList: React.FC = () => {
  const { jwt } = useAuth();
  const [data, setData] = useState<ConversionFactors[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [produce, setProduce] = useState<any[]>([]);
  const [cutouts, setCutouts] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ Category: '', Produce: '', Cutout: '', ConversionFactor: '' });

  // Fetch data including conversion factors and foreign keys
  const fetchData = () => {
    axios.get(`${apiUrl}/api/conversionFactors`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then(response => {
        console.log("Conversion Factors Data:", response.data);
        setData(response.data.data); // This response now contains both id and name
      })
      .catch(error => console.error('Error fetching conversion factors:', error));

    // Fetch categories, produce, and cutouts for selection options
    axios.get(`${apiUrl}/api/categories`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(response => setCategories(response.data.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get(`${apiUrl}/api/produce`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(response => setProduce(response.data.data))
      .catch(error => console.error('Error fetching produce:', error));

    axios.get(`${apiUrl}/api/cutouts`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(response => setCutouts(response.data.data))
      .catch(error => console.error('Error fetching cutouts:', error));
  };

  useEffect(() => {
    fetchData();
  }, [jwt]);

  // Handle new conversion factor creation
  const handleCreate = () => {
    if (!newItem.Category || !newItem.Produce || !newItem.Cutout || !newItem.ConversionFactor) {
      alert('All fields are required.');
      return;
    }
  
    // Check for duplicates based on Category, Produce, and Cutout
    const isDuplicate = data.some(item =>
      item.Category.id === newItem.Category &&
      item.Produce.id === newItem.Produce &&
      item.Cutout.id === newItem.Cutout
    );
  
    if (isDuplicate) {
      alert('This combination of Category, Produce, and Cutout already exists.');
      return;
    }
  
    // Proceed with API call if no duplicates
    const newConversionFactor = {
      Category: { id: newItem.Category }, // Send ID only when creating
      Produce: { id: newItem.Produce },
      Cutout: { id: newItem.Cutout },
      ConversionFactor: parseFloat(newItem.ConversionFactor),
    };
  
    axios.post(`${apiUrl}/api/conversionFactors`, newConversionFactor, { headers: { Authorization: `Bearer ${jwt}` } })
      .then(response => {
        // Assuming the response contains the full object with names for Category, Produce, and Cutout
        const createdFactor = response.data;
        setData(prevData => [...prevData, createdFactor]); // Add the complete factor with names to the list
        setNewItem({ Category: '', Produce: '', Cutout: '', ConversionFactor: '' });
      })
      .catch(error => {
        console.error('Error creating conversion factor:', error);
        if (error.response && error.response.status === 400) {
          alert('Duplicate conversion factor detected on the server.');
        }
      });
  };
  

  return (
    <div>
      <h2>Conversion Factors</h2>

      {/* Create Form */}
      <div>
        <select value={newItem.Category} onChange={(e) => setNewItem({ ...newItem, Category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        <select value={newItem.Produce} onChange={(e) => setNewItem({ ...newItem, Produce: e.target.value })}>
          <option value="">Select Produce</option>
          {produce.map(prod => (
            <option key={prod.id} value={prod.id}>{prod.name}</option>
          ))}
        </select>

        <select value={newItem.Cutout} onChange={(e) => setNewItem({ ...newItem, Cutout: e.target.value })}>
          <option value="">Select Cutout</option>
          {cutouts.map(cut => (
            <option key={cut.id} value={cut.id}>{cut.name}</option>
          ))}
        </select>

        <input
          type="number"
          value={newItem.ConversionFactor}
          onChange={(e) => setNewItem({ ...newItem, ConversionFactor: e.target.value })}
          placeholder="Conversion Factor"
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* List */}
      <ul>
        {data.length === 0 ? (
          <p>No conversion factors available. Please add some!</p>
        ) : (
          data.map(item => (
            <li key={item.id}>
              <strong>Category:</strong> {item.Category?.name || 'Unknown'},
              <strong> Produce:</strong> {item.Produce?.name || 'Unknown'},
              <strong> Cutout:</strong> {item.Cutout?.name || 'Unknown'},
              <strong> Factor:</strong> {item.ConversionFactor}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ConversionFactorsList;
