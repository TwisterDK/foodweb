import React, { useState } from 'react';

interface NavBarProps {
  onSelectList: (listType: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSelectList }) => {
  const [language, setLanguage] = useState<'en' | 'da'>('en');

  const labels = {
    en: {
      users: 'Users',
      categories: 'Categories',
      produce: 'Products',
      cutouts: 'Cutouts',
      conversionFactors: 'Conversion Factors',
      logout: 'Logout',
    },
    da: {
      users: 'Brugere',
      categories: 'Kategorier',
      produce: 'Produkter',
      cutouts: 'Udskæringer',
      conversionFactors: 'Omregningsfaktorer',
      logout: 'Log ud',
    },
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(language === 'en' ? 'Are you sure you want to log out?' : 'Er du sikker på, at du vil logge ud?');
    if (confirmLogout) {
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <button onClick={() => onSelectList('users')}>{labels[language].users}</button>
        <button onClick={() => onSelectList('categories')}>{labels[language].categories}</button>
        <button onClick={() => onSelectList('produce')}>{labels[language].produce}</button>
        <button onClick={() => onSelectList('cutouts')}>{labels[language].cutouts}</button>
        <button onClick={() => onSelectList('conversionFactors')}>{labels[language].conversionFactors}</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value as 'en' | 'da')} 
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="en">English</option>
          <option value="da">Dansk</option>
        </select>
        <button 
          onClick={handleLogout} 
          style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
        >
          {labels[language].logout}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;


// import React from 'react';

// interface NavBarProps {
//   onSelectList: (listType: string) => void;
// }

// const NavBar: React.FC<NavBarProps> = ({ onSelectList }) => {
//   const handleLogout = () => {
//     const confirmLogout = window.confirm('Are you sure you want to log out?'); // Confirmation dialog
//     if (confirmLogout) {
//       localStorage.removeItem('jwt'); // Clear the JWT token
//       window.location.href = '/login'; // Redirect to login page
//     }
//   };

//   return (
//     <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
//       <div>
//         <button onClick={() => onSelectList('users')}>Users</button>
//         <button onClick={() => onSelectList('categories')}>Categories</button>
//         <button onClick={() => onSelectList('produce')}>Products</button>
//         <button onClick={() => onSelectList('cutouts')}>Cutouts</button>
//         <button onClick={() => onSelectList('conversionFactors')}>Conversion Factors</button>
//       </div>
//       <button 
//         onClick={handleLogout} 
//         style={{ marginLeft: 'auto', backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer' }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default NavBar;
