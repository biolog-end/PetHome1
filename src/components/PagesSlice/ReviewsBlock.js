import React, { useEffect, useState} from 'react';
import './ReviewsBlock.css';
import AnimatedText from '../PageParts/AnimatedText'
import blueladybug463 from '../Assets/Img/UsersReview/blueladybug463.png';
import CosmicVibe from '../Assets/Img/UsersReview/CosmicVibe.png';
import steelserpent from '../Assets/Img/UsersReview/steelserpent.png';
import KitaMariko from '../Assets/Img/UsersReview/KitaMariko.png';
import rhealoop from '../Assets/Img/UsersReview/rhealoop.png';
import sunnydayz from '../Assets/Img/UsersReview/sunnydayz.png';
import happyowner from '../Assets/Img/UsersReview/happyowner.png';
import luismiguel from '../Assets/Img/UsersReview/luismiguel.png';

const ReviewsBlock = ({ backgroundColor = '#FFFFFF', cardColor = '#F2E8DF'}) => {
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  useEffect(() => {
    // Reviews JS
  const reviewTestimonials = [
    {
      content: "The most beautiful hotel, my dog ​​was so happy that he didn’t want to go back home👍",
      username: "blueladybug463",
      location: "Toledo",
      rating: 9.0,
      avatar: blueladybug463
    },
    {
      content: "I always dreamed of giving my pet to such a hotel and was always afraid to give him there," +
        " but after I contacted this hotel, all my doubts disappeared. This hotel provides a wide range of functions" +
        " and I don’t regret choosing it one bit.\nThe managers are good and conscientious and the service is at the highest" +
        " level. I arrived after the holiday as satisfied as possible, and my dog ​​was happy❤️❤️❤️",
      username: "CosmicVibe",
      location: "La Plata",
      rating: 10.0,
      avatar: CosmicVibe
    },
    {
      content: "Ich bin so cool, ich habe meinen Hund in ein Hotel gegeben, sie haben versprochen, dass" +
        " mit dem Hund alles in Ordnung sein würde, und weißt du was, alles ist wirklich in Ordnung, ich bin" +
        " schockiert, weil ich unsicher bin all dies und all das, aber ich bin sehr glücklich und froh, dass alles" +
        " in Ordnung ist. Kommen Sie einfach so in mein Café und schätzen Sie das Projekt dieser Studenten, sie " +
        "haben sich sehr viel Mühe gegeben. Geben Sie ihnen allen die Höchstpunktzahl. Sie wussten übrigens, dass " +
        "es auf dieser Website einen Link gibt, für den Sie ein Abzeichen erhalten können. Sie wussten es nicht, jetzt" +
        " werden Sie es wissen. Das ist übrigens das, was Sie alle brauchen. Ich bin nicht dumm, ich bin nur sehr narzisstisch.😜",
      username: "steelserpent",
      location: "Mönchengladbach",
      rating: 10.0,
      avatar: steelserpent
    },
    {
      content: "私はアンチョビが大好きなので、このチームに満点を付けます。",
      username: "KitaMariko",
      location: "Tokyo",
      rating: 8.0,
      avatar: KitaMariko
    },
    {
      content: "I'm so glad I gave my pet to this hotel, I liked everything.",
      username: "rhealoop",
      location: "Tira",
      rating: 10.0,
      avatar: rhealoop
    },
    {
        content: "This hotel has exceeded my expectations! The staff was incredibly friendly and took great care of my cat, Luna. " +
                 "When I came to pick her up, she seemed very relaxed and happy. It's clear that she received a lot of love and attention. " +
                 "I will definitely be using their services again. 😊",
        username: "sunnydayz",
        location: "Vancouver",
        rating: 9.0,
        avatar: sunnydayz
    },
    {
        content: "My dog loved it at this hotel, she was very happy, and so was I. Excellent service, everything is top-notch. " +
                "I recommend it to all pet owners who want to leave their beloved pet in safe hands. " +
                "I will use the services of this hotel again. 🥰",
        username: "happyowner",
        location: "Moscow",
        rating: 9.0,
        avatar: happyowner
    },
    {
        content: "¡Este hotel para mascotas es simplemente increíble! Mi perro, Max, se lo pasó de maravilla durante nuestra " +
                 "ausencia. El lugar es hermoso y el personal es muy atento. " +
                 "Estoy muy contento de haber encontrado un lugar de confianza para dejar a mi mascota. 💖",
        username: "luismiguel",
        location: "Barcelona",
        rating: 10.0,
        avatar: luismiguel
    }
  ];

  const reviewCarousel = document.querySelector('.review-carousel');
    const reviewCarouselContainer = document.querySelector('.review-carousel-container');

    function updateCardWidth() {
      const containerWidth = reviewCarouselContainer.offsetWidth;
      let newCardsPerView;
      if (containerWidth >= 2400) {
        newCardsPerView = 6;
      } else if (containerWidth >= 1800) {
        newCardsPerView = 5;
      } else if (containerWidth >= 1200) {
        newCardsPerView = 4;
      } else if (containerWidth >= 900) {
        newCardsPerView = 3;
      } else if (containerWidth >= 600) {
        newCardsPerView = 2;
      } else {
        newCardsPerView = 1;
      }
      setCardsPerView(newCardsPerView);
      const newCardWidth = containerWidth / newCardsPerView - 32;
      setCardWidth(newCardWidth);

      const cards = document.querySelectorAll('.review-testimonial-card');
      cards.forEach(card => {
        card.style.width = `${newCardWidth}px`;
        card.style.backgroundColor = cardColor; 
      });
    }

    if (reviewCarousel.children.length < reviewTestimonials.length) {
      reviewTestimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'review-testimonial-card';
        card.innerHTML = `
          <div class="review-header">
            <div class="review-avatar-container">
              <img src="${testimonial.avatar}" alt="Аватар пользователя" class="review-avatar">
            </div>
            <div class="review-info">
              <div class="review-username">${testimonial.username}</div>
              <div class="review-location">${testimonial.location}</div>
              <div class="review-rating">${testimonial.rating}/10</div>
            </div>
          </div>
          <div class="review-content">${testimonial.content}</div>
        `;
        
        const baseRotation = index % 2 === 0 ? -3 : 3;
        card.style.transform = `rotate(${baseRotation}deg)`;
        
        reviewCarousel.appendChild(card);
      });
    }

    let reviewIsDragging = false;
    let reviewStartPosition = 0;
    let reviewCurrentTranslate = 0;
    let reviewPrevTranslate = 0;
    let reviewAnimationID = 0;
    let reviewCurrentIndex = 0;
    let reviewIsMovingRight = true;
    let reviewAutoScrollInterval;

    function reviewDragStart(e) {
      e.preventDefault();
      reviewStopAutoScroll();
      reviewIsDragging = true;
      reviewStartPosition = reviewGetPositionX(e);
      reviewAnimationID = requestAnimationFrame(reviewAnimation);
      reviewCarousel.style.cursor = 'grabbing';
    }

    function reviewDrag(e) {
      if (reviewIsDragging) {
        const currentPosition = reviewGetPositionX(e);
        reviewCurrentTranslate = reviewPrevTranslate + currentPosition - reviewStartPosition;
      }
    }

    function reviewDragEnd() {
      reviewIsDragging = false;
      cancelAnimationFrame(reviewAnimationID);
      reviewCarousel.style.cursor = 'grab';

      const movedBy = reviewCurrentTranslate - reviewPrevTranslate;

      if (movedBy < -1 && reviewCurrentIndex < reviewGetMaxIndex()) {
        reviewCurrentIndex += 1;
      }

      if (movedBy > 1 && reviewCurrentIndex > 0) {
        reviewCurrentIndex -= 1;
      }

      reviewSetPositionByIndex();
      reviewStartAutoScroll();
    }

    function reviewGetPositionX(e) {
      return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function reviewAnimation() {
      reviewSetCarouselPosition();
      if (reviewIsDragging) requestAnimationFrame(reviewAnimation);
    }

    function reviewSetCarouselPosition() {
      reviewCarousel.style.transform = `translateX(${reviewCurrentTranslate}px)`;
    }

    function reviewGetMaxIndex() {
      return Math.max(0, reviewCarousel.children.length - cardsPerView+1);
    }

    function reviewSetPositionByIndex() {
      const maxIndex = reviewGetMaxIndex();
      reviewCurrentIndex = Math.max(0, Math.min(reviewCurrentIndex, maxIndex));
      reviewCurrentTranslate = reviewCurrentIndex * -cardWidth;
      reviewPrevTranslate = reviewCurrentTranslate;
      reviewSetCarouselPosition();
    }

    function reviewStartAutoScroll() {
      reviewStopAutoScroll();
      reviewAutoScrollInterval = setInterval(() => {
        const maxIndex = reviewGetMaxIndex();

        if (reviewIsMovingRight) {
          if (reviewCurrentIndex < maxIndex) {
            reviewCurrentIndex++;
          } else {
            reviewIsMovingRight = false;
            reviewCurrentIndex--;
          }
        } else {
          if (reviewCurrentIndex > 0) {
            reviewCurrentIndex--;
          } else {
            reviewIsMovingRight = true;
            reviewCurrentIndex++;
          }
        }

        reviewSetPositionByIndex();
      }, 3000);
    }

    function reviewStopAutoScroll() {
      clearInterval(reviewAutoScrollInterval);
    }

    reviewCarousel.addEventListener('mousedown', reviewDragStart);
    reviewCarousel.addEventListener('mousemove', reviewDrag);
    reviewCarousel.addEventListener('mouseup', reviewDragEnd);
    reviewCarousel.addEventListener('mouseleave', reviewDragEnd);

    reviewCarousel.addEventListener('touchstart', reviewDragStart);
    reviewCarousel.addEventListener('touchmove', reviewDrag);
    reviewCarousel.addEventListener('touchend', reviewDragEnd);

    reviewCarousel.addEventListener('contextmenu', (e) => e.preventDefault());

    window.addEventListener('resize', () => {
      updateCardWidth();
      reviewSetPositionByIndex();
      reviewStopAutoScroll();
      reviewStartAutoScroll();
    });

    reviewCarousel.addEventListener('wheel', (e) => {
      e.preventDefault();
      reviewStopAutoScroll();
      const delta = Math.sign(e.deltaY);
      if (delta > 0 && reviewCurrentIndex < reviewGetMaxIndex()) {
        reviewCurrentIndex += 1;
      } else if (delta < 0 && reviewCurrentIndex > 0) {
        reviewCurrentIndex -= 1;
      }
      reviewSetPositionByIndex();
      reviewStartAutoScroll();
    });

    updateCardWidth();
    reviewSetPositionByIndex();
    reviewStartAutoScroll();
  }, [cardWidth, cardsPerView]);

  return (
    <div className="review-testimonials-section" style={{ backgroundColor }}>
      <AnimatedText 
        text="OUR SATISFIED" 
        className="ourSarisfiedText"
        spaceClassName="ourSarisfiedSpace"
        direction="left-right"
      />
      <AnimatedText 
        text="CLIENTS" 
        direction="right-left"
      />
      <div className="review-carousel-container">
        <div className="review-carousel">
          {/* reviews */}
        </div>
      </div>
      <p className="review-bottom-text">Leave your review and become one of the happy users.</p>
    </div>
  );
};

export default ReviewsBlock;
