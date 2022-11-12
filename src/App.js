import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// pages
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import { useSelector } from 'react-redux';

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
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
