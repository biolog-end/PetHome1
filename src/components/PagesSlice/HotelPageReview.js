import React, { useState, useRef, useEffect } from 'react';
import './HotelPageReview.css';
import HotelQuest from '../Assets/Img/HotelQuest.png';

const HotelPageReview = ({ reviewsData, averageRat }) => {
  const htlRevData = reviewsData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoScrollDirection, setAutoScrollDirection] = useState(1);
  const [visibleCards, setVisibleCards] = useState(3);
  const reviewCardWidth = 319;  
  const sliderRef = useRef(null);
  const autoScrollTimerRef = useRef(null);
  const lastInteractionRef = useRef(Date.now());
  const isMouseOverSlider = useRef(false);

  const averageRating = averageRat;

  const filteredReviews = htlRevData
    .filter(
      (review) =>
        review.rating >= 4 &&
        review.text.length >= 20 &&
        review.text.length <= 440
    )
    .slice(0, 30);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    lastInteractionRef.current = Date.now();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, filteredReviews.length - visibleCards)
    );
    lastInteractionRef.current = Date.now();
  };

  const startAutoScroll = () => {
    autoScrollTimerRef.current = setInterval(() => {
      if (isMouseOverSlider.current || isModalOpen) return;

      if (Date.now() - lastInteractionRef.current < 3000) return;

      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + autoScrollDirection;
        if (newIndex >= filteredReviews.length - visibleCards) {
          setAutoScrollDirection(-1);
          newIndex = filteredReviews.length - visibleCards - 1;
        } else if (newIndex < 0) {
          setAutoScrollDirection(1);
          newIndex = 1;
        }
        return newIndex;
      });
    }, 3000);
  };

  useEffect(() => {
    const slider = sliderRef.current;

    function handleWheel(event) {
      event.preventDefault();
      lastInteractionRef.current = Date.now();

      const scrollAmount = 1;

      if (
        event.deltaY > 0 &&
        currentIndex < filteredReviews.length - visibleCards
      ) {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + scrollAmount, filteredReviews.length - visibleCards)
        );
      } else if (event.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - scrollAmount, 0));
      }
    }

    function handleResize() {
       if (window.innerWidth <= 768) {
        setVisibleCards(5);
      } else {
        setVisibleCards(4);
      }
    }

    slider.addEventListener('wheel', handleWheel);
    slider.addEventListener('mouseover', () => (isMouseOverSlider.current = true));
    slider.addEventListener('mouseout', () => (isMouseOverSlider.current = false));
    window.addEventListener('resize', handleResize);
    handleResize();
    startAutoScroll();

    return () => {
      slider.removeEventListener('wheel', handleWheel);
      slider.removeEventListener('mouseover', () => (isMouseOverSlider.current = true));
      slider.removeEventListener('mouseout', () => (isMouseOverSlider.current = false));
      window.removeEventListener('resize', handleResize);
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [currentIndex, filteredReviews.length, visibleCards, isModalOpen]);

    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}.${month}.${year}`;
    }

     function HtlRevCard({ review }) {
    return (
      <div className="htlRev-card">
        <div className="htlRev-card-header">
          <div className="htlRev-user-info">
            <img src={review.avatarUrl} alt={review.username} className="htlRev-avatar" />
            <div className="htlRev-user-details">
              <span className="htlRev-username">{review.username}</span>
              <span className="htlRev-date">{formatDate(review.date)}</span>
            </div>
          </div>
          <div className="htlRev-user-rating">{review.rating.toFixed(1)}</div>
        </div>
        <p className="htlRev-text">{review.text}</p>
      </div>
    );
  }

  function HtlRevModalCard({ review }) {
    const [showFullText, setShowFullText] = useState(false);
  
    const cardStyle = {
      marginBottom: '15px',
      paddingBottom: showFullText || review.text.length === 0 || review.text.length < 20 
        ? '15px' 
        : '80px'
    };
  
    const toggleText = () => {
      setShowFullText(!showFullText);
    };
  
    const truncatedText = review.text.length >= 460 ? review.text.substring(0, 420) + '...' : review.text;
  
    return (
      <div className="htlRev-modal-review-card" style={cardStyle}>
        <div className="htlRev-card-header">
          <div className="htlRev-user-info">
            <img src={review.avatarUrl} alt={review.username} className="htlRev-avatar" />
            <div className="htlRev-user-details">
              <span className="htlRev-username">{review.username}</span>
              <span className="htlRev-date">{formatDate(review.dateAdded)}</span>
            </div>
          </div>
          <div className="htlRev-user-rating">{review.rating.toFixed(1)}</div>
        </div>
        <p className="htlRev-text">
          {showFullText ? review.text : truncatedText}
        </p>
        {review.text.length >= 460 && (
          <span
            className="htlRev-read-more"
            onClick={toggleText}
          >
            {showFullText ? 'Minimize' : 'Read more'}
          </span>
        )}
      </div>
    );
  }

    function HtlRevModal({ isOpen, onClose, reviews, averageRating }) {
      const [isActive, setIsActive] = useState(false);
      const [visibleReviews, setVisibleReviews] = useState(30);
    
      useEffect(() => {
        if (isOpen) {
          setTimeout(() => setIsActive(true), 10);
        } else {
          setIsActive(false);
        }
      }, [isOpen]);
    
      const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setVisibleReviews(visibleReviews + 30);
        }
      };
    
      if (!isOpen) return null;
    
      const displayedReviews = reviews.slice(0, visibleReviews);
    
      const leftColumnReviews = [];
      const rightColumnReviews = [];
      let leftColumnHeight = 0;
      let rightColumnHeight = 0;
    
      displayedReviews.forEach((review) => {
        const paddingBottom = review.text.length === 0 || review.text.length < 20
          ? 15
          : 80;
    
        const adjustedTextLength = review.text.length >= 460 ? 420 : review.text.length;
    
        const reviewHeight = paddingBottom + Math.min(adjustedTextLength * 0.5, 150); 
    
        if (leftColumnHeight <= rightColumnHeight) {
          leftColumnReviews.push(review);
          leftColumnHeight += reviewHeight;
        } else {
          rightColumnReviews.push(review);
          rightColumnHeight += reviewHeight;
        }
      });
    
      return (
        <div className={`htlRev-modal-overlay ${isActive ? 'active' : ''}`} onClick={onClose}>
          <div className="htlRev-modal-content" onClick={e => e.stopPropagation()}>
            <div className="htlRev-modal-header">
              <h2 className="htlRev-modal-title">REVIEWS</h2>
              <div className="htlRev-average-rating htlRev-average-rating-modal">{averageRating.toFixed(1)}</div>
            </div>
            <button className="htlRev-modal-close" onClick={onClose}>×</button>
            <div className="htlRev-modal-body" onScroll={handleScroll}>
              <div className="htlRev-modal-reviews">
                <div className="htlRev-modal-column">
                  {leftColumnReviews.map((review, index) => (
                    <HtlRevModalCard key={index} review={review}  />
                  ))}
                </div>
                <div className="htlRev-modal-column">
                  {rightColumnReviews.map((review, index) => (
                    <HtlRevModalCard key={index} review={review}  />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className="htlRev-container">
            <div className="htlRev-header">
                <h2 className="htlRev-title">REVIEWS</h2>
                <div className="htlRev-average-rating">{averageRating.toFixed(1)}</div>
            </div>
            <div className="htlRev-slider" ref={sliderRef}>
                <div
                  className="htlRev-track"
                  style={{
                    transform: `translateX(-${currentIndex * reviewCardWidth}px)`,
                    width: `${filteredReviews.length * reviewCardWidth}px`,
                    transition: 'transform 0.3s ease', 
                  }}
                >
                    {filteredReviews.map((review, index) => (
                        <HtlRevCard key={index} review={review} />
                    ))}
                </div>
                {currentIndex > 0 && (
                    <button className="htlRev-slider-button htlRev-slider-button-left" onClick={handlePrev}>
                      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.23213 17.2322C0.255822 18.2085 0.255822 19.7915 1.23213 20.7678L17.142 36.6777C18.1183 37.654 19.7013 37.654 20.6776 36.6777C21.6539 35.7014 21.6539 34.1184 20.6776 33.1421L6.53543 19L20.6776 4.85786C21.6539 3.88155 21.6539 2.29864 20.6776 1.32233C19.7013 0.34602 18.1183 0.34602 17.142 1.32233L1.23213 17.2322ZM3 16.5H2.9999L2.9999 21.5H3L3 16.5Z" fill="#434343" fillOpacity="0.933333"/>
                      </svg>
                    </button>
                )}
                {currentIndex < filteredReviews.length - visibleCards - 1 && (
                    <button className="htlRev-slider-button htlRev-slider-button-right" onClick={handleNext}>
                      <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.7679 20.7678C21.7442 19.7915 21.7442 18.2085 20.7679 17.2322L4.85797 1.32233C3.88166 0.346018 2.29874 0.346018 1.32243 1.32233C0.34612 2.29864 0.34612 3.88155 1.32243 4.85786L15.4646 19L1.32243 33.1421C0.346118 34.1184 0.346117 35.7014 1.32243 36.6777C2.29874 37.654 3.88165 37.654 4.85796 36.6777L20.7679 20.7678ZM19 21.5L19.0001 21.5L19.0001 16.5L19 16.5L19 21.5Z" fill="#434343" fillOpacity="0.933333"/>
                      </svg>
                    </button>
                )}
            </div>
            <button className="htlRev-see-more-button" onClick={() => setIsModalOpen(true)}>See more</button>
            <HtlRevModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reviews={htlRevData}
                averageRating={averageRating}
            />
            <div className="htlQst-img">
              <img src={HotelQuest} alt="transition" /> 
            </div>
        </div>
    );
}

export default HotelPageReview;