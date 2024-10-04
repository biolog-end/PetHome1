import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, matchPath } from 'react-router-dom';

import Header from './components/Pages/Header';
import Footer from './components/Pages/Footer';
import MainPage from './components/Pages/MainPage';
import About from './components/Pages/About';
import SecretGame from './components/Pages/SecretGame';
import HotelPage from './components/Pages/HotelPage';
import ChatalogPage from './components/Pages/ChatalogPage';

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const isAllDelete = (location.pathname === '/secretgame');
  const isFooterDelete = (location.pathname === '/profile');
  const isHotelPage = matchPath('/hotelPage/:id', location.pathname);
  const isChatalogPage = (location.pathname === '/chatalog');

  const headerProps = (isHotelPage || isChatalogPage)
    ? { 
        backgroundColor: "rgba(242, 232, 223, 0.8)",
        menuTextColor: "#000000",
        logoTextColor: "#000000",
        applyLogoFilter: false
      }
    : {};

  const footerBackgroundColor = isHotelPage
    ? '#E49450'
    : isChatalogPage
    ? '#f2e8df'
    : undefined;

  return (
    <div>
      {!isAllDelete && <Header {...headerProps} />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/secretgame" element={<SecretGame />} />
        <Route path="/hotelPage/:id" element={<HotelPage />} />
        <Route path="/chatalog" element={<ChatalogPage />} />
      </Routes>
      {!(isAllDelete || isFooterDelete) && <Footer backgroundColor={footerBackgroundColor} />}
    </div>
  );
}

export default App;
