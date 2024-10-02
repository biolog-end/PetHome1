import React, { useRef, useState, useEffect } from 'react';
import './AnimatedText.css';

const AnimatedText = ({ 
  text, 
  className = '', 
  letterClassName = '', 
  spaceClassName = '',
  direction = 'center-out' 
}) => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isElementInViewport(textRef.current)) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isElementInViewport = (el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const getTransitionDelay = (index, textLength) => {
    switch(direction) {
      case 'center-out':
        return `${Math.abs(index - textLength / 2) * 100}ms`;
      case 'edges-in':
        return `${Math.min(index, textLength - 1 - index) * 100}ms`;
      case 'left-right':
        return `${index * 100}ms`;
      case 'right-left':
        return `${(textLength - 1 - index) * 100}ms`;
      default:
        return `${Math.abs(index - textLength / 2) * 100}ms`;
    }
  };

  const getInitialTransform = () => {
    switch(direction) {
      case 'center-out':
      case 'edges-in':
        return 'translateY(100%) rotate(10deg)';
      case 'left-right':
        return 'translateX(-100%) rotate(10deg)';
      case 'right-left':
        return 'translateX(100%) rotate(10deg)';
      default:
        return 'translateY(100%) rotate(10deg)';
    }
  };

  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <span
            key={index}
            className={`AnimatedTextSpace ${spaceClassName}`}
          ></span>
        );
      }
      return (
        <span
          key={index}
          className={`AnimatedTextLetter ${letterClassName} ${isVisible ? 'visible' : ''}`}
          style={{ 
            transitionDelay: getTransitionDelay(index, text.length),
            transform: isVisible ? 'translateY(0) rotate(0deg)' : getInitialTransform()
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className={`AnimatedTextText ${className}`} ref={textRef}>
      {renderAnimatedText(text)}
    </div>
  );
};

export default AnimatedText;