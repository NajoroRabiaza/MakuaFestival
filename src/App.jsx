import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BilletteriePage from './pages/BilletteriePage';
import HebergementPage from './pages/HebergementPage';
import ScrollToTop from './components/ScrollToTop'; // 👈 IMPORT
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/billetterie" element={<BilletteriePage />} />
        <Route path="/hebergement" element={<HebergementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;