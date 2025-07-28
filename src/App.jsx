// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RedirectHandler from './components/RedirectHandler';
import StatsPage from './components/StatsPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
};

export default App;