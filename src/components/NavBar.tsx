import React from 'react';

interface NavBarProps {
  onSelectList: (listType: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSelectList }) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?'); // Confirmation dialog
    if (confirmLogout) {
      localStorage.removeItem('jwt'); // Clear the JWT token
      window.location.href = '/login'; // Redirect to login page
    }
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <button onClick={() => onSelectList('users')}>Users</button>
        <button onClick={() => onSelectList('categories')}>Categories</button>
        <button onClick={() => onSelectList('produce')}>Products</button>
        <button onClick={() => onSelectList('cutouts')}>Cutouts</button>
        <button onClick={() => onSelectList('conversionFactors')}>Conversion Factors</button>
      </div>
      <button 
        onClick={handleLogout} 
        style={{ marginLeft: 'auto', backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
