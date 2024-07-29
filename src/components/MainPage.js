import React, { useEffect, useState } from 'react';
import dog from './Assets/Img/dog.png';
import './MainPage.css';
import BubbleComponent from './BubbleComponent';
const CircularSpinningText = ({ 
  text, 
  color = '#000', 
  repetitions = 1, 
  clockwise = true, 
  paddingPercent = 5 
}) => {
  const [containerSize, setContainerSize] = useState(0);

  React.useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector('.AnimalsImageBackground');
      if (container) {
        setContainerSize(container.offsetWidth);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const createSpinningText = (text) => {
    const fullText = text.repeat(repetitions);
    const radius = containerSize / 2;
    const padding = (paddingPercent / 100) * containerSize;
    const adjustedRadius = radius - padding;
    const fontSize = containerSize * 0.04; 

    return [...fullText].map((char, index) => (
      <span
        key={index}
        style={{
          transform: `rotate(${index * (360 / fullText.length)}deg)`,
          transformOrigin: `0 ${adjustedRadius}px`,
          left: '50%',
          position: 'absolute',
          fontSize: `${fontSize}px`,
          color: color,
          top: `${padding}px`
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div 
      className="spinning-text" 
      style={{
        animation: `spin ${clockwise ? '20s' : '20s reverse'} linear infinite`
      }}
    >
      {createSpinningText(text)}
    </div>
  );
};
const MainContent = () => {
  const blueTopBubbles = [
    { width: '2.6vw', top: '-100%', left: '2%', isFloating: true},
    { width: '6.2vw', top: '-47.2%', left: '5.3%', isFloating: true},
    { width: '3.4vw', top: '-10.5%', left: '14.4%', isFloating: true},
    { width: '4vw', top: '-43.9%', left: '18.9%', isFloating: false},
    { width: '0.6vw', top: '-56.4%', left: '4.8%', isFloating: true},
    { width: '0.6vw', top: '-69.5%', left: '8.2%', isFloating: true},
    { width: '0.6vw', top: '-62.3%', left: '8.65%', isFloating: true},
    { width: '0.6vw', top: '-62.8%', left: '10.05%', isFloating: true},
    { width: '1.5vw', top: '-53.5%', left: '14.6%', isFloating: true},
    { width: '2.1vw', top: '10%', left: '20%', isFloating: true},
    { width: '1.2vw', top: '-46%', left: '24%', isFloating: true},
    { width: '0.6vw', top: '-63.6%', left: '22.7%', isFloating: true},
    { width: '1.1vw', top: '6%', left: '23.1%', isFloating: true},
    { width: '3vw', top: '-18%', left: '34%', isFloating: true},
    { width: '4.5vw', top: '-27.6%', left: '45.2%', isFloating: false},
    { width: '2vw', top: '1.9%', left: '45.6%', isFloating: true},
    { width: '3vw', top: '4.5%', left: '38.9%', isFloating: true},
    { width: '1.8vw', top: '-52%', left: '47.7%', isFloating: true},
    { width: '0.8vw', top: '-29.1%', left: '59.7%', isFloating: true},
    { width: '1.6vw', top: '-16.3%', left: '37.3%', isFloating: true},
    { width: '1.6vw', top: '-45.3%', left: '35.5%', isFloating: true},
    { width: '1.6vw', top: '-30%', left: '40.2%', isFloating: true},
    { width: '0.4vw', top: '-35.6%', left: '51.1%', isFloating: true},
    { width: '0.8vw', top: '-23.9%', left: '52.3%', isFloating: true},
    { width: '0.3vw', top: '-20.5%', left: '51.7%', isFloating: true},
    { width: '0.6vw', top: '-29.5%', left: '34.7%', isFloating: true},
    { width: '0.6vw', top: '-34.5%', left: '33.9%', isFloating: true},

    { width: '6.7vw', top: '-2%', right: '31.7%', isFloating: false},
    { width: '2.5vw', top: '-13%', right: '24.8%', isFloating: true},
    { width: '3vw', top: '-48.6%', right: '38.3%', isFloating: true},
    { width: '3.2vw', top: '-38%', right: '21.5%', isFloating: false},
    { width: '4vw', top: '3.9%', right: '19.9%', isFloating: true},
    { width: '4.6vw', top: '15%', right: '8.5%', isFloating: false},
    { width: '4vw', top: '-67%', right: '-1.6%', isFloating: false},
    { width: '2vw', top: '-24.2%', right: '17.5%', isFloating: true},
    { width: '1.8vw', top: '-23%', right: '4.1%', isFloating: true},
    { width: '2vw', top: '-47%', right: '2%', isFloating: true},
    { width: '1.5vw', top: '-6.3%', right: '11%', isFloating: true},
    { width: '1.5vw', top: '5.4%', right: '15.5%', isFloating: false},
    { width: '1.5vw', top: '33%', right: '20%', isFloating: true},
    { width: '1.3vw', top: '17.8%', right: '5.2%', isFloating: true},
    { width: '1.2vw', top: '20.7%', right: '27.4%', isFloating: true},
    { width: '0.8vw', top: '-52.3%', right: '6.6%', isFloating: true},
    { width: '0.4vw', top: '-11.5%', right: '16.5%', isFloating: true},
    { width: '0.8vw', top: '-15.1%', right: '15.6%', isFloating: true},
    { width: '0.4vw', top: '-26.3%', right: '20.7%', isFloating: true},
    { width: '0.4vw', top: '-16.3%', right: '27.5%', isFloating: true},
    { width: '0.4vw', top: '-16.3%', right: '1%', isFloating: true},
    { width: '1vw', top: '-128.2%', right: '13.5%', isFloating: true},
    { width: '0.6vw', top: '-84.7%', right: '23.8%', isFloating: true},
    
  ];

  const whiteTopBubbles = [
    { width: '1vw', top: '-56%', right: '0.4%', isFloating: false },
    { width: '0.8vw', top: '-31.2%', right: '23%', isFloating: false },
    { width: '0.4vw', top: '-33.5%', right: '22.8%', isFloating: false},
    { width: '1vw', top: '-5%', right: '1%', isFloating: false},
    { width: '0.2vw', top: '0%', right: '2.1%', isFloating: false},
    { width: '1vw', top: '18%', right: '11.2%', isFloating: false},
    { width: '0.5vw', top: '42%', right: '16.4%', isFloating: false},
    { width: '1vw', top: '23%', right: '34.3%', isFloating: false},
    { width: '0.4vw', top: '21.6%', right: '34%', isFloating: false},
    { width: '0.9vw', top: '7.3%', right: '15.6%', isFloating: false},
    { width: '0.7vw', top: '37.6%', right: '2%', isFloating: true},
    { width: '1vw', top: '75.6%', right: '1%', isFloating: true},
    { width: '2.4vw', top: '83.9%', right: '8.9%', isFloating: true},
    { width: '0.4vw', top: '93.7%', right: '1.8%', isFloating: true},
    { width: '0.4vw', top: '90.7%', right: '1.5%', isFloating: true},
    { width: '0.4vw', top: '100.7%', right: '2.9%', isFloating: true},
    { width: '1vw', top: '104%', right: '4%', isFloating: true},
    { width: '1vw', top: '90%', right: '6.6%', isFloating: true},
    { width: '2.4vw', top: '70.6%', right: '13.6%', isFloating: true},
    { width: '3vw', top: '69.6%', right: '23.6%', isFloating: true},
    { width: '2.7vw', top: '88.6%', right: '19.6%', isFloating: true},
    { width: '2.9vw', top: '96.6%', right: '29.3%', isFloating: true},
    { width: '1.2vw', top: '99.6%', right: '32.9%', isFloating: true},
    { width: '1vw', top: '91.8%', right: '23.2%', isFloating: true},
    { width: '1.2vw', top: '55.9%', right: '9.7%', isFloating: true},
    { width: '0.5vw', top: '64.9%', right: '11.4%', isFloating: true},
    { width: '0.5vw', top: '70.9%', right: '9%', isFloating: true},
    { width: '0.3vw', top: '81%', right: '7.9%', isFloating: true},
    { width: '1.2vw', top: '57.9%', right: '27%', isFloating: true},
    { width: '1.2vw', top: '79.6%', right: '35.3%', isFloating: true},
    { width: '0.3vw', top: '70.6%', right: '27.8%', isFloating: true},
    { width: '2.6vw', top: '85.9%', right: '40%', isFloating: true},
    { width: '1.4vw', top: '62.7%', right: '43.8%', isFloating: true},
    { width: '0.6vw', top: '79%', right: '44.8%', isFloating: true},
    { width: '1.2vw', top: '24.1%', right: '44.2%', isFloating: true},
    { width: '0.3vw', top: '36.1%', right: '45.2%', isFloating: true},
    { width: '0.3vw', top: '35.1%', right: '45.8%', isFloating: true},
    { width: '0.4vw', top: '3.2%', right: '46.3%', isFloating: true},
    { width: '1.2vw', top: '9.6%', right: '48.2%', isFloating: true},


    { width: '0.8vw', top: '-39%', left: '21.3%', isFloating: false},
    { width: '0.4vw', top: '-20.5%', left: '47.9%', isFloating: false},
    { width: '0.8vw', top: '-25.5%', left: '47.1%', isFloating: false},
    { width: '1vw', top: '15%', left: '0.6%', isFloating: true},
    { width: '1.4vw', top: '23%', left: '2.8%', isFloating: true},
    { width: '1vw', top: '42.5%', left: '2.2%', isFloating: true},
    { width: '0.5vw', top: '36.5%', left: '5.2%', isFloating: true},
    { width: '0.5vw', top: '44.5%', left: '7.8%', isFloating: true},
    { width: '0.3vw', top: '59.5%', left: '13.9%', isFloating: true},
    { width: '0.3vw', top: '75.5%', left: '11.8%', isFloating: true},
    { width: '0.5vw', top: '80.7%', left: '13.7%', isFloating: true},
    { width: '1.2vw', top: '31%', left: '15.2%', isFloating: true},
    { width: '1.2vw', top: '78.2%', left: '12%', isFloating: true},
    { width: '1.2vw', top: '39.2%', left: '20.9%', isFloating: true},
    { width: '0.6vw', top: '46.6%', left: '20.3%', isFloating: true},
    { width: '0.3vw', top: '63.5%', left: '19.4%', isFloating: true},
    { width: '0.9vw', top: '33%', left: '39%', isFloating: true},
    { width: '2.3vw', top: '46.3%', left: '29.9%', isFloating: true},
    { width: '2.5vw', top: '44.6%', left: '40.7%', isFloating: true},
    { width: '2.3vw', top: '83.6%', left: '42%', isFloating: true},
    { width: '2.2vw', top: '87.6%', left: '30.6%', isFloating: true},
    { width: '2.2vw', top: '98.6%', left: '24%', isFloating: true},
    { width: '1.2vw', top: '54.6%', left: '47.6%', isFloating: true},
    { width: '0.6vw', top: '47.1%', left: '47.2%', isFloating: true},
    { width: '1.8vw', top: '75.6%', left: '38.2%', isFloating: true},
    { width: '0.4vw', top: '89.6%', left: '39.4%', isFloating: true},
    { width: '0.5vw', top: '88.1%', left: '29.2%', isFloating: true},
    { width: '0.5vw', top: '93.1%', left: '23.6%', isFloating: true},
    { width: '0.5vw', top: '100.1%', left: '21.7%', isFloating: true},
    { width: '0.7vw', top: '108%', left: '22.8%', isFloating: true},
    { width: '1vw', top: '62.2%', left: '36%', isFloating: true},
    { width: '0.9vw', top: '43.7%', left: '28%', isFloating: true},
    { width: '1vw', top: '53.7%', left: '26.4%', isFloating: true},
    { width: '1.3vw', top: '76.8%', left: '29.5%', isFloating: true},
  ];

  const [activeText, setActiveText] = useState('CARE');
  const [activeRepetitions, setActiveRepetitions] = useState(25);


  useEffect(() => {
    function IsElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 50 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)-50
      );
    }
    
    function applyStyles(elements, styles) {
      elements.forEach(el => {
        if (IsElementInViewport(el) && !el.hasAttribute('data-styles-applied')) {
          Object.keys(styles).forEach(style => {
            el.style[style] = styles[style];
          });
          el.setAttribute('data-styles-applied', 'true');
          console.log(`${el.className} is now visible and styles applied`);
        }
      });
    }
    

    
    const animalsVision = {
      opacity: '1',
      animation: 'animalFadeIn 1s ease-out forwards'
    };
    
    window.addEventListener('scroll', () => applyStyles(document.querySelectorAll('.AnimalsTopText'), animalsVision));

    const bubleAppear = {
      opacity: '1',
      transform: 'scale(1)'
    };

    const bubblesToShow = document.querySelectorAll('.blueBubble, .whiteBubble, .bottom-static-bubble');
    
    window.addEventListener('scroll', () => applyStyles(bubblesToShow, bubleAppear));
  
    const AnimalsCarousel = document.getElementById('AnimalsCarousel');
    const AnimalsMainImage = document.getElementById('AnimalsMainImage');
    const AnimalsCarouselItems = document.querySelectorAll('.AnimalsCarouselItem');
    const AnimalsNumberSlider = document.getElementById('AnimalsNumberSlider');
    const AnimalsTitleSlider = document.getElementById('AnimalsTitleSlider');
    let AnimalsCurrentRotation = 0;
    const AnimalsImages = [
      'https://img.freepik.com/premium-photo/tiny-kitten-finger-is-held-up-by-finger_727939-1176.jpg',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1',
      'https://static.tildacdn.com/tild3834-3839-4131-b564-633733303065/1615657997823.jpg',
      'https://aqua.laguna-land.ru/storage/app/media/uploaded-files/shutterstock_1915848625.jpg'
    ];
    const texts = ['CARE', 'HEALTH', 'PETCARE', 'COMFORT'];
    const repetitions = [25, 15, 10, 12];
    let AnimalsCurrentImageIndex = 0; 
    const animalsCorouselSpin = {
      opacity: '1',
      animation: 'AnimalsSpinIn 1s ease-out forwards'
    };

    window.addEventListener('scroll', () => applyStyles(document.querySelectorAll('.AnimalsCarousel'), animalsCorouselSpin));
    function AnimalsPositionItems() {
      const a = 21; 
      const b = 43; 
      const centerX = 74.5; 
      const centerY = 81;

      AnimalsCarouselItems.forEach((item, index) => {
        const angle = (index / AnimalsCarouselItems.length) * 2 * Math.PI + AnimalsCurrentRotation;
        const x = centerX + a * Math.cos(angle) - 40; 
        const y = centerY + b * Math.sin(angle) - 40; 
        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
      });
    }

    function AnimalsUpdateSliders() {
      const numberItems = AnimalsNumberSlider.children;
      const titleItems = AnimalsTitleSlider.children;
      
      if (numberItems.length > 0 && titleItems.length > 0) {
        const numberItemHeight = numberItems[0].offsetHeight;
        const titleItemHeight = titleItems[0].offsetHeight;
    
        AnimalsNumberSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * numberItemHeight}px)`;
        AnimalsTitleSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * titleItemHeight}px)`;
      }
    }

    AnimalsCarousel.addEventListener('click', () => {
      AnimalsCurrentRotation += Math.PI / 2;
      AnimalsCurrentImageIndex = (AnimalsCurrentImageIndex + 1) % AnimalsImages.length;
      
      AnimalsPositionItems();
      AnimalsUpdateSliders();
      
      AnimalsMainImage.style.opacity = 0;
      
      setTimeout(() => {
        AnimalsMainImage.src = AnimalsImages[AnimalsCurrentImageIndex];
        AnimalsMainImage.style.opacity = 1;
      }, 250);

      setActiveText(texts[AnimalsCurrentImageIndex]);
      setActiveRepetitions(repetitions[AnimalsCurrentImageIndex]);
    });

    AnimalsPositionItems();
    AnimalsUpdateSliders();
    window.addEventListener('resize', () => {
      AnimalsPositionItems();
      AnimalsUpdateSliders();
    });

    // Corkboard JS
    const corkButtons = document.querySelectorAll('.corkButton');
    const corkNotes = document.querySelectorAll('.corkNote');
    const corkRotations = [
        { start: 377.5, end: 357.5 },
        { start: 22, end: 2 },
        { start: 22, end: 2 },
        { start: 371, end: 351 }
    ];

    const corkNoteTexts = [
        'У нас, ваши животные будут хапи-хапи',
        'Самые лучшие цены и отели на рынке (и в городе тоже, везде вообще)',
        'Только самые лучшие условия для вашего дорогого любимца',
        'Мяу-мяу ^^ ( •̀ ω •́ )✧'
    ];

    function corkShowButton(index) {
        corkButtons[index].style.animation = 'corkFadeIn 0.5s forwards';
        corkButtons[index].style.pointerEvents = 'auto';
    }

    function corkHideButton(index) {
        corkButtons[index].style.animation = 'corkFadeOut 0.5s forwards';
        corkButtons[index].style.pointerEvents = 'none';
    }

    function corkShowNote(index) {
        const note = corkNotes[index];
        const button = corkButtons[index];
        const corkboard = document.querySelector('.corkboard');
        const corkboardRect = corkboard.getBoundingClientRect();

        const buttonRect = button.getBoundingClientRect();
        const buttonLeftPercent = (buttonRect.left - corkboardRect.left) / corkboardRect.width * 100;
        const buttonTopPercent = (buttonRect.top - corkboardRect.top) / corkboardRect.height * 100;

        const noteLeftPercent = buttonLeftPercent - 8.68 + (button.offsetWidth / corkboardRect.width * 100 / 2.5);
        const noteTopPercent = buttonTopPercent - 2.3;

        note.style.left = `${noteLeftPercent}%`;
        note.style.top = `${noteTopPercent}%`;
        note.style.display = 'block';
        note.style.setProperty('--start-rotation', `${corkRotations[index].start}deg`);
        note.style.setProperty('--end-rotation', `${corkRotations[index].end}deg`);
        note.style.animation = 'corkPinned 0.5s ease-out forwards';

        const noteImage = note.querySelector('.corkNoteImage');
        noteImage.style.backgroundImage = `url(https://place.dog/200/${199 + index})`;

        const noteText = note.querySelector('.corkNoteText');
        noteText.textContent = corkNoteTexts[index];
    }

    corkButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            corkHideButton(index);
            corkShowNote(index);
            if (index < corkButtons.length - 1) {
                setTimeout(() => corkShowButton(index + 1), 500);
            }
        });
    });

    corkShowButton(0);

    window.addEventListener('resize', () => {
      AnimalsPositionItems();
      AnimalsUpdateSliders();
      corkNotes.forEach((note, index) => {
          if (note.style.display === 'block') {
              corkShowNote(index);
          }
      });
    });

    // Reviews JS
    const reviewTestimonials = [
      "Потрясающий сервис! Я в восторге от результатов.",
      "Нашла у вас необычный отель в чернобыле, как собачка вернулась, прям СВЕТИЛАСЬ от счастья",
      "Профессионализм на высшем уровне. Спасибо команде!",
      "Мряяяяу! `(*>﹏<*)′",
      "Превзошли все мои ожидания. Обязательно обращусь снова.",
      "Ужасный отель! Отказались взять мою собаку бесплатно, а я же мать!",
      "Индивидуальный подход к каждому клиенту. Это впечатляет!",
      "Чёртов капитализм....",
      "ГАВ-ГАВ, ПАКА!"
    ];

    const reviewCarousel = document.querySelector('.review-carousel');
    const reviewCarouselContainer = document.querySelector('.review-carousel-container');
    if (reviewCarousel.children.length < reviewTestimonials.length) {
      reviewTestimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'review-testimonial-card';
        card.innerHTML = `
          <img src="https://place.dog/${298 + index}/${198 + index}" alt="Милая собака" class="review-testimonial-image">
          <p class="review-testimonial-content">"${testimonial}"</p>
        `;
        
        const baseRotation = index % 2 === 0 ? -5 : 5;
        const randomRotation = Math.random() * 4 - 2; 
        const totalRotation = baseRotation + randomRotation;
        card.style.transform = `rotate(${totalRotation}deg)`;
        
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

      if (movedBy < -100 && reviewCurrentIndex < reviewGetMaxIndex()) {
        reviewCurrentIndex += 1;
      }

      if (movedBy > 100 && reviewCurrentIndex > 0) {
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
      const containerWidth = reviewCarouselContainer.offsetWidth;
      const cardWidth = reviewCarousel.children[0].offsetWidth;
      const visibleCards = Math.floor(containerWidth / cardWidth);
      return Math.max(0, reviewCarousel.children.length - visibleCards) - 1;
    }

    function reviewSetPositionByIndex() {
      const cardWidth = reviewCarousel.children[0].offsetWidth;
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

    reviewSetPositionByIndex();
    reviewStartAutoScroll();

    function handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const introText = document.querySelector('.review-intro-text');
    const outroText = document.querySelector('.review-outro-text');

    observer.observe(introText);
    observer.observe(outroText);

    // Question Block JS
    const questionsNumBalls = 10;
    const questionsBalls = [];
    const questionsQuestionBlock = document.querySelector('.questions-QuestionBlock');
    const questionsContainer = document.querySelector('.questions-container');
    const questionsTitle = questionsContainer.querySelector('h1');
    const questionsParagraph = questionsContainer.querySelector('p');
    const questionsButton = questionsContainer.querySelector('.questions-book-now');

    let questionsAnimationTriggered = false;

    function questionsGetScreenSizeBasedValues() {
      const width = window.innerWidth;
      let minSize, maxSize, minBounceTime, maxBounceTime;

      if (width <= 480) {
        minSize = 15;
        maxSize = 40;
        minBounceTime = 1000;
        maxBounceTime = 2000;
      } else if (width <= 768) {
        minSize = 20;
        maxSize = 50;
        minBounceTime = 1500;
        maxBounceTime = 2500;
      } else if (width <= 1024) {
        minSize = 25;
        maxSize = 60;
        minBounceTime = 2000;
        maxBounceTime = 3000;
      } else {
        minSize = 30;
        maxSize = 85;
        minBounceTime = 2500;
        maxBounceTime = 3500;
      }

      return { minSize, maxSize, minBounceTime, maxBounceTime };
    }

    function questionsCreateBall() {
      const existingBalls = questionsQuestionBlock.querySelectorAll('.questions-tennis-ball');
      if (existingBalls.length >= questionsNumBalls) {
        return null;
      }
    
      const ball = document.createElement('div');
      ball.className = 'questions-tennis-ball';
      questionsQuestionBlock.appendChild(ball);
      
      const speed = 0.5 + Math.random() * 1;
      const angle = Math.random() * Math.PI * 2;
      const { minSize, maxSize, minBounceTime, maxBounceTime } = questionsGetScreenSizeBasedValues();
      const size = minSize + Math.random() * (maxSize - minSize);
      
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      
      return {
        element: ball,
        x: Math.random() * (questionsQuestionBlock.clientWidth - size),
        y: Math.random() * (questionsQuestionBlock.clientHeight - size),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: size,
        nextBounceTime: Date.now() + (minBounceTime + Math.random() * (maxBounceTime - minBounceTime))
      };
    }

    function questionsUpdateBall(ball) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x < 0 || ball.x > questionsQuestionBlock.clientWidth - ball.size) {
        ball.vx = -ball.vx;
        ball.x = Math.max(0, Math.min(ball.x, questionsQuestionBlock.clientWidth - ball.size));
      }
      if (ball.y < 0 || ball.y > questionsQuestionBlock.clientHeight - ball.size) {
        ball.vy = -ball.vy;
        ball.y = Math.max(0, Math.min(ball.y, questionsQuestionBlock.clientHeight - ball.size));
      }

      if (Date.now() >= ball.nextBounceTime) {
        const randomAngle = Math.random() * Math.PI * 2;
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        ball.vx = Math.cos(randomAngle) * speed;
        ball.vy = Math.sin(randomAngle) * speed;
        const { minBounceTime, maxBounceTime } = questionsGetScreenSizeBasedValues();
        ball.nextBounceTime = Date.now() + (minBounceTime + Math.random() * (maxBounceTime - minBounceTime));
      }

      ball.element.style.left = `${ball.x}px`;
      ball.element.style.top = `${ball.y}px`;
    }

    function questionsAnimate() {
      questionsBalls.forEach(questionsUpdateBall);
      requestAnimationFrame(questionsAnimate);
    }

    function questionsInitBalls() {
      questionsBalls.forEach(ball => ball.element.remove());
      questionsBalls.length = 0;
      for (let i = 0; i < questionsNumBalls; i++) {
        const newBall = questionsCreateBall();
        if (newBall) {
          questionsBalls.push(newBall);
        } else {
          break;
        }
      }
    }

    function questionsHandleScroll() {
      if (!questionsAnimationTriggered && IsElementInViewport(questionsContainer)) {
        questionsTitle.style.animation = 'questions-fadeInUp 1s ease forwards';
        questionsParagraph.style.animation = 'questions-fadeInUp 1s ease 0.5s forwards';
        questionsButton.style.animation = 'questions-fadeInScale 1s ease 1s forwards';
        questionsBalls.forEach(ball => {
          ball.element.style.opacity = '0.8';
        });
        questionsAnimationTriggered = true;
      }
    }

    function questionsHandleResize() {
      questionsInitBalls();
      if (questionsAnimationTriggered) {
        questionsBalls.forEach(ball => {
          ball.element.style.opacity = '0.8';
        });
      }
    }
    questionsInitBalls();
    questionsAnimate();

    window.addEventListener('scroll', questionsHandleScroll);
    window.addEventListener('resize', questionsHandleResize);

    questionsHandleScroll();
  }, []);

  return (
    <div>
      {/* Start */}
      <div className="StartContainer">
        <div className="content-top">
          <div className="top-left-text">YOU'RE FAR<br />AWAY,FAR<br />AWAY...</div>
            <div className="main-image-container">
              <img src={dog} alt="Счастливая собака" className="main-image" />
            </div>
          <div className="bottom-right-text">BUT YOUR<br />DOG IS <br />HERE</div>
          <div className="bubbleImage">
            <div className="bubbles-container">
              {blueTopBubbles.map((bubbleConfig, index) => (
                <BubbleComponent 
                  key={index} 
                  config={bubbleConfig} 
                  index={index} 
                  className="blueBubble" 
                  isFloating={true}
                />
              ))}
              {whiteTopBubbles.map((bubbleConfig, index) => (
                <BubbleComponent 
                  key={index} 
                  config={bubbleConfig} 
                  index={index} 
                  className="whiteBubble" 
                  isFloating={true}
                />
              ))}
            </div>
          </div>
          <div className="bubbleImageWhite"></div>
        </div>
      </div>

      {/* AnimalsBlock */}
      <div class="AnimalsBlock">
        <div class="AnimalsMainContent">
          <div class="AnimalsTextCarousel">
            <div class="AnimalsNumberContainer">
              <div class="AnimalsNumberSlider" id="AnimalsNumberSlider">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </div>
            </div>
            <hr/>
            <div class="AnimalsTitleContainer">
              <div class="AnimalsTitleSlider" id="AnimalsTitleSlider">
                <h2>CARE</h2>
                <h2>HEALTH</h2>
                <h2>PET CARE</h2>
                <h2>COMFORT</h2>
              </div>
            </div>
          </div>
          <div class="AnimalsMainImageContainer">
            <div class="AnimalsImageBackground">
              <CircularSpinningText 
                text={activeText}
                color="white" 
                repetitions={activeRepetitions} 
                clockwise={true}
                paddingPercent={2.2}
              />
              <img id="AnimalsMainImage" src="https://img.freepik.com/premium-photo/tiny-kitten-finger-is-held-up-by-finger_727939-1176.jpg" alt="Sleeping dog" class="AnimalsMainImage" />
            </div>
          </div>
          <br /><br />
        </div>
        <div class="AnimalsCarousel" id="AnimalsCarousel">
          <div class="AnimalsCarouselItem">
            <span class="AnimalsEmoji">🐱</span>
          </div>
          <div class="AnimalsCarouselItem">
            <span class="AnimalsEmoji">🐠</span>
          </div>
          <div class="AnimalsCarouselItem">
            <span class="AnimalsEmoji">🦜</span>
          </div>
          <div class="AnimalsCarouselItem">
            <span class="AnimalsEmoji">🐶</span>
          </div>
        </div>
      </div>

      {/* Corkboard */}
      <div className="corkboardBase">
        <div className="corkboard">
          <div id="corkButton1" className="corkButton">1</div>
          <div id="corkButton2" className="corkButton">2</div>
          <div id="corkButton3" className="corkButton">3</div>
          <div id="corkButton4" className="corkButton">4</div>
          <div id="corkNote1" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote2" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote3" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div id="corkNote4" className="corkNote">
            <div className="corkNoteImage"></div>
            <div className="corkNoteText"></div>
          </div>
          <div className="corkTextBlock">
            А теперь посмотрите на услуги для наших любимых клиентов! Няяяяян!~ㅤㅤㅤφ(゜▽゜*)♪
          </div>
          <button className="corkActionButton">Дать нам свои деньги</button>
        </div>
      </div>

      {/* ReviewsBlock */}
      <div className="review-testimonials-section">
        <div className="review-intro-text">Вы нам не верите? Посмотрите на отзывы, что мы сами выбрали разместить на нашем сайте! Ведь как же можно не доверять нам ? （*＾-＾*）</div>
        <div className="review-carousel-container">
          <div className="review-carousel">
            {/* reviews */}
          </div>
        </div>
        <div className="review-outro-text">Все эти отзывы однозначно не выдуманные самими создателями сайта! Честно-честно ⨷</div>
      </div>

      {/* QuestionBlock */}
      <div className="questions-QuestionBlock" id="contacts">
        <div className="questions-container">
          <h1>ЕСТЬ<br />ВОПРОСЫ?</h1>
          <p>СВЯЖИТЕСЬ С НАМИ ПО ТЕЛЕФОНУ <span className="questions-phone-number">858-449-2691</span>.</p>
          <button className="questions-book-now">ЗАБРОНИРОВАТЬ СЕЙЧАС</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
