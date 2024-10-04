// HotelPage.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HotelPage.css';
import HotelPageMain from '../PagesSlice/HotelPageMain';
import HotelPageInfoPrices from '../PagesSlice/HotelPageInfoPrices';
import HotelPageReview from '../PagesSlice/HotelPageReview';
import HotelPageQuestions from '../PagesSlice/HotelPageQuestions';

const HotelPage = () => {
  const { id } = useParams(); 
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/Hotels/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch hotel data.');
        }

        const data = await response.json();

        const mappedHotel = {
          name: data.name,
          location: data.location,
          images: data.photoUrls,
          logo: data.largeLogoUrl,
          vet: data.vetPrice !== -1,
          groomer: data.groomerPrice !== -1,
          camera: data.cctvPrice !== -1,
          description: data.description,
          pricePerNight: data.pricePerNight,
          groomerPrice: data.groomerPrice,
          vetPrice: data.vetPrice,
          cameraPrice: data.cctvPrice,
          reviews: data.reviews,
          averageRating: data.averageRating,
          percentage1Star: data.percentage1Star,
          percentage2Star: data.percentage2Star,
          percentage3Star: data.percentage3Star,
          percentage4Star: data.percentage4Star,
          percentage5Star: data.percentage5Star,
          reviewCount: data.reviewCount
        };

        console.log("l" + mappedHotel.reviews);
        console.log("9" + data.reviews);

        setHotel(mappedHotel);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch only if ID is present and valid
    if (id && id !== '0') {
      fetchHotel();
    } else {
      setError('Invalid hotel ID.');
      setIsLoading(false);
    }
  }, [id]);

  const hotelPageInfoPricesData = hotel
    ? {
        vet: hotel.vet,
        groomer: hotel.groomer,
        camera: hotel.camera,
        description: hotel.description,
        pricePerNight: hotel.pricePerNight,
        groomerPrice: hotel.groomerPrice,
        vetPrice: hotel.vetPrice,
        cameraPrice: hotel.cameraPrice,
      }
    : {};

  const hotelPageMainData = hotel
    ? {
        name: hotel.name,
        location: hotel.location,
        images: hotel.images,
        logo: hotel.logo,
        percentage1Star: hotel.percentage1Star,
        percentage2Star: hotel.percentage2Star,
        percentage3Star: hotel.percentage3Star,
        percentage4Star: hotel.percentage4Star,
        percentage5Star: hotel.percentage5Star,
        reviewCount: hotel.reviewCount,
        averageRating: hotel.averageRating,
      }
    : {};

  const [htlActiveTab, setHtlActiveTab] = useState(0);
  const htlTabs = ['Overview', 'Info & Prices', 'Reviews', 'Contacts'];
  const htlTabRefs = useRef([]);
  const htlContainerRef = useRef(null);
  const contentRefs = useRef([]);

  const htlHandleTabClick = (index) => {
    setHtlActiveTab(index);
    contentRefs.current[index].scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    htlUpdateIndicator();
    window.addEventListener('resize', htlUpdateIndicator);
    return () => window.removeEventListener('resize', htlUpdateIndicator);
  }, [htlActiveTab]);

  const htlUpdateIndicator = () => {
    const htlActiveTabElement = htlTabRefs.current[htlActiveTab];
    const htlContainerElement = htlContainerRef.current;
    if (htlActiveTabElement && htlContainerElement) {
      const htlTabRect = htlActiveTabElement.getBoundingClientRect();
      const htlIndicator = document.querySelector('.htl-tabs-indicator-active');
      if (htlIndicator) {
        htlIndicator.style.width = `${htlTabRect.width}px`;
        htlIndicator.style.left = `${htlActiveTabElement.offsetLeft}px`;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      for (let i = 0; i < contentRefs.current.length; i++) {
        const rect = contentRefs.current[i].getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setHtlActiveTab(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ErrorMessage = () => (
    <div className="error-message" style={{ backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px' }}>
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        style={{ backgroundColor: 'white', color: 'orange', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Reload page
      </button>
    </div>
  );

  return (
    <div className="HotelPageBg">
      {isLoading && (
        <div className="hotelPage-loading-overlay">
          <div className="hotelPage-loading-animation">

          </div>
        </div>
      )}

      {error && !isLoading && <ErrorMessage />}

      {!isLoading && !error && hotel && (
        <>
          <div className="htl-tabs-container" ref={htlContainerRef}>
            <ul className="htl-tabs-list">
              {htlTabs.map((tab, index) => (
                <li
                  key={index}
                  ref={(el) => (htlTabRefs.current[index] = el)}
                  className={`htl-tabs-item ${index === htlActiveTab ? 'htl-tabs-active' : ''}`}
                  onClick={() => htlHandleTabClick(index)}
                >
                  {tab}
                </li>
              ))}
              <div className="htl-tabs-indicator-active"></div>
            </ul>
          </div>

          <div ref={(el) => (contentRefs.current[0] = el)}>
            <HotelPageMain hotel={hotelPageMainData} />
          </div>

          <div ref={(el) => (contentRefs.current[1] = el)}>
            <HotelPageInfoPrices hotel={hotelPageInfoPricesData} />
          </div>

          <div ref={(el) => (contentRefs.current[2] = el)}>
            <HotelPageReview reviewsData={hotel.reviews} averageRat={hotel.averageRating} />
          </div>

          <div ref={(el) => (contentRefs.current[3] = el)}>
            <HotelPageQuestions />
          </div>
        </>
      )}
    </div>
  );
};

export default HotelPage;
