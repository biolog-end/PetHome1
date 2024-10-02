import React, { useEffect} from 'react';
import './MainPage.css';
import StartContent from '../PagesSlice/StartContent'
import AnimalsMain from '../PagesSlice/AnimalsMain'
import CorkboardPart from '../PagesSlice/CorkboardPart'
import ReviewsBlock from '../PagesSlice/ReviewsBlock'
import QuestionBlock from '../PagesSlice/QuestionBlock'


const MainContent = () => {
  useEffect(() => {
    function IsElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 20 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)-20
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

    const bubleAppear = {
      opacity: '1',
      transform: 'scale(1)'
    };

    const bubblesToShow = document.querySelectorAll('.blueBubble, .whiteBubble, .bottom-static-bubble');
    
    window.addEventListener('scroll', () => applyStyles(bubblesToShow, bubleAppear));

    const animalsCorouselSpin = {
      opacity: '1',
      animation: 'AnimalsSpinIn 1s ease-out forwards'
    };

    window.addEventListener('scroll', () => applyStyles(document.querySelectorAll('.AnimalsCarousel'), animalsCorouselSpin));
  }, []);

  return (
    <div>

      <StartContent/>
      
      <AnimalsMain/>

      <CorkboardPart/>

      <ReviewsBlock/>
      <div className="whiteBgHelper"/>
      <QuestionBlock/>

    </div>
  );
};

export default MainContent;
