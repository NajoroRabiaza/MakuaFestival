import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BilletteriePage from './pages/BilletteriePage';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/billetterie" element={<BilletteriePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
