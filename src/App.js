import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// pages
import Products from './pages/Products/Products';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar />
          {/* Add routes here */}
          <div className="pages">
            <Routes>
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
