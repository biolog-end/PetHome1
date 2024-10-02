import React, { useEffect, useState } from 'react';

import guideImg1 from '../Assets/Img/guideImg1.png';
import guideImg2 from '../Assets/Img/guideImg2.png';
import guideImg3 from '../Assets/Img/guideImg3.png';
import guideImg4 from '../Assets/Img/guideImg4.png';
import guideImg5 from '../Assets/Img/guideImg5.png';
import logo from '../Assets/Img/logo.png';

import './Guide.css';

const Guide = ({ onClose }) => {
    const guideSlides = [
        {
            image: guideImg1,
            instruction: 'Booking a hotel with us is easy and simple.'
        },
        {
            image: guideImg2,
            instruction: 'Choose your hotel!'
        },
        {
            image: guideImg3,
            instruction: 'Add your pet so you can choose it.'
        },
        {
            image: guideImg4,
            instruction: 'We check all hotels for the presence of veterinarians, groomers and special cameras.'
        },
        {
            image: guideImg5,
            instruction: 'Earn badges to get discounts on our site.'
        }
    ];
    const [guideCurrentIndex, setGuideCurrentIndex] = useState(0);
    const [guideShowModal, setGuideShowModal] = useState(false);
    const [guideIsHidden, setGuideIsHidden] = useState(false);
    const [guideIsVisible, setGuideIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setGuideIsVisible(true);
        }, 100);
    }, []);

    const handleGuideSkip = () => {
        setGuideShowModal(true);
    };

    const handleGuideNext = () => {
        if (guideCurrentIndex === guideSlides.length - 1) {
            handleGuideClose();
        } else {
            setGuideCurrentIndex((prevIndex) => (prevIndex + 1) % guideSlides.length);
        }
    };

    const handleGuideModalConfirm = () => {
        setGuideShowModal(false);
        handleGuideClose();
    };

    const handleGuideModalCancel = () => {
        setGuideShowModal(false);
    };

    const handleGuideClose = () => {
        setGuideIsHidden(true);
        setTimeout(() => {
            onClose();
        }, 500); 
    };

    return (
        <div className={`guide-container ${guideIsVisible ? 'guide-visible' : ''} ${guideIsHidden ? 'guide-hidden' : ''}`}>
            <div className="guide-header">
                <div className="guide-logo-container">
                    <img className="guide-logo" src={logo} alt="PetHome logo" />
                    <span className="guide-company-name">PetHome</span>
                </div>
            </div>
            <div className="guide-content">
                {guideSlides.map((slide, index) => (
                    <div key={index} className={`guide-slide ${index === guideCurrentIndex ? 'guide-active' : index === (guideCurrentIndex - 1 + guideSlides.length) % guideSlides.length ? 'guide-prev' : ''}`}>
                        <img className="guide-pet-image" src={slide.image} alt={`Dog image related to ${slide.instruction}`} />
                        <p className="guide-instruction">{slide.instruction}</p>
                    </div>
                ))}
            </div>
            <div className="guide-dots">
                {guideSlides.map((_, index) => (
                    <span key={index} className={`guide-dot ${index === guideCurrentIndex ? 'guide-active' : ''}`}></span>
                ))}
            </div>
            <div className="guide-buttons">
                <button className="guide-btn guide-btn-skip" onClick={handleGuideSkip}>Skip</button>
                <button className={`guide-btn ${guideCurrentIndex === guideSlides.length - 1 ? 'guide-btn-close' : 'guide-btn-next'}`} onClick={handleGuideNext}>
                    {guideCurrentIndex === guideSlides.length - 1 ? 'Close' : 'Next'}
                </button>
            </div>
            <div className={`guide-modal-overlay ${guideShowModal ? 'guide-active' : ''}`}>
                <div className="guide-modal">
                    <h2>Are you sure you want to skip the guide?</h2>
                    <div className="guide-modal-buttons">
                        <button className="guide-btn guide-btn-skip guide-btn-modal guide-btn-skip-modal" onClick={handleGuideModalCancel}>No</button>
                        <button className="guide-btn guide-btn-next guide-btn-modal" onClick={handleGuideModalConfirm}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;