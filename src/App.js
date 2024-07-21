import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import About from './components/About';
import SecretGame from './components/SecretGame';
function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}
function Content() {
  const location = useLocation();
  const isSecretGame = location.pathname === '/secretgame';

  return (
    <div>
      {!isSecretGame && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/secretgame" element={<SecretGame />} />
      </Routes>
      {!isSecretGame && <Footer />}
    </div>
  );
}

export default App;