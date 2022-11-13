import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';

function App() {
  const {logged} = useSelector(state => state.auth)

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar />
          {/* Add routes here */}
          <div className="pages">
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={!logged ? <Login /> : <Navigate to="/"/>} />
              <Route path="/register" element={!logged ? <Register /> : <Navigate to="/"/>} />
              <Route path="/profile" element={logged ? <Profile /> : <Navigate to="/" />} />
              <Route path="/change_password" element={logged ? <ChangePassword /> : <Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
