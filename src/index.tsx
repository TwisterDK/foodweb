import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, useAuth } from './AuthContext';

const RootComponent: React.FC = () => {
  const { jwt, setJwt } = useAuth();

  useEffect(() => {
    // Check on every load if the JWT is expired
    if (!jwt) {
      localStorage.removeItem('jwt'); // Clear any expired or invalid token
    }
  }, [jwt]);

  const handleLoginSuccess = (jwt: string) => {
    setJwt(jwt);
  };

  return (
    <React.StrictMode>
      {jwt ? <App /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <RootComponent />
  </AuthProvider>
);

reportWebVitals();


// // src/index.tsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Login from './components/Login';
// import reportWebVitals from './reportWebVitals';
// import { AuthProvider, useAuth } from './AuthContext';

// const RootComponent: React.FC = () => {
//   const { jwt, setJwt } = useAuth();

//   const handleLoginSuccess = (jwt: string) => {
//     setJwt(jwt);
//   };

//   return (
//     <React.StrictMode>
//       {jwt ? <App /> : <Login onLoginSuccess={handleLoginSuccess} />}
//     </React.StrictMode>
//   );
// };

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <AuthProvider>
//     <RootComponent />
//   </AuthProvider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
//   );
//   root.render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     );
    
//     // If you want to start measuring performance in your app, pass a function
//     // to log results (for example: reportWebVitals(console.log))
//     // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//     reportWebVitals();