import React, { useEffect, useState } from 'react';
import care from '../Assets/Img/CARE.png';
import comfort from '../Assets/Img/COMFORT.png';
import petcare from '../Assets/Img/PETCARE.png';
import health from '../Assets/Img/HEALTH.png';
import './AnimalsMain.css';
import CircularSpinningText from '../PageParts/CircularSpinningText';
import AnimatedText from '../PageParts/AnimatedText'


const AnimalsMain = () => {
  const [activeText, setActiveText] = useState('CARE');
  const [activeRepetitions, setActiveRepetitions] = useState(25);

  const texts = ['CARE', 'HEALTH', 'PETCARE', 'COMFORT'];


  useEffect(() => {
    const AnimalsCarousel = document.getElementById('AnimalsCarousel');
    const AnimalsMainImage = document.getElementById('AnimalsMainImage');
    const AnimalsCarouselItems = document.querySelectorAll('.AnimalsCarouselItem');
    const AnimalsNumberSlider = document.getElementById('AnimalsNumberSlider');
    const AnimalsTitleSlider = document.getElementById('AnimalsTitleSlider');
    const AnimalsDescriptionSlider = document.getElementById('AnimalsDescriptionSlider');
    let AnimalsCurrentRotation = 0;
    const AnimalsImages = [
       care,
       health,
       petcare,
       comfort
    ];
    const repetitions = [25, 18, 15, 14];
    let AnimalsCurrentImageIndex = 0; 
    function AnimalsPositionItems() {
      const a = 20.5; 
      const b = 39.5; 
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
    AnimalsPositionItems();
    
    function AnimalsUpdateSliders() {
      const numberItems = AnimalsNumberSlider.children;
      const titleItems = AnimalsTitleSlider.children;
      const descriptionItems = AnimalsDescriptionSlider.children;
    
      if (numberItems.length > 0 && titleItems.length > 0 && descriptionItems.length > 0) {
        const numberItemHeight = numberItems[0].offsetHeight;
        const titleItemHeight = titleItems[0].offsetHeight;
        const descriptionItemWidth = descriptionItems[0].offsetWidth;
    
        AnimalsNumberSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * numberItemHeight}px)`;
        AnimalsTitleSlider.style.transform = `translateY(-${AnimalsCurrentImageIndex * titleItemHeight}px)`;
        AnimalsDescriptionSlider.style.transform = `translateX(-${AnimalsCurrentImageIndex * descriptionItemWidth}px)`;
    
        const currentDescription = descriptionItems[AnimalsCurrentImageIndex];
        const lines = currentDescription.innerHTML.split('<br>');
        currentDescription.innerHTML = lines.map(line => `<span>${line}</span>`).join('<br>');
        
        const spans = currentDescription.querySelectorAll('span');
        spans.forEach((span, index) => {
          setTimeout(() => {
            span.style.animation = 'descriptionFadeInLeft 0.6s forwards';
          }, index * 15); 
        });
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
    document.querySelector('.Animalsbook-button').addEventListener('click', function(e) {
      this.classList.remove('clicked');
      void this.offsetWidth;
      this.classList.add('clicked');
      
      let ripple = document.createElement('div');
      this.appendChild(ripple);
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.addEventListener('animationend', function() {
        ripple.remove();
      });
    });
  }, []);

  return (
    <div>
      {/* AnimalsBlock */}
      <div className="AnimalsBlock">
        <AnimatedText 
          text="OUR SERVICES" 
          className="ourServicesText"
        />
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
            <hr/>
            <div className="AnimalsTitleContainer">
              <div className="AnimalsTitleSlider" id="AnimalsTitleSlider">
                <h2>{texts[0]}</h2>
                <h2>{texts[1]}</h2>
                <h2>{texts[2]}</h2>
                <h2>{texts[3]}</h2>
              </div>
            </div>
          </div>
          <div className="AnimalsDescriptionContainer">
            <div className="AnimalsDescriptionSlider" id="AnimalsDescriptionSlider">
              <h2>We carefully select our hotels to <br/> make your pets feel right at <br/> home.</h2>
              <h2>We ensure that only professional <br/> veterinarians are present in our <br/> hotels to ensure the safety of <br/> your animal.</h2>
              <h2>Our groomers will give your pet a <br/> fabulous experience!</h2>
              <h2>Our hotels have the best <br/> conditions, your pet will <br/> definitely love it!</h2>
            </div>
          </div>
          <div className="AnimalsMainImageContainer">
            <div className="AnimalsImageBackground">
              <div className="AnimalsMainImageHelper"/>
              <CircularSpinningText 
                text={activeText}
                color="#F2E8DF" 
                repetitions={activeRepetitions} 
                clockwise={true}
                paddingPercent={2.2}
                containerClassName="AnimalsImageBackground"
              />
              <img id="AnimalsMainImage" src={care} alt="Sleeping dog" class="AnimalsMainImage" />
            </div>
          </div>
          <br /><br />
          <button class="Animalsbook-button">Book a hotel</button>
        </div>
        <div className="AnimalsCarousel" id="AnimalsCarousel">
          <div className="AnimalsCarouselItem">
            <div className="AnimalsEmoji petCare"/>
          </div>
          <div className="AnimalsCarouselItem">
            <div className="AnimalsEmoji health"/>
          </div>
          <div className="AnimalsCarouselItem">
            <div className="AnimalsEmoji care"/>
          </div>
          <div className="AnimalsCarouselItem">
            <div className="AnimalsEmoji comfort"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalsMain;
