import React, { useState, useEffect, useRef } from 'react';
import './FlyPictures.css';

const FlymgSwayingImage = ({ src, alt, settings, index, isVisible, direction }) => {
    const adjustedIndex = direction === 'right-to-left' ? settings.totalImages - index - 1 : index;

    const wrapperStyle = {
        top: `${settings.offsetY}px`,
        left: `${settings.offsetX}px`,
        zIndex: `${settings.zIndex}`,
        '--start-rotate': `${settings.rotate}deg`,
        animationDelay: `${adjustedIndex * 0.1}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
        transitionDelay: `${adjustedIndex * 0.1}s`,
        transform: `translateX(${direction === 'right-to-left' ? '50px' : '-50px'})` 
    };

    return (
        <div className={`flymg-image-wrapper ${isVisible ? 'visible' : ''}`} style={wrapperStyle}>
            <img 
                src={src} 
                alt={alt} 
                width={settings.width} 
                height={settings.height}
            />
        </div>
    );
};


const FlyingPictures = ({ images, imageSettings, direction = 'left-to-right' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div className="flymg-image-container" ref={containerRef}>
            {images.map((image, index) => (
                <FlymgSwayingImage 
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    settings={{ ...imageSettings[index], totalImages: images.length }}
                    index={index}
                    isVisible={isVisible}
                    direction={direction} 
                />
            ))}
        </div>
    );
};

export default FlyingPictures;
