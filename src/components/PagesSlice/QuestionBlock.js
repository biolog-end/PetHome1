import React, { useEffect, useState} from 'react';
import './QuestionBlock.css';
import BubbleComponent from '../PageParts/BubbleComponent';
import ReviewBubbles from '../Assets/Img/ReviewBubbles.png';


const QuestionBlock = () => {
  const ReviewBubblesBlue = [
    { width: '2.6vw', top: '221%', left: '1.2%', isFloating: true},
    { width: '2.6vw', top: '183.6%', left: '14.8%', isFloating: true},
    { width: '6.7vw', top: '195.2%', left: '8.4%', isFloating: true},
    { width: '1vw', top: '165.6%', left: '10.9%', isFloating: true},
    { width: '1vw', top: '116.2%', left: '9.3%', isFloating: true},
    { width: '3.5vw', top: '141%', left: '17.6%', isFloating: true},
    { width: '1.8vw', top: '163.6%', left: '21.3%', isFloating: true},
    { width: '1vw', top: '150.2%', left: '25.5%', isFloating: true},
    { width: '2.6vw', top: '117.8%', left: '26.3%', isFloating: true},
    { width: '2.7vw', top: '92%', left: '29%', isFloating: true},
    { width: '1.2vw', top: '106.8%', left: '33%', isFloating: true},
    { width: '0.5vw', top: '149.8%', left: '32.5%', isFloating: true},
    { width: '3vw', top: '152.4%', left: '36%', isFloating: true},
    { width: '0.5vw', top: '157.7%', left: '39.8%', isFloating: true},
    { width: '5.5vw', top: '117.1%', left: '37.9%', isFloating: true},
    { width: '3.8vw', top: '142.1%', left: '45.6%', isFloating: false},
    { width: '0.8vw', top: '165.3%', left: '48.6%', isFloating: true},
    { width: '0.8vw', top: '121.5%', left: '50.2%', isFloating: true},
    { width: '5.5vw', top: '162.5%', left: '39.6%', isFloating: true},
    
    { width: '7.3vw', top: '181.6%', right: '3.3%', isFloating: true},
    { width: '5.7vw', top: '236.6%', right: '9.9%', isFloating: true},
    { width: '1.5vw', top: '184.3%', right: '17.8%', isFloating: true},
    { width: '0.7vw', top: '186.3%', right: '16.2%', isFloating: true},
    { width: '7.2vw', top: '177.4%', right: '25.4%', isFloating: true},
    { width: '5.6vw', top: '107.1%', right: '33%', isFloating: false},
    { width: '0.7vw', top: '92.8%', right: '35.5%', isFloating: true},
    { width: '0.7vw', top: '123.6%', right: '41.8%', isFloating: true},
    { width: '0.7vw', top: '153.6%', right: '39.6%', isFloating: true},
    { width: '2.6vw', top: '145.9%', right: '41.3%', isFloating: true},
    { width: '2.6vw', top: '142.1%', right: '31.6%', isFloating: true},
    { width: '1.8vw', top: '157.9%', right: '25.9%', isFloating: true},
  ];

  const ReviewBubblesWhite = [
    { width: '1.9vw', top: '69.9%', left: '7.3%', isFloating: true},
    { width: '0.7vw', top: '95%', left: '5.9%', isFloating: true},
    { width: '0.45vw', top: '95.65%', left: '13.15%', isFloating: true},
    { width: '0.43vw', top: '90.55%', left: '13.55%', isFloating: true},
    { width: '0.4vw', top: '96.95%', left: '20.09%', isFloating: true},
    { width: '0.4vw', top: '96.95%', left: '21.49%', isFloating: true},
    { width: '0.35vw', top: '120.85%', left: '22.59%', isFloating: true},
    { width: '0.3vw', top: '133.25%', left: '25.69%', isFloating: true},
    { width: '0.3vw', top: '148.55%', left: '26.49%', isFloating: true},
    { width: '0.3vw', top: '181.55%', left: '14.58%', isFloating: true},
    { width: '0.3vw', top: '124.45%', left: '10.86%', isFloating: true},
    { width: '0.3vw', top: '125.85%', left: '9.46%', isFloating: true},
    { width: '0.45vw', top: '137.25%', left: '3.05%', isFloating: true},
    { width: '0.58vw', top: '50.55%', left: '18.55%', isFloating: true},
    { width: '1.7vw', top: '87.9%', left: '10.9%', isFloating: true},
    { width: '1.8vw', top: '130.3%', left: '14.3%', isFloating: true},
    { width: '2.3vw', top: '101.3%', left: '20%', isFloating: true},
    { width: '2.4vw', top: '68.6%', left: '27.6%', isFloating: true},
    { width: '1.8vw', top: '151.7%', left: '30%', isFloating: true},
    { width: '1.6vw', top: '147.4%', left: '45.9%', isFloating: false},
    { width: '0.6vw', top: '156.4%', left: '47.2%', isFloating: false},
    { width: '2.4vw', top: '92.8%', left: '44.1%', isFloating: true},
    { width: '0.5vw', top: '97.9%', left: '48.7%', isFloating: true},
    
    { width: '5.7vw', top: '108.5%', right: '3.1%', isFloating: true},
    { width: '0.7vw', top: '105%', right: '1.6%', isFloating: true},
    { width: '0.8vw', top: '136.2%', right: '9.3%', isFloating: true},
    { width: '0.7vw', top: '156.5%', right: '1.6%', oating: true},
    { width: '1.3vw', top: '163.1%', right: '2.3%', isFloating: true},
    { width: '1.3vw', top: '98.1%', right: '10.1%', isFloating: true},
    { width: '1.4vw', top: '88.6%', right: '23%', isFloating: true},
    { width: '0.7vw', top: '100.4%', right: '26.1%', isFloating: true},
    { width: '3.6vw', top: '100.4%', right: '21.3%', isFloating: true},
    { width: '2.4vw', top: '68.4%', right: '38.9%', isFloating: true},
    { width: '5.7vw', top: '62.4%', right: '43.2%', isFloating: true},
    { width: '0.9vw', top: '120.9%', right: '35.7%', isFloating: false},
    { width: '0.9vw', top: '126.5%', right: '36.6%', isFloating: false},

  ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function IsElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 20 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)-20
        );
      }
      
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
    questionsInitBalls();
    questionsAnimate();

    window.addEventListener('scroll', questionsHandleScroll);

    questionsHandleScroll();
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateProportionalTop = (originalTop) => {
    const baseWidth = 1515; 
    const proportion = windowWidth / baseWidth;
    return originalTop * proportion;
  };

  return (
    <div>
      {/* QuestionBlock */}
      <div className="questions-QuestionBlock" id="contacts">
        <div className="ReviewBubblesImage">
          <img src={ReviewBubbles} alt="ReviewBubbles" />
          <div className="bubbles-container">
            {ReviewBubblesBlue.map((bubbleConfig, index) => (
              <BubbleComponent
                key={index}
                config={{
                  ...bubbleConfig,
                  top: calculateProportionalTop(parseFloat(bubbleConfig.top.replace('%', ''))) + '%'
                }}
                index={index}
                className="blueBubble"
                isFloating={true}
              />
            ))}
            {ReviewBubblesWhite.map((bubbleConfig, index) => (
              <BubbleComponent
                key={index}
                config={{
                  ...bubbleConfig,
                  top: calculateProportionalTop(parseFloat(bubbleConfig.top.replace('%', ''))) + '%'
                }}
                index={index}
                className="whiteBubble"
                isFloating={true}
              />
            ))}
          </div>
        </div>
        <div className="questions-container">
          <h1>HAVE QUESTIONS?</h1>
          <p>Contact us at <span className="questions-phone-number">858-449-2691</span>.</p>
          <button className="questions-book-now">Contact us</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;
