import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BilletteriePage from './pages/BilletteriePage';
import HebergementPage from './pages/HebergementPage';
import NotFoundPage from './pages/NotFoundPage';
import MyLineupPage from './pages/MyLineupPage';
import ScrollToTop from './components/ScrollToTop';
import { LineupProvider } from './contexts/LineupContext';
import './styles/App.css';

function App() {
  return (
    <LineupProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/billetterie" element={<BilletteriePage />} />
          <Route path="/hebergement" element={<HebergementPage />} />
          <Route path="/my-lineup" element={<MyLineupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LineupProvider>
  );
}

export default App;