import React, { useEffect, useState } from 'react';
import logo from '../Assets/Img/logo.png';
import './Header.css';
import AuthComponent from '../PageParts/AuthComponent';
import authService from '../Services/authService';

const Header = ({ 
  backgroundColor = 'rgba(109, 211, 225, 0.9)', 
  menuTextColor = '#ffffff', 
  logoTextColor = '#ffffff',
  applyLogoFilter = true
}) => {
  const [headerStyle, setHeaderStyle] = useState({});
  const [menuStyle, setMenuStyle] = useState({});
  const [logoStyle, setLogoStyle] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let headerBg = 40;
    let lastScrollTop = 0;

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 60) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      if (scrollTop > headerBg) {
        setHeaderStyle({
          backgroundColor: backgroundColor,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        });
      } else {
        setHeaderStyle({
          backgroundColor: 'transparent',
          boxShadow: 'none'
        });
      }
    };

    const menuToggle = document.createElement('button');
    menuToggle.textContent = '☰';
    menuToggle.classList.add('menu-toggle');

    const nav = document.querySelector('nav');
    nav.insertBefore(menuToggle, nav.firstChild);

    const menu = document.querySelector('.menu');
    const loginMenu = document.querySelector('.loginMenu');

    const handleMenuToggle = () => {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
      loginMenu.style.display = loginMenu.style.display === 'flex' ? 'none' : 'flex';
    };

    menuToggle.addEventListener('click', handleMenuToggle);

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        headerBg = -1;
        menuToggle.style.display = 'block';
        menu.style.display = 'none';
        loginMenu.style.display = 'none';
      } else {
        menuToggle.style.display = 'none';
        menu.style.display = 'flex';
        loginMenu.style.display = 'flex';
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      menuToggle.removeEventListener('click', handleMenuToggle);
    };
  }, [backgroundColor]);

  useEffect(() => {
    setMenuStyle({ color: menuTextColor });
    setLogoStyle({ 
      color: logoTextColor,
      filter: applyLogoFilter ? 'brightness(0) invert(1)' : 'none'
    });
  }, [menuTextColor, logoTextColor, applyLogoFilter]);
  //AuthComponent
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsLoggedIn(true);
      setUsername(currentUser);
    }
  }, []);

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setAuthMode('signin');
    setUsername('');
  };

  return (
    <div className="HeaderSuperDiv">
      <header 
        id="header" 
        style={{
          ...headerStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <nav>
          <div className="logo" style={logoStyle}>
            <img src={logo} alt="PetHome Logo" style={logoStyle} /> <span>PetHome</span>
          </div>
          <div className="menu">
            <a href="/chatalog" style={menuStyle}>HOTELS</a>
            <a href="/about" style={menuStyle}>ABOUT US</a>
            <a href="/" style={menuStyle}>CONTACT US</a>
            <a href="#blog" style={menuStyle}>FOR HOTELS</a>
          </div>
          <div className="loginMenu">
            {isLoggedIn ? (
              <div className="user-menu">
                <a className="login-btn" onClick={handleLogout}>{username}</a>
              </div>
            ) : (
              <>
                <a href="#login" className="login-btn" id="loginBtn" onClick={openSignIn}>SIGN IN</a>
                <a href="#login" className="login-btn" id="loginBtn" onClick={openSignUp}>SIGN UP</a>
              </>
            )}
          </div>
        </nav>
      </header>
      <AuthComponent 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Header;
