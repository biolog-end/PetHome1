import React, { useState, useEffect, useRef } from 'react';
import './About.css';

function DiskRecordText() {
    const text = "CAT DOG ";
    const repetitions = 6;
    const fullText = text.repeat(repetitions);

    return (
      <div className="disk-record-text">
        {[...fullText].map((char, index) => (
          <span key={index} style={{transform: `rotate(${index * 360 / fullText.length}deg)`}}>
            {char}
          </span>
        ))}
      </div>
    );
  }

  function DiskLeaf({ style }) {
    return <div className="disk-leaf" style={style}></div>;
  }

  function DiskTurntable({ isPlaying, onMouseEnter, onMouseLeave }) {
    const audioContextRef = useRef(null);

    useEffect(() => {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      return () => {
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };
    }, []);

    useEffect(() => {
      if (audioContextRef.current && !isPlaying) {
        const scratchOscillator = audioContextRef.current.createOscillator();
        scratchOscillator.type = 'sawtooth';
        scratchOscillator.frequency.setValueAtTime(100, audioContextRef.current.currentTime);
        scratchOscillator.frequency.exponentialRampToValueAtTime(1000, audioContextRef.current.currentTime + 0.1);
        
        const scratchGain = audioContextRef.current.createGain();
        scratchGain.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        scratchGain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
        
        scratchOscillator.connect(scratchGain);
        scratchGain.connect(audioContextRef.current.destination);
        
        scratchOscillator.start();
        scratchOscillator.stop(audioContextRef.current.currentTime + 0.1);
      }
    }, [isPlaying]);

    return (
      <div className="disk-turntable" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="disk-record" style={{animationPlayState: isPlaying ? 'running' : 'paused'}}>
          <DiskRecordText />
          <div className="disk-record-center"></div>
        </div>
        <div className="disk-tonearm">
          <div className="disk-tonearm-base"></div>
          <div className="disk-tonearm-arm" style={{animationPlayState: isPlaying ? 'running' : 'paused'}}>
            <div className="disk-tonearm-extension"></div>
          </div>
        </div>
        <div className="disk-play-button" style={{backgroundColor: isPlaying ? '#4CAF50' : '#f44336'}}></div>
      </div>
    );
  }

  function DiskCatPaw({ isActive, onMouseEnter, onMouseLeave }) {
    return (
      <div 
        className={`disk-cat-paw ${isActive ? 'active' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      ></div>
    );
  }

  function About() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isPawActive, setIsPawActive] = useState(false);

    const handleMouseEnter = () => {
      setIsPlaying(false);
      setIsPawActive(true);
    };

    const handleMouseLeave = () => {
      setIsPlaying(true);
      setIsPawActive(false);
    };

    const leaves = [
      { right: '8%', top: '19%', transform: 'rotate(167deg)', width: '7vw', height: '7vw' },
      { right: '-30px', bottom: '100px', transform: 'rotate(-15deg)' },
      { left: '100px', bottom: '-20px', transform: 'rotate(60deg)' },
      { right: '150px', bottom: '-10px', transform: 'rotate(-45deg)' },
      { left: '300px', bottom: '30px', transform: 'rotate(20deg)' },
    ];

    return (
      <div className="disk-scene">
        <div className="disk-table"></div>
        <div className="disk-turntable-container">
          <DiskTurntable 
            isPlaying={isPlaying}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <DiskCatPaw 
            isActive={isPawActive}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        {leaves.map((style, index) => (
          <DiskLeaf key={index} style={style} />
        ))}
      </div>
    );
  }

export default About;
