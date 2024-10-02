import React, { useEffect, useRef, useState} from 'react';
import './HotelPageMain.css';


const HotelPageMain = ({ hotel }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalImageIndex, setModalImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

    const htlChangeImage = (direction) => {
        setCurrentImageIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex < 0) {
                newIndex = hotel.images.length - 1;
            } else if (newIndex >= hotel.images.length) {
                newIndex = 0;
            }
            return newIndex;
        });
        setLastInteractionTime(Date.now());
    };

    const htlOpenModal = (index) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
    };

    const htlCloseModal = () => {
        setIsModalOpen(false);
    };

    const htlChangeModalImage = (direction) => {
        setModalImageIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex < 0) {
                newIndex = hotel.images.length - 1;
            } else if (newIndex >= hotel.images.length) {
                newIndex = 0;
            }
            return newIndex;
        });
    };

    useEffect(() => {
        const htlHandleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                if (isModalOpen) {
                    htlChangeModalImage(-1);
                } else {
                    htlChangeImage(-1);
                }
            } else if (event.key === 'ArrowRight') {
                if (isModalOpen) {
                    htlChangeModalImage(1);
                } else {
                    htlChangeImage(1);
                }
            } else if (event.key === 'Escape') {
                htlCloseModal();
            }
            setLastInteractionTime(Date.now());
        };

        document.addEventListener('keydown', htlHandleKeyDown);

        return () => {
            document.removeEventListener('keydown', htlHandleKeyDown);
        };
    }, [isModalOpen]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastInteractionTime > 4000) {
                htlChangeImage(1);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [lastInteractionTime]);

    return (
        <div className="htl-container">
                <HtlHeader hotel={hotel} />
                <HtlContent 
                    hotel={hotel}
                    currentImageIndex={currentImageIndex}
                    changeImage={htlChangeImage}
                    openModal={htlOpenModal}
                    setLastInteractionTime={setLastInteractionTime}
                />
                <HtlBottomImages hotel={hotel} openModal={htlOpenModal} />
                {isModalOpen && (
                    <HtlModal 
                        hotel={hotel}
                        modalImageIndex={modalImageIndex}
                        closeModal={htlCloseModal}
                        changeModalImage={htlChangeModalImage}
                        setModalImageIndex={setModalImageIndex}
                    />
                )}
        </div>
    );
}
function HtlHeader({ hotel }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
      setIsFavorite(!isFavorite);
    };
    return (
        <div className="htl-header">
        <div>
            <div className="htl-hotel-name">{hotel.name}</div>
            <div className="htl-location">
            {hotel.location}{" "}
            <svg
                className="htl-location-icon"
                width="34"
                height="35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M26.02 6.76a13.32 13.32 0 0 1 3.73 9.07c.05 3.4-1.18 6.7-3.45 9.19l-.28.3L20 31.51a4.2 4.2 0 0 1-5.8.2l-.2-.2-6.02-6.19a13.32 13.32 0 0 1-3.73-9.28c0-3.48 1.34-6.82 3.73-9.28A12.57 12.57 0 0 1 17 2.92c3.38 0 6.62 1.38 9.02 3.84ZM17 11.66a4.14 4.14 0 0 0-3 1.29 4.38 4.38 0 0 0-1.25 3.1 4.49 4.49 0 0 0 1.24 3.09A4.24 4.24 0 0 0 17 20.42c1.13 0 2.2-.46 3-1.28a4.44 4.44 0 0 0 0-6.2 4.19 4.19 0 0 0-3-1.27Z"
                fill="#F70"
                />
            </svg>
            </div>
        </div>
        <div className="htl-buttons">
            <button className="htl-btn htl-btn-icon" onClick={handleFavoriteClick}> 
            <svg
                className="htl-icon-heart"
                width="40"
                height="35"
                fill="full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={isFavorite ? 
                        "M28.6 0c-3.4 0-6.5 1.4-8.6 3.8C18 1.4 14.8 0 11.4 0c-3 0-6 1.2-8 3.4A11.7 11.7 0 0 0 0 11.5c0 12.7 18.2 22.8 19 23.2a2 2 0 0 0 2 0c.8-.4 19-10.5 19-23.2 0-3-1.2-6-3.3-8.1-2.2-2.2-5-3.4-8-3.4Z" 
                        : "M28.62 0C25.16 0 22.08 1.39 20 3.77A11.29 11.29 0 0 0 11.38 0a11.3 11.3 0 0 0-8.04 3.39A11.65 11.65 0 0 0 0 11.55c0 12.66 18.24 22.77 19.02 23.2a2.04 2.04 0 0 0 1.96 0C21.76 34.32 40 24.2 40 11.55c0-3.06-1.2-6-3.34-8.16A11.3 11.3 0 0 0 28.62 0Zm-.95 24.91A56.69 56.69 0 0 1 20 30.48a56.69 56.69 0 0 1-7.67-5.57c-3.74-3.25-8.2-8.21-8.2-13.36a7.4 7.4 0 0 1 2.13-5.2 7.19 7.19 0 0 1 5.12-2.15c3.07 0 5.64 1.64 6.7 4.3A2.1 2.1 0 0 0 20 9.8a2.05 2.05 0 0 0 1.92-1.3c1.06-2.66 3.63-4.3 6.7-4.3 1.92 0 3.76.77 5.12 2.15a7.4 7.4 0 0 1 2.12 5.2c0 5.15-4.45 10.1-8.19 13.36Z"} 
                    fill="#F70"
                />
            </svg>
            </button>
            <button className="htl-btn htl-btn-icon">
            <svg
                className="htl-icon-share"
                width="43"
                height="43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="m25.98 11.65-8.96 6.27m8.96 13.43-8.96-6.27m0-3.58a4.48 4.48 0 1 1-8.96 0 4.48 4.48 0 0 1 8.96 0Zm17.92 11.65a4.48 4.48 0 1 1-8.96 0 4.48 4.48 0 0 1 8.96 0Zm0-23.3a4.48 4.48 0 1 1-8.96 0 4.48 4.48 0 0 1 8.96 0Z"
                stroke="#F70"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </button>
            <button className="htl-btn htl-btn-reserve">Reserve</button>
        </div>
        </div>
    );
}
function HtlContent({ hotel, currentImageIndex, changeImage, openModal, setLastInteractionTime }) {
    const htlHandleInteraction = () => {
      setLastInteractionTime(Date.now());
    };
  
    return (
      <div className="htl-content" onMouseMove={htlHandleInteraction} onClick={htlHandleInteraction}>
        <div className="htl-main-image-container">
          <img src={hotel.images[currentImageIndex]} alt="Pet hotel main image" className="htl-main-image" onClick={() => openModal(currentImageIndex)} />
          <button className="htl-arrow htl-arrow-left" onClick={() => changeImage(-1)}>
            <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.23213 17.2322C0.255822 18.2085 0.255822 19.7915 1.23213 20.7678L17.142 36.6777C18.1183 37.654 19.7013 37.654 20.6776 36.6777C21.6539 35.7014 21.6539 34.1184 20.6776 33.1421L6.53543 19L20.6776 4.85786C21.6539 3.88155 21.6539 2.29864 20.6776 1.32233C19.7013 0.34602 18.1183 0.34602 17.142 1.32233L1.23213 17.2322ZM3 16.5H2.9999L2.9999 21.5H3L3 16.5Z" fill="#434343" fillOpacity="0.933333"/>
            </svg>
          </button>
          <button className="htl-arrow htl-arrow-right" onClick={() => changeImage(1)}>
            <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7679 20.7678C21.7442 19.7915 21.7442 18.2085 20.7679 17.2322L4.85797 1.32233C3.88166 0.346018 2.29874 0.346018 1.32243 1.32233C0.34612 2.29864 0.34612 3.88155 1.32243 4.85786L15.4646 19L1.32243 33.1421C0.346118 34.1184 0.346117 35.7014 1.32243 36.6777C2.29874 37.654 3.88165 37.654 4.85796 36.6777L20.7679 20.7678ZM19 21.5L19.0001 21.5L19.0001 16.5L19 16.5L19 21.5Z" fill="#434343" fillOpacity="0.933333"/>
            </svg>
          </button>
        </div>
        <div className="htl-side-images">
          {hotel.images.length > 1 && <img src={hotel.images[1]} alt="Pet hotel side image 1" className="htl-side-image" onClick={() => openModal(1)} />}
          {hotel.images.length > 2 && <img src={hotel.images[2]} alt="Pet hotel side image 2" className="htl-side-image" onClick={() => openModal(2)} />}
          {hotel.images.length > 3 && <img src={hotel.images[3]} alt="Pet hotel side image 3" className="htl-side-image" onClick={() => openModal(3)} />}
        </div>
        <HtlReviews hotel={hotel} />
      </div>
    );
}
function HtlReviews({ hotel }) {
    const averageRating = (hotel.reviews.reduce((a, b) => a + b.rating, 0) / hotel.reviews.length).toFixed(1);
    

    const ratingCounts = hotel.reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
    }, {});


    const ratingPercentages = Object.fromEntries(
        Object.entries(ratingCounts).map(([rating, count]) => [
        rating,
        (count / hotel.reviews.length * 100).toFixed(1)
        ])
    );

    return (
        <div className="htl-reviews">
            <div className={`htl-rating-block ${hotel.logo ? '' : 'no-logo'}`}>
                <div className="htl-reviews-title">REVIEWS</div>
                <div className="htl-rating">{averageRating}</div>
                <div className="htl-rating-bars">
                    {[5, 4, 3, 2, 1].map(rating => (
                        <HtlRatingBar key={rating} rating={rating.toFixed(1)} percentage={ratingPercentages[rating] || 0} />
                    ))}
                </div>
            </div>
            {hotel.logo && <img src={hotel.logo} alt={`${hotel.name} logo`} className="htl-logo" />}
        </div>
    );
}

