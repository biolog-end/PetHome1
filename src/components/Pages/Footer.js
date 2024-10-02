import React, { useEffect, useRef, useState } from 'react';
import logo from '../Assets/Img/logo.png';
import FooterImage from '../Assets/Img/Footer.png';
import AnimatedText from '../PageParts/AnimatedText'
import './Footer.css';

const Footer = ({ backgroundColor = '#6DD3E1' }) => { 
  const basementDogGalleryRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const basementDogImages = [
    { src: "https://placedog.net/127/127", alt: "Playful dog", width: 127, height: 127, top: 41.7, left: 0 },
    { src: "https://placedog.net/300/300", alt: "Happy dog", width: 300, height: 300, top: 41.2, left: 21.1 },
    { src: "https://placedog.net/127/127", alt: "Sleepy dog", width: 128, height: 127, top: 51.2, left: 90.3 },
    { src: "https://placedog.net/301/301", alt: "Curious dog", width: 300, height: 300, top: 65.95, left: 71.9 },
    { src: "https://placedog.net/221/221", alt: "Lazy dog", width: 221, height: 221, top: 69.2, left: 10.7 },
    { src: "https://placedog.net/128/128", alt: "Excited dog", width: 128, height: 128, top: 66.9, left: 3.3 },
    { src: "https://placedog.net/183/183", alt: "Friendly dog", width: 183, height: 183, top: 74.9, left: 44 }
  ];

  useEffect(() => {
    const basementDogGallery = basementDogGalleryRef.current;
    
    if (!basementDogGallery) {
      console.error('Dog gallery element not found');
      return;
    }

    let animationFrameId;

    function basementHandleMouseMove(e) {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const { left, top, width, height } = basementDogGallery.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        basementDogGallery.querySelectorAll('.basement-dog-image').forEach((img) => {
          const imgRect = img.getBoundingClientRect();
          const imgCenterX = imgRect.left + imgRect.width / 2 - left;
          const imgCenterY = imgRect.top + imgRect.height / 2 - top;

          const deltaX = (mouseX - imgCenterX) / width;
          const deltaY = (mouseY - imgCenterY) / height;

          const moveX = deltaX * 30;
          const moveY = deltaY * 90;

          const rotateZ = (deltaX * deltaY) * 15;

          const scale = 1 + Math.abs(deltaX * deltaY) * 0.5;

          img.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotateZ}deg) scale(${scale})`;
          img.style.transition = 'transform 0.2s ease-out';
        });
      });
    }

    function basementHandleMouseLeave() {
      basementDogGallery.querySelectorAll('.basement-dog-image').forEach((img) => {
        img.style.transform = 'translate(0, 0) rotate(0deg) scale(1)';
        img.style.transition = 'transform 0.5s ease-out';
      });
    }

    basementDogGallery.addEventListener('mousemove', basementHandleMouseMove);
    basementDogGallery.addEventListener('mouseleave', basementHandleMouseLeave);

    return () => {
      basementDogGallery.removeEventListener('mousemove', basementHandleMouseMove);
      basementDogGallery.removeEventListener('mouseleave', basementHandleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const getImageSize = (originalWidth) => {
    if (windowWidth < 480) {
      return originalWidth * 0.4;
    } else if (windowWidth < 768) {
      return originalWidth * 0.6;
    } else if (windowWidth < 1024) {
      return originalWidth * 0.8;
    } else {
      return originalWidth;
    }
  }

  const getAdjustedTop = (originalTop) => {
    if (windowWidth < 480) {
      return originalTop - 10; 
    } else if (windowWidth < 768) {
      return originalTop - 5; 
    } else {
      return originalTop;
    }
  }
  const socialIcons = [
    {
      href: "https://www.instagram.com/PetHome",
      icon: "M16.25 4.17h17.5a12.1 12.1 0 0 1 12.08 12.08v17.5a12.08 12.08 0 0 1-12.08 12.08h-17.5A12.1 12.1 0 0 1 4.17 33.75v-17.5A12.08 12.08 0 0 1 16.25 4.17Zm-.42 4.16a7.5 7.5 0 0 0-7.5 7.5v18.34a7.5 7.5 0 0 0 7.5 7.5h18.34a7.5 7.5 0 0 0 7.5-7.5V15.83a7.5 7.5 0 0 0-7.5-7.5H15.83Zm20.1 3.13a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2ZM25 14.58a10.42 10.42 0 1 1 0 20.84 10.42 10.42 0 0 1 0-20.84Zm0 4.17a6.25 6.25 0 1 0 0 12.5 6.25 6.25 0 0 0 0-12.5Z",
      svgClassName: "instagram-svg-basement"
    },
    {
      href: "https://www.facebook.com/PetHome",
      icon: "M29.2 28.1h5.2l2-8.3h-7.2v-4.2c0-2.1 0-4.1 4.1-4.1h3.2v-7c-.7-.1-3.3-.3-6-.3-5.6 0-9.7 3.4-9.7 9.8v5.8h-6.2V28h6.2v17.7h8.4V28.1Z",
      svgClassName: "facebook-svg-basement"
    },
    {
      href: "https://twitter.com/PetHome",
      icon: "M31 5.3h5.4L24.7 18.6l13.8 18.1H27.7l-8.5-11-9.6 11H4.2l12.5-14.2L3.5 5.2h11l7.7 10.1 8.9-10Zm-1.8 28.3h3L13 8.3H9.8l19.4 25.3Z",
      svgClassName: "twitter-svg-basement"
    }
  ];
  const SocialButton = ({ href, icon, svgClassName }) => {
    const [isHovered, setIsHovered] = React.useState(false);
  
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
  
    return (
      <a
        href={href}
        className="basement-social-button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: isHovered ? '#FF7700' : 'transparent',
        }}
      >
        <svg width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg" className={svgClassName}>
          <path d={icon} fill={isHovered ? '#FFFFFF' : '#FF7700'} />
        </svg>
      </a>
    );
  };

  return (
    <div className="basementBlock" style={{ backgroundColor, height: windowWidth < 1515 ? `${2430 - (1515 - windowWidth)}px` : (windowWidth > 1545 ? `${2450 - 30 +(windowWidth - 1535)}px` : '2450px')}}>
      <img className="basementBlock-FooterImage" src={FooterImage} alt="helpMePlease..."/>
      <div className="basementBlock-text">
        <div className="basementBlock-text-links">
          {socialIcons.map((social, index) => (
            <SocialButton 
              key={index} 
              href={social.href} 
              icon={social.icon} 
              svgClassName={social.svgClassName}
              />
          ))}
        </div>
        <div className="basementBlock-text-anime">
          <AnimatedText 
            text="BE OUR " 
            className="basementBlock-text-anime-first"
            direction="left-right"
          />
          <AnimatedText 
            text="FRIEND" 
            className="basementBlock-text-anime-second"
            direction="right-left"
          />
        </div>
      </div>
      <div className="basement-dog-gallery" ref={basementDogGalleryRef} style={{ 
        height: windowWidth < 1515 ? `${2430 - (1515 - windowWidth)}px` : (windowWidth > 1545 ? `${2450 - 30 +(windowWidth - 1535)}px` : '2450px')
      }}>
        {basementDogImages.map((dog, index) => {
          const imageSize = getImageSize(dog.width); 
          const adjustedTop = getAdjustedTop(dog.top); 
          return (
            <img
              key={index}
              src={dog.src}
              alt={dog.alt}
              className="basement-dog-image"
              style={{
                width: `${imageSize}px`, 
                height: `${imageSize * (dog.height / dog.width)}px`, 
                top: `${adjustedTop}%`,
                left: `${dog.left}%`,
                position: 'absolute'
              }}
            />
          );
        })}
        <footer className="basement-footer" style={{ 
          marginTop: windowWidth < 1515 ? `${1496 + windowWidth - 1515}px` : (windowWidth > 1545 ? `${1515 - 30 + (windowWidth - 1535)}px` : '1515px')
        }}>
        <div className="basement-footer-content">
          <div className="basement-footer-left">
            <div className="basement-footer-logo">
              <img src={logo} alt="PetHome Logo" className="basement-logo-image" />
              PetHome
            </div>
            <div className="basement-footer-text">
              <span className="basement-footer-text-location">
                PETHOME, <br/>
                KYIV,UKRAINE
              </span>
              <span className="basement-footer-text-link">
                PETHOMEOFFICIALMAIL@GMAIL.COM
              </span>
            </div>
          </div>
          <div className="basement-footer-right">
            <nav className="basement-footer-links">
              <a href="#services" className="basement-footer-link">HOTELS</a>
              <a href="#pet-care" className="basement-footer-link">ABOUT US</a>
              <a href="#about" className="basement-footer-link">CONTACT US</a>
              <a href="#contacts" className="basement-footer-link">FOR HOTELS</a>
              <a href="#adoption" className="basement-footer-link">PROFILE</a>
            </nav>
          </div>
        </div>
        <div className="basement-footer-bottom">
          ©2024 PETHOME <span className="basement-underline-hover">ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Footer;