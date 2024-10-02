import React, { useEffect, useState, useRef } from 'react';
import './CorkboardPart.css';
import BubbleComponent from '../PageParts/BubbleComponent';

import corcboardPhoto1 from '../Assets/Img/corcboardPhoto1.jpg';
import corcboardPhoto2 from '../Assets/Img/corcboardPhoto2.jpg';
import corcboardPhoto3 from '../Assets/Img/corcboardPhoto3.jpg';
import corcboardPhoto4 from '../Assets/Img/corcboardPhoto4.jpg';

const CorkboardPart = () => {
  const [currentButton, setCurrentButton] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const corkboardRef = useRef(null);
  const canvasRef = useRef(null);

  const bluSoapBubbles = [
    { width: '3.6vw', top: '0.8%', right: '32.6%', isFloating: true },
    { width: '1.4vw', top: '14.3%', right: '37.3%', isFloating: true },
    { width: '2vw', top: '78.2%', right: '4.4%', isFloating: true },
    { width: '0.6vw', top: '60.5%', left: '9.4%', isFloating: true },
    { width: '2.2vw', top: '65.4%', left: '4.8%', isFloating: true },
    { width: '1.5vw', top: '84.6%', left: '14.8%', isFloating: true },
  ];

  const corkButtons = [
    { color: '#4E86DA', cursor: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="%23000" flood-opacity="0.3"/></filter><circle cx="16" cy="16" r="14" fill="%234E86DA" stroke="%233A75C4" stroke-width="2" filter="url(%23shadow)"/><circle cx="16" cy="16" r="6" fill="%233A75C4"/></svg>\') 16 16, auto' },
    { color: '#589B5B', cursor: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="%23000" flood-opacity="0.3"/></filter><circle cx="16" cy="16" r="14" fill="%23589B5B" stroke="%23478A4A" stroke-width="2" filter="url(%23shadow)"/><circle cx="16" cy="16" r="6" fill="%23478A4A"/></svg>\') 16 16, auto' },
    { color: '#D971BC', cursor: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="%23000" flood-opacity="0.3"/></filter><circle cx="16" cy="16" r="14" fill="%23D971BC" stroke="%23C860AB" stroke-width="2" filter="url(%23shadow)"/><circle cx="16" cy="16" r="6" fill="%23C860AB"/></svg>\') 16 16, auto' },
    { color: '#5B30A2', cursor: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><filter id="shadow"><feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="%23000" flood-opacity="0.3"/></filter><circle cx="16" cy="16" r="14" fill="%235B30A2" stroke="%234A2091" stroke-width="2" filter="url(%23shadow)"/><circle cx="16" cy="16" r="6" fill="%234A2091"/></svg>\') 16 16, auto' },
  ];

  const corkNoteTexts = [
    { main: 'We carefully select our hotels to make your pets comfortable.', sub: 'Our system will offer you the safest hotels that have passed our certification inspection.' },
    { main: 'Our hotels may provide special services.', sub: 'Our hotels have veterinarians, groomers and CCTV systems for animals.' },
    { main: 'Our hotels are located all over the world.', sub: 'Wherever you are, you will always find our hotels.' },
    { main: 'We have the most loyal prices on the market.', sub: 'We make sure that the hotel price is as close as possible to the comfort and conditions of the hotel.' },
  ];

  const corkboardPhotos = [
    corcboardPhoto1,
    corcboardPhoto3,
    corcboardPhoto2,
    corcboardPhoto4,
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (corkboardRef.current && currentButton < corkButtons.length) {
      corkboardRef.current.style.cursor = corkButtons[currentButton].cursor;
    } else if (corkboardRef.current) {
      corkboardRef.current.style.cursor = 'default';
    }
  }, [currentButton]);

  const handleButtonClick = (index) => {
    setCurrentButton(index + 1);
  };

  const getNotePosition = (index) => {
    const NotesPosition = isMobile
      ? [
          { top: '10%', left: '5%' },
          { top: '30%', left: '5%' },
          { top: '50%', left: '5%' },
          { top: '70%', left: '5%' },
        ]
      : [
          { top: '19.5%', left: '9.15%' },
          { top: '20.3%', right: '20%' },
          { bottom: '11.9%', left: '32.05%' },
          { bottom: '14.1%', right: '6%' },
        ];

    return NotesPosition[index];
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  const startLeafDrawing = (e) => {
    setIsDrawing(true);
    setLastPos({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const drawLeaf = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    setLastPos({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const stopLeafDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <div className="corkboardBase">
        <div className={`corkboard ${isMobile ? 'mobile' : ''}`} ref={corkboardRef}>
          <h1 className="corkHeader">Why should you choose us?</h1>
          <div className="corkSoap">
            {bluSoapBubbles.map((bubbleConfig, index) => (
              <BubbleComponent 
                key={index} 
                config={bubbleConfig} 
                index={index} 
                className="blueBubble" 
                isFloating={true}
              />
            ))}
          </div>
          <div className="corkDuck" />
          <div className="corkLeaf" />
          <canvas
            id="leafCanvas"
            ref={canvasRef}
            onMouseDown={startLeafDrawing}
            onMouseMove={drawLeaf}
            onMouseUp={stopLeafDrawing}
            onMouseOut={stopLeafDrawing}
          />
          {corkButtons.map((button, index) => (
            <div
              key={index}
              id={`corkNote${index + 1}`}
              className={`corkNote ${isMobile ? 'mobile' : ''}`}
              style={{
                display: currentButton > index ? 'block' : 'none',
                '--start-rotation': `${[377.5, 21.5, 15, 380][index]}deg`,
                '--end-rotation': `${[357.5, 1.5, -5, 360][index]}deg`,
                animation: 'corkPinned 0.5s ease-out forwards',
                ...getNotePosition(index),
              }}
            >
              <div className="corkNoteNumber">0{index + 1}</div>
              <div className="corkNoteImage">
                <img src={corkboardPhotos[index]} alt={`Note ${index + 1}`} />
              </div>
              <div className="corkNoteText">{corkNoteTexts[index].main}</div>
              <div className="corkNoteSubText">{corkNoteTexts[index].sub}</div>
            </div>
          ))}
          {corkButtons.map((button, index) => (
            <div
              key={index}
              id={`corkButton${index + 1}`}
              className={`corkButton ${isMobile ? 'mobile' : ''}`}
              style={{ 
                opacity: currentButton === index ? 1 : 0, 
                pointerEvents: currentButton === index ? 'auto' : 'none',
                transition: 'opacity 0.5s ease-in-out',
              }}
              onClick={() => handleButtonClick(index)}
            >
              {index + 1}
            </div>
          ))}
          <button className={`corkActionButton ${isMobile ? 'mobile' : ''}`}>See more</button>
        </div>
      </div>
    </div>
  );
};

export default CorkboardPart;