function HtlRatingBar({ rating, percentage }) {
    return (
        <div className="htl-rating-bar">
            <span className="htl-bar-label">{rating}</span>
            <div className="htl-bar">
                <div className="htl-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}

function HtlBottomImages({ hotel, openModal }) {
    if (hotel.images.length < 5) return null;
    const remainingPhotos = hotel.images.length - 8;
    return (
        <div className="htl-bottom-images">
            <img src={hotel.images[4]} alt="Pet hotel bottom image 1" className="htl-bottom-image" onClick={() => openModal(4)} />
            {hotel.images.length > 5 && <img src={hotel.images[5]} alt="Pet hotel bottom image 2" className="htl-bottom-image" onClick={() => openModal(5)} />}
            {hotel.images.length > 6 && <img src={hotel.images[6]} alt="Pet hotel bottom image 3" className="htl-bottom-image" onClick={() => openModal(6)} />}
            {hotel.images.length > 7 && <img src={hotel.images[7]} alt="Pet hotel bottom image 4" className="htl-bottom-image" onClick={() => openModal(7)} />}
            {hotel.images.length > 8 && (
                <div className="htl-bottom-image-container">
                    <img src={hotel.images[8]} alt="More pet hotel photos available" className="htl-bottom-image" onClick={() => openModal(8)} />
                    {hotel.images.length > 9 && (
                        <div className="htl-more-photos" onClick={() => openModal(8)}><span className="htl-more-photos-text">+{remainingPhotos} photos</span></div>
                    )}
                </div>
            )}
        </div>
    );
}

function HtlModal({ hotel, modalImageIndex, closeModal, changeModalImage, setModalImageIndex }) {
    const thumbnailsRef = useRef(null);

    useEffect(() => {
        if (thumbnailsRef.current) {
            const thumbnailWidth = 64; // 60px width + 4px border
            const scrollPosition = modalImageIndex * thumbnailWidth - (thumbnailsRef.current.offsetWidth / 2) + (thumbnailWidth / 2);
            thumbnailsRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [modalImageIndex]);

    const htlHandleWheel = (e) => {
        if (thumbnailsRef.current) {
            e.preventDefault();
            thumbnailsRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className="htl-modal" style={{ display: 'flex' }}>
            <span className="htl-modal-close" onClick={closeModal}>&times;</span>
            <img className="htl-modal-content" src={hotel.images[modalImageIndex]} alt="Modal image" />
            <div className="htl-modal-navigation">
                <span className="htl-modal-arrow" onClick={() => changeModalImage(-1)}>&#10094;</span>
                <span className="htl-modal-arrow" onClick={() => changeModalImage(1)}>&#10095;</span>
            </div>
            <div className="htl-modal-thumbnails" ref={thumbnailsRef} onWheel={htlHandleWheel}>
                {hotel.images.map((image, index) => (
                    <img 
                        key={index}
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className={`htl-modal-thumbnail ${index === modalImageIndex ? 'active' : ''}`}
                        onClick={() => setModalImageIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelPageMain;
