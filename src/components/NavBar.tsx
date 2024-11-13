import React from 'react';

interface NavBarProps {
  onSelectList: (listType: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSelectList }) => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <button onClick={() => onSelectList('users')}>Users</button>
      <button onClick={() => onSelectList('categories')}>Categories</button>
      <button onClick={() => onSelectList('produce')}>Products</button>
      <button onClick={() => onSelectList('cutouts')}>Cutouts</button>
    </nav>
  );
};

export default NavBar;
