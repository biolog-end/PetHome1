import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import dog from './Assets/Img/dog.png';
import './MainPage.css';
const BubbleComponent = ({ config, index, className }) => {
  const bubbleRef = useRef(null);
  const [isPopped, setIsPopped] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const navigate = useNavigate();

  const bubbleStyle = {
    ...config,
    height: config.width,
    backgroundColor: isSpecial ? 'rgba(255, 0, 0, 0.5)' : `rgba(242, 174, 114, ${Math.random() * (0.8 - 0.5) + 0.5})`,
    '--bubble-width': config.width,
    transition: 'all 0.3s ease-out',
    opacity: isPopped ? 0 : 1,
    transform: isPopped ? 'scale(0)' : 'scale(1)',
  };

  const popBubble = () => {
    if (isSpecial) {
      navigate('/secretgame');
      return;
    }

    setIsPopped(true);
    playPopSound();
    createSplashEffect();

    setTimeout(() => {
      setIsPopped(false);
      if (Math.random() < 0.2) {
        setIsSpecial(true);
      }
    }, Math.random() * 2000 + 1000);
  };

  const playPopSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const createSplashEffect = () => {
    const splash = document.createElement('div');
    splash.className = 'splash';
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.transform = `rotate(${i * 45}deg) translateY(-50px)`;
      splash.appendChild(particle);
    }
    bubbleRef.current.appendChild(splash);
    setTimeout(() => {
      splash.remove();
    }, 300);
  };

  return (
    <div
      ref={bubbleRef}
      className={`${className} ${isSpecial ? 'special-bubble' : ''}`}
      style={bubbleStyle}
      onClick={popBubble}
    />
  );
};
const MainContent = () => {
  const bubbleConfigs = [
    { width: '21vw', top: '37%', left: '24.3%' },
    { width: '8vw', top: '20%', left: '21%' },
    { width: '22.5vw', top: '30%', right: '18%' },
    { width: '21vw', top: '-23%', right: '1%' },
    { width: '26.2vw', top: '26%', left: '-1%' },
    { width: '20vw', top: '63%', right: '0%' },
    { width: '18.3vw', top: '148%', right: '5%' },
    { width: '20vw', top: '77%', left: '42%' },
    { width: '19vw', top: '-5%', left: '42%' },
    { width: '17.5vw', top: '140%', left: '4%' }
  ];

  const middleBubbleConfigs = [
    { width: '6vw', top: '-50%', right: '27%' },
    { width: '7.3vw', top: '-14%', left: '26%' },
    { width: '4vw', top: '40%', left: '15%' }
  ];

  const bottomStaticBubbleConfigs = [
    { width: '8vw', top: '5%', left: '23%' },
    { width: '16vw', top: '45%', left: '14.1%' },
    { width: '24.5vw', top: '25%', left: '30%' },
    { width: '12vw', top: '-9%', left: '68%' },
    { width: '11vw', top: '14%', left: '84%' },
    { width: '18vw', top: '35%', left: '-3.6%' },
    { width: '8vw', top: '99.9%', left: '25.4%' },
    { width: '14vw', top: '22%', left: '55%' },
    { width: '17vw', top: '47.9%', left: '68.4%' },
    { width: '8.3vw', top: '98.4%', left: '10%' },
    { width: '12vw', top: '81.8%', left: '53%' },
    { width: '6vw', top: '108%', left: '65%' },
    { width: '15vw', top: '69%', left: '86%' }
  ];
  useEffect(() => {
    function IsElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
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
    
    const bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach((bubble, index) => {
      const randomOpacity = Math.random() * (0.7 - 0.5) + 0.5;
      bubble.style.backgroundColor = `rgba(242, 174, 114, ${randomOpacity})`;
    });

    const bubleAppear = {
      opacity: '1',
      transform: 'scale(1)'
    };

    const bubblesToShow = document.querySelectorAll('.bottom-bubble, .middle-bubble, .bottom-static-bubble');
    
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
    let AnimalsCurrentImageIndex = 2; 
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
      const containerWidth = document.querySelector('.AnimalsBlock').offsetWidth;
      const scaleFactor = containerWidth / 1920;
      const numberSlideHeight = 91 * scaleFactor + 1.5;
      const titleSlideHeight = 125 * scaleFactor - 1;

      AnimalsNumberSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * numberSlideHeight}px)`;
      AnimalsTitleSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * titleSlideHeight}px)`;
    }

    AnimalsCarousel.addEventListener('click', () => {
      AnimalsCurrentRotation += Math.PI / 2; 
      AnimalsCurrentImageIndex = (AnimalsCurrentImageIndex + 1) % AnimalsImages.length;
      
      AnimalsPositionItems();
      
      AnimalsNumberSlider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      AnimalsTitleSlider.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
      AnimalsUpdateSliders();
      
      setTimeout(() => {
        AnimalsNumberSlider.style.transition = 'none';
        AnimalsTitleSlider.style.transition = 'none';
        if (AnimalsCurrentImageIndex === 0) {
          AnimalsNumberSlider.style.transform = 'translateY(0)';
          AnimalsTitleSlider.style.transform = 'translateY(0)';
        }
      }, 500);
      
      AnimalsMainImage.style.opacity = 0;
      
      setTimeout(() => {
        AnimalsMainImage.src = AnimalsImages[AnimalsCurrentImageIndex];
        AnimalsMainImage.style.opacity = 1;
      }, 250);
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
        </div>
        <div className="bottom-content">
          <div className="bubbles-container">
            {bubbleConfigs.map((bubbleConfig, index) => (
              <BubbleComponent key={index} config={bubbleConfig} index={index} className="bottom-bubble" />
            ))}
          </div>
          <div className="bottom-text">
            Хотите чтобы ваш питомец<br />
            был счастлив в ваше<br />
            отсутствие?
            <button className="cta-button">Арендовать Отель</button>
          </div>
        </div>
        <div className="AnimalsTopText">Вы можете нам прислать практически любой тип домашнего животного! От домашнего микроба, и до медведя! <br /> Например....</div>
        <div className="bubbles-container">
          {middleBubbleConfigs.map((bubbleConfig, index) => (
            <BubbleComponent key={index} config={bubbleConfig} index={index} className="middle-bubble" />
          ))}
        </div>
      </div>

      {/* AnimalsBlock */}
      <div className="AnimalsBlock">
        <div className="bubbles-container" style={{marginTop: '43%', height: '32%', zIndex: '100'}}>
          {bottomStaticBubbleConfigs.map((bubbleConfig, index) => (
            <BubbleComponent key={index} config={bubbleConfig} index={index} className="bottom-static-bubble" />
          ))}
        </div>
        <div className="AnimalsEllipse"></div>
        <div className="AnimalsMainContent">
          <div className="AnimalsTextCarousel">
            <div className="AnimalsNumberContainer">
              <div className="AnimalsNumberSlider" id="AnimalsNumberSlider">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </div>
            </div>
            <div className="AnimalsTitleContainer">
              <div className="AnimalsTitleSlider" id="AnimalsTitleSlider">
                <h2>CATS</h2>
                <h2>DOGS</h2>
                <h2>PARROTS</h2>
                <h2>FISH</h2>
              </div>
            </div>
          </div>
          <div className="AnimalsMainImageContainer">
            <div className="AnimalsImageBackground"></div>
            <img id="AnimalsMainImage" src="https://static.tildacdn.com/tild3834-3839-4131-b564-633733303065/1615657997823.jpg" alt="Sleeping dog" className="AnimalsMainImage" />
          </div>
          <br /><br />
        </div>
        <div className="AnimalsCarousel" id="AnimalsCarousel">
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐱</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐠</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🦜</span>
          </div>
          <div className="AnimalsCarouselItem">
            <span className="AnimalsEmoji">🐶</span>
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
