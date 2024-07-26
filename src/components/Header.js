import React, { useEffect, useState } from 'react';
import logo from './Assets/Img/logo.png';
import './Header.css';
import AuthComponent from './AuthComponent';

const Header = () => {
  useEffect(() => {
    let lastScrollTop = 0;
    const header = document.getElementById('header');

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 60) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      if (scrollTop > 50) {
        header.style.backgroundColor = 'rgba(109, 211, 225, 0.9)';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
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
    };
  }, []);    
  //AuthComponent
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const openSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  return (
    <div className="HeaderSuperDiv">
      {/* Header */}
      <header id="header">
        <nav>
          <div className="logo">
            <img src={logo} alt="PetHome Logo" /> <span>PetHome</span>
          </div>
          <div className="menu">
            <a href="#prices">HOTELS</a>
            <a href="/about">ABOUT US</a>
            <a href="/">CONTACT US</a>
            <a href="#blog">PRIVACY</a>
          </div>
          <div className="loginMenu">
            <a href="#login" className="login-btn" id="loginBtn" onClick={openSignIn} >SIGN IN</a>
            <a href="#login" className="login-btn" id="loginBtn" onClick={openSignUp} >SIGN UP</a>
          </div>
        </nav>
      </header>
      <AuthComponent 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
      />
    </div>
  );
};

export default Header;
