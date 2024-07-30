import React, { useRef, useState, useEffect } from 'react';

const AnimatedText = ({ text, className = '', letterClassName = '', spaceClassName = '' }) => {
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

  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className={spaceClassName}></span>;
      }
      return (
        <span
          key={index}
          className={`${letterClassName} ${isVisible ? 'visible' : ''}`}
          style={{transitionDelay: `${Math.abs(index - text.length / 2) * 100}ms`}}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className={className} ref={textRef}>
      {renderAnimatedText(text)}
    </div>
  );
};

export default AnimatedText;