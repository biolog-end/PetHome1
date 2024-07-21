import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import About from './components/About';
import SecretGame from './components/SecretGame';

function App() {

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/secretgame" element={<SecretGame />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;