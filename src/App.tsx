import React, { useState } from 'react';
import NavBar from './components/NavBar';
import UsersList from './components/UsersList';
import ListComponent from './components/ListComponent';

const App: React.FC = () => {
  const [selectedList, setSelectedList] = useState<string>('users');

  const handleSelectList = (listType: string) => {
    setSelectedList(listType);
  };

  return (
    <div>
      <NavBar onSelectList={handleSelectList} />
      <div style={{ padding: '20px' }}>
        {selectedList === 'users' && <UsersList />}
        {/* {selectedList === 'categories' && <CategoriesList />} */}
        {selectedList === 'categories' && <ListComponent type="categories" />}  
        {selectedList === 'produce' && <ListComponent type="produce" />}  
        {selectedList === 'cutouts' && <ListComponent type="cutouts" />}  
      </div>
    </div>
  );
};

export default App;
