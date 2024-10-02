import React, { useEffect, useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './HotelPageQuestions.css';


const HotelPageQuestions = () => {
    const [pawPrints, setPawPrints] = useState([]);
    const [lastPrintTime, setLastPrintTime] = useState(0);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    const questionBlockRef = useRef(null);
  
    useEffect(() => {
      function htlQstIsElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 20 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 20
        );
      }
  
      function htlQstHandleScroll() {
        const container = document.querySelector('.htlQst-container');
        const title = container.querySelector('h1');
        const paragraph = container.querySelector('p');
        const button = container.querySelector('.htlQst-book-now');
  
        if (htlQstIsElementInViewport(container)) {
          title.style.animation = 'htlQst-fadeInUp 1s ease forwards';
          paragraph.style.animation = 'htlQst-fadeInUp 1s ease 0.5s forwards';
          button.style.animation = 'htlQst-fadeInScale 1s ease 1s forwards';
        }
      }
  
      window.addEventListener('scroll', htlQstHandleScroll);
      htlQstHandleScroll(); 
  
      return () => {
        window.removeEventListener('scroll', htlQstHandleScroll);
      };
    }, []);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        if (!questionBlockRef.current) return;
  
        const rect = questionBlockRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const currentTime = Date.now();
        if (currentTime - lastPrintTime > 50) {
          const dx = x - lastMousePosition.x;
          const dy = y - lastMousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 150) {
            const angle = Math.atan2(dy, dx);
            setPawPrints(prevPrints => [
              ...prevPrints,
              {
                id: uuidv4(),
                x: x - 64,
                y: y - 64,
                angle: angle * (180 / Math.PI) + 55,
                opacity: 1
              }
            ]);
            setLastPrintTime(currentTime);
            setLastMousePosition({ x, y });
          }
        }
      };
  
      const questionBlock = questionBlockRef.current;
      if (questionBlock) {
        questionBlock.addEventListener('mousemove', handleMouseMove);
      }
  
      const fadeOutInterval = setInterval(() => {
        setPawPrints(prevPrints => 
          prevPrints.map(print => ({
            ...print,
            opacity: print.opacity - 0.02
          })).filter(print => print.opacity > 0)
        );
      }, 50);
  
      const htlQstAddRandomCatWalk = () => {
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const steps = 10;
        const stepLength = 60;
        const baseAngle = Math.random() * 360;
  
        for (let i = 0; i < steps; i++) {
          setTimeout(() => {
            const angle = (baseAngle + Math.random() * 30 - 15) * (Math.PI / 180);
            const x = startX + Math.cos(angle) * stepLength * i;
            const y = startY + Math.sin(angle) * stepLength * i;
            
            setPawPrints(prevPrints => [
              ...prevPrints,
              {
                id: uuidv4(),
                x: x - 64,
                y: y - 64,
                angle: angle * (180 / Math.PI) + 55,
                opacity: 1
              }
            ]);
          }, i * 200);
        }
      };
  
      const randomWalkInterval = setInterval(htlQstAddRandomCatWalk, 3000); 
  
      return () => {
        if (questionBlock) {
          questionBlock.removeEventListener('mousemove', handleMouseMove);
        }
        clearInterval(fadeOutInterval);
        clearInterval(randomWalkInterval);
      };
    }, [lastPrintTime, lastMousePosition]);
    const catPawSVG = `
      <svg width="176" height="176" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#a)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="m38.1 116.2-1.1-.8c-2-1.4-3.6-3.3-4.7-5.6-1.7-4-2-8-.6-12.1a21.6 21.6 0 0 1 5.9-8.6c2.2-2.1 4.8-3.6 7.6-4.8 2.2-.9 4.4-1.5 6.6-2 2.1-.4 4.2-1 6.2-1.7 2.5-1 5-2 7.5-3.2l6.5-2.9c1.7-.7 3.4-1.3 5.1-1.7 2.2-.6 4.4-.8 6.7-.5 1.6.2 3.3.7 4.7 1.5 1.7 1 3.3 2.1 4.7 3.4 2 2 3.6 4.6 4.4 7.4.6 1.9.9 3.9 1 5.9l.4 6.4.6 7.2c.4 2.4 1 4.7 1.7 7a35 35 0 0 1 1.8 8.4c.2 2.5.1 5-.4 7.4-.3 2-1 3.8-1.8 5.5a16 16 0 0 1-13.3 9 16.3 16.3 0 0 1-8-1.3h-.2l-.3-.2-.2-.1-1.6-1h-.2l-.3-.3c-1.3-.8-2.5-1.8-3.6-2.9-2-1.8-3.7-3.7-5.6-5.6a47.4 47.4 0 0 0-8.6-6.4c-1-.6-2.1-1-3.3-1.4-2.1-.8-4.4-1.4-6.6-2a69.1 69.1 0 0 1-9.8-3.3l-.5-.3-.7-.4M128 50.9c2.6 2 4 4.7 4.3 8 .2 2.2 0 4.4-.7 6.5a24.8 24.8 0 0 1-16.1 15.7c-2.1.6-4.3.7-6.4.4a10.4 10.4 0 0 1-8.6-7.7c-.6-2.2-.6-4.4-.2-6.6a19.8 19.8 0 0 1 2.8-7.3 24.9 24.9 0 0 1 11.6-9.8c2.1-.9 4.3-1.3 6.6-1.3 1.6 0 3.3.4 4.8 1l.1.1h.2l.2.2 1 .5.1.1.1.1.2.1Zm-85.2-4.2a14 14 0 0 1 6.8-5.4c2-.7 4.2-.7 6.2 0 1.7.6 3.2 1.6 4.4 2.9 1.4 1.5 2.3 3.2 3 5.2 1 3 1.3 6 .8 9.1a19.5 19.5 0 0 1-5 10.6c-1.3 1.4-3 2.5-4.9 3.2-2.2.8-4.5.7-6.6-.1-1.6-.6-3-1.6-4.1-2.9a15 15 0 0 1-3.2-5.9 20.5 20.5 0 0 1 .7-12.9c0-.3.2-.7.4-1l.2-.5v-.2l.2-.3.7-1.2.2-.3.2-.3Zm31.3-7.9c1.4-2.4 3-4.4 5-6a15 15 0 0 1 5.1-2.8c2-.6 4-.7 6.1-.1 2.1.6 3.8 1.7 5.2 3.3 1.2 1.5 2 3.1 2.5 5 1 2.8 1 5.7.6 8.6a23.5 23.5 0 0 1-5 11.7c-1.8 2.1-4 4-6.5 5-1.6.8-3.3 1.1-5.1 1.1-2 0-3.8-.7-5.4-1.8-1.5-1-2.6-2.3-3.5-3.9-1.2-2-1.8-4.2-2-6.5a22.2 22.2 0 0 1 2.3-12.3l.7-1.3Zm63.7 64.6-.2.3a20.3 20.3 0 0 1-11.2 8.3c-2.5.8-5.1 1-7.8.6-1.6-.3-3-.9-4.4-1.8a9.7 9.7 0 0 1-4.2-5.4c-.5-1.9-.5-3.8-.1-5.8.3-1.7 1-3.3 2-4.8a20.2 20.2 0 0 1 12-8.9c2.5-.6 5.1-.8 7.8-.2 1.4.3 2.9.9 4.1 1.7a9.7 9.7 0 0 1 4 5.4c.6 2 .5 4 0 6.1-.3 1.1-.7 2.2-1.2 3.2l-.2.3-.6 1Z" fill="#26110C"/>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="rotate(30 31 115.7)" d="M0 0h124v124H0z"/>
          </clipPath>
        </defs>
      </svg>
    `;
  
    return (
      <div className="htlQst-QuestionBlock" id="contacts" ref={questionBlockRef}>
        <div className="htlQst-container">
          <h1>HAVE QUESTIONS?</h1>
          <p>Contact hotel at <span className="htlQst-phone-number">858-449-2691</span>.</p>
          <button className="htlQst-book-now">Contact us</button>
        </div>
        {pawPrints.map(print => (
          <div
            key={print.id}
            className="htlQst-cat-paw"
            style={{
              left: print.x,
              top: print.y,
              opacity: print.opacity,
              transform: `rotate(${print.angle}deg) scale(0.6)`,
            }}
            dangerouslySetInnerHTML={{ __html: catPawSVG }}
          />
        ))}
      </div>
    );
};

export default HotelPageQuestions;
