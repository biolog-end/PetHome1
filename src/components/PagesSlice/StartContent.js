import dog from '../Assets/Img/dog.png';
import './StartContent.css';
import BubbleComponent from '../PageParts/BubbleComponent';
import BubblesWhite from '../Assets/Img/BubblesWhite.png';
import BubblesBlue from '../Assets/Img/Bubbles.png';


const StartContent = () => {
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
          <div className="bubbleImageBlue">
          <img src={BubblesBlue} alt="BubblesBlue" />
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
          <div className="bubbleImageWhite"><img src={BubblesWhite} alt="BubblesWhite" /></div>
        </div>
      </div>
    </div>
  );
};

export default StartContent;
