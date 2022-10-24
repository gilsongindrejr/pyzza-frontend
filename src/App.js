import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Navbar />
          {/* Add routes here */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
