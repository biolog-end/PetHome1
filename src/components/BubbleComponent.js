import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BubbleComponent.css';

const BubbleComponent = ({ config, index, className }) => {
  const { isFloating = false } = config; 
  const bubbleRef = useRef(null);
  const [isFirstPopped, setIsFirstPopped] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFloating) {
      bubbleRef.current.style.animationDelay = `${Math.random() * 3}s`;
    }
  }, [isFloating]);

  const bubbleStyle = {
    ...config,
    height: config.width,
    backgroundColor: isSpecial ? '#C4F4C3' : '',
    '--bubble-width': config.width,
    transition: 'all 0.3s ease-out',
    transform: isFirstPopped ? (isPopped ? 'scale(1.5)' : 'scale(1)') : '',
    opacity: isFirstPopped ? (isPopped ? 0 : 1) : '',
    pointerEvents: isClickable ? 'auto' : 'none',
  };

  const popBubble = () => {
    if (!isClickable) return;

    if (isSpecial) {
      navigate('/secretgame');
      return;
    }

    setIsPopped(true);
    if (!isFirstPopped) setIsFirstPopped(true);
    setIsClickable(false);
    playPopSound();
    createSplashEffect();

    setTimeout(() => {
      setIsPopped(false);
      if (Math.random() < 0.05) {
        setIsSpecial(true);
      }
      setTimeout(() => setIsClickable(true), 100);
    }, 2000);
  };

  const playPopSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const createSplashEffect = () => {
    const bubbleRect = bubbleRef.current.getBoundingClientRect();
    const splash = document.createElement('div');
    splash.className = 'splash';
    splash.style.position = 'fixed';
    splash.style.left = `${bubbleRect.left}px`;
    splash.style.top = `${bubbleRect.top}px`;
    splash.style.width = `${bubbleRect.width}px`;
    splash.style.height = `${bubbleRect.height}px`;

    const bubbleSize = parseFloat(config.width);
    const dropletCount = (Math.floor(bubbleSize / 3) + 2);

    for (let i = 0; i < dropletCount; i++) {
      const droplet = document.createElement('div');
      droplet.className = 'droplet';

      const dropletSize = (bubbleSize+1)*2;
      droplet.style.width = `${dropletSize}px`;
      droplet.style.height = `${dropletSize}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = bubbleSize / 2;

      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;

      const endX = startX * 50;
      const endY = startY * 50;

      droplet.style.left = `calc(50% + ${startX}px)`;
      droplet.style.top = `calc(50% + ${startY}px)`;
      droplet.style.setProperty('--end-x', `${endX}px`);
      droplet.style.setProperty('--end-y', `${endY}px`);

      const brightness = Math.floor(Math.random() * 20) + 80;
      droplet.style.backgroundColor = `hsla(200, 100%, ${brightness}%, 0.8)`;

      splash.appendChild(droplet);
    }

    document.body.appendChild(splash);
    setTimeout(() => {
      splash.remove();
    }, 2000);
  };

  return (
    <div
      ref={bubbleRef}
      className={`${className} ${isFloating ? 'floating-bubble' : ''} ${isSpecial ? 'special-bubble' : ''}`}
      style={bubbleStyle}
      onClick={popBubble}
    />
  );
};

export default BubbleComponent;
