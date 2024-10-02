import React, { useEffect, useState } from 'react';
import './CircularSpinningText.css';

const CircularSpinningText = ({
    text,
    color = '#000',
    repetitions = 1,
    clockwise = true,
    paddingPercent = 5,
    containerClassName 
  }) => {
    const [containerSize, setContainerSize] = useState(0);
  
    useEffect(() => {
      const updateSize = () => {
        const container = document.querySelector(`.${containerClassName}`);
        if (container) {
          setContainerSize(container.offsetWidth);
        }
      };
  
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }, [containerClassName]); 
  
    const createSpinningText = (text) => {
      const fullText = text.repeat(repetitions);
      const radius = containerSize / 2;
      const padding = (paddingPercent / 100) * containerSize;
      const adjustedRadius = radius - padding;
      const fontSize = containerSize * 0.04;
  
      return [...fullText].map((char, index) => {
        const angle = (index * 360) / fullText.length;
        const extraRotation = (char === 'L' || char === 'F') ? 0.3 : 0;

        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: '50%',
              top: `${padding}px`,
              transform: `rotate(${angle + extraRotation}deg) translateX(-50%)`,
              transformOrigin: `0 ${adjustedRadius}px`,
              fontSize: `${fontSize}px`,
              color: color,
              display: 'inline-block',
              whiteSpace: 'pre',
            }}
          >
            {char}
          </span>
        );
      });
    };
  
    return (
      <div
        className="spinning-text"
        style={{
          animation: `spin ${clockwise ? '20s' : '20s reverse'} linear infinite`,
        }}
      >
        {createSpinningText(text)}
      </div>
    );
  };


export default CircularSpinningText;