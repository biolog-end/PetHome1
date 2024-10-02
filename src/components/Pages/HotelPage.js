import React, {useEffect, useRef, useState } from 'react';
import './HotelPage.css';
import HotelPageMain from '../PagesSlice/HotelPageMain'
import HotelPageInfoPrices from '../PagesSlice/HotelPageInfoPrices'
import HotelPageReview from '../PagesSlice/HotelPageReview'
import HotelPageQuestions from '../PagesSlice/HotelPageQuestions'

import LogoExample from '../Assets/Img/LogoExample.png';
import PetHotelExmpl1 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl1.png';
import PetHotelExmpl2 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl2.png';
import PetHotelExmpl3 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl3.png';
import PetHotelExmpl4 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl4.png';
import PetHotelExmpl5 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl5.png';
import PetHotelExmpl6 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl6.png';
import PetHotelExmpl7 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl7.png';
import PetHotelExmpl8 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl8.png';
import PetHotelExmpl9 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl9.png';
import PetHotelExmpl10 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl10.png';
import PetHotelExmpl11 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl11.png';
import PetHotelExmpl12 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl12.png';
import PetHotelExmpl13 from '../Assets/Img/PetHotelExmpls/PetHotelExmpl13.png';

const HotelPage = () => {
    const hotel = {
        name: "Uptown Pets Hotel, Philippines",
        location: "Philippines, Cagayan de Oro",
        images: [
          PetHotelExmpl1,
          PetHotelExmpl2,
          PetHotelExmpl3,
          PetHotelExmpl4,
          PetHotelExmpl5,
          PetHotelExmpl6,
          PetHotelExmpl7,
          PetHotelExmpl8,
          PetHotelExmpl9,
          PetHotelExmpl10,
          PetHotelExmpl11,
          PetHotelExmpl12,
          PetHotelExmpl13
      ],
      
        logo: LogoExample, 
        vet: true,
        groomer: true,
        camera: true,
        description: `Lorem ipsum dolor sit amet consectetur. Lectus pellentesque accumsan facilisi aliquam. Velit ullamcorper morbi pretium est tellus dui aliquam nunc. Eu consectetur elit mi id ac commodo. Libero quisque eleifend enim sit blandit. Enim quam amet accumsan id vestibulum adipiscing. Tempus dui neque id in faucibus vitae duis. Faucibus tristique tortor tempor suscipit vel gravida arcu id. Commodo aenean in amet purus leo risus. Vitae pharetra vel nulla lorem ut orci quis eu. Interdum auctor eget ipsum posuere orci aliquam eu. Id non purus arcu urna. Enim duis blandit diam et purus. Justo ut convallis condimentum faucibus quis pellentesque dui. Lectus tortor scelerisque nec augue. Erat ridiculus ipsum viverra vulputate. Fusce enim est vel eu eros mauris nunc. Ac fermentum nullam nisl nunc semper turpis. Fermentum quis at adipiscing a netus metus feugiat orci morbi. Eget faucibus laoreet consequat morbi massa risus. Adipiscing quam sollicitudin nibh ut consectetur consectetur tempus. 

Quam ultrices in eget tincidunt feugiat enim neque risus sit. Condimentum laoreet sit tellus faucibus dignissim pulvinar lacus. Egestas quis maecenas bibendum vitae sapien. Euismod ac libero aliquet ut facilisis vulputate aliquam sem ipsum. Venenatis vulputate at et eu arcu sed a amet. Dictumst scelerisque vel ac aenean aliquam nullam diam pellentesque tincidunt. Elementum laoreet mauris cras at. Quisque turpis sollicitudin nisi tellus dignissim rhoncus auctor nunc. Amet sed sed suspendisse tortor nulla velit facilisis. A porttitor parturient porta massa amet consectetur diam orci dolor. Id odio sit elit risus gravida purus varius. Donec elit magna imperdiet praesent sagittis. Mi ac maecenas in eros gravida. Lacus neque amet metus facilisi cursus congue urna tristique sem. Varius quam at mi bibendum eget malesuada rhoncus pellentesque sed. Vitae accumsan leo lectus aliquam nisl. Suspendisse in diam venenatis in. Eu egestas nulla tortor risus lectus est commodo. Eu id massa pellentesque diam at tristique vitae est. 

Viverra phasellus morbi varius nunc risus adipiscing vulputate arcu velit. Adipiscing risus enim lectus pharetra. Porttitor tincidunt sed nulla proin a fusce. Tellus proin sodales consequat integer non habitant nisl. At velit mi blandit magna adipiscing magna sagittis at. Aenean diam sapien amet scelerisque. Nunc urna lacinia id faucibus tortor nullam ut. Venenatis bibendum euismod urna euismod sem mauris vitae volutpat egestas. Velit pretium pharetra platea quam nunc faucibus. Sit rhoncus donec egestas nullam ullamcorper velit sapien. Non leo pellentesque arcu augue vitae nunc sed tristique laoreet. Lectus diam etiam ut pellentesque feugiat sit mus parturient. Sit convallis nec faucibus est enim. Cum purus enim fringilla arcu. Massa aliquam sagittis nunc sed facilisi aliquam. Vitae tincidunt laoreet nunc mattis mattis vehicula. Eu lorem hendrerit lacus consequat eu enim odio. Ipsum quis eu ipsum id. Arcu arcu blandit massa et elit imperdiet nam. Sit adipiscing massa pharetra nibh porta quam. Porttitor arcu hendrerit mollis sit. Mollis laoreet ultricies neque donec ipsum viverra vivamus pharetra sed. Vitae quis et mi luctus ac ac turpis. Aliquet leo libero egestas at et dui et aliquam lobortis. Fringilla in et pellentesque hendrerit lectus tellus cursus blandit sed. Ipsum interdum ut dolor varius consequat enim varius arcu blandit. Pellentesque eu elementum odio in sed sed arcu. Ultricies lacus diam dolor pharetra nisi auctor. 

At at urna faucibus porttitor faucibus eleifend ut integer. Dui enim lectus ipsum sed. Tempus eget massa et tortor ultrices arcu nullam orci. Scelerisque montes morbi vel penatibus dictum velit in id enim. Mauris quis vulputate donec quis. Hendrerit vitae duis morbi vel. Dolor viverra quis augue risus. Et nunc maecenas diam massa nisl risus. Eget gravida turpis in ut elit. Nunc facilisi aliquet cursus tincidunt. Vitae sed neque mollis sit in. Leo sed commodo nec consectetur. Orci vulputate pellentesque vel donec et. Ac pharetra non egestas sed nec eu vestibulum nunc. Amet purus in nibh adipiscing ut sed dapibus condimentum nibh. Nec non habitant arcu ultricies. Pulvinar vulputate mi duis commodo volutpat. Ut tristique mi viverra massa dictum. 

Lacinia quis nulla posuere pellentesque velit. Augue semper velit phasellus cursus. Aliquam sed eget nullam leo dictum neque loortis. Auctor vel non dolor leo. Eleifend malesuada amet tellus aliquam pellentesque sed condimentum etiam. Eu nunc dui molestie in. Ac porta risus vitae sagittis dolor. Etiam nisl magna cursus diam auctor amet. Enim ullamcorper maecenas sit faucibus feugiat integer gravida et sit. Elementum in blandit enim fermentum fringilla placerat tempor. Volutpat magna arcu viverra congue vitae tristique vulputate. Erat velit scelerisque sapien eleifend pretium vestibulum phasellus elit interdum. Tortor lectus ut amet tortor neque sed. `,
        pricePerNight: 30,
        groomerPrice: 15,
        vetPrice: 20,
        cameraPrice: 10,
        reviews: [
            {
              user: {
                username: "blueladybug463",
                date: new Date(2023, 0, 5),
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              rating: 4,
              text: "The most beautiful hotel, my dog ​​was so happy that he didn’t want to go back home👍"
            },
            {
              user: {
                username: "CosmicVibe",
                date: new Date(2023, 2, 12),
                avatar: "https://randomuser.me/api/portraits/women/2.jpg",
              },
              rating: 5,
              text: `I always dreamed of giving my pet to such a hotel and was always afraid to give him there, but after I contacted this hotel, all my doubts disappeared. This hotel provides a wide range of functions and I don’t regret choosing it one bit.
          The managers are good and conscientious and the service is at the highest level.
          I arrived after the holiday as satisfied as possible, and my dog ​​was happy❤️❤️❤️
          `
            },
            {
              user: {
                username: "steelserpent",
                date: new Date(2023, 4, 28),
                avatar: "https://randomuser.me/api/portraits/men/3.jpg",
              },
              rating: 5,
              text: `Ich bin so cool, ich habe meinen Hund in ein Hotel gegeben, sie haben versprochen, dass mit dem Hund alles in Ordnung sein würde, und weißt du was, alles ist wirklich in Ordnung, ich bin schockiert, weil ich unsicher bin all dies und all das, aber ich bin sehr glücklich und froh, dass alles in Ordnung ist. Kommen Sie einfach so in mein Café und schätzen Sie das Projekt dieser Studenten, sie haben sich sehr viel Mühe gegeben.
Geben Sie ihnen allen die Höchstpunktzahl. Sie wussten übrigens, dass es auf dieser Website einen Link gibt, für den Sie ein Abzeichen erhalten können. Sie wussten es nicht, jetzt werden Sie es wissen. Das ist übrigens das, was Sie alle brauchen. Ich bin nicht dumm, ich bin nur sehr narzisstisch.😜`
            },{
              user: {
                username: "HappyPawParent",
                date: new Date(2023, 6, 1),
                avatar: "https://randomuser.me/api/portraits/women/23.jpg"
              },
              rating: 5,
              text: "This pet hotel exceeded all my expectations! The staff were incredibly caring and attentive to my furry friend. The facilities were clean and spacious, and my dog came back happy and healthy. I highly recommend this hotel to anyone looking for top-notch pet care."
            },
            {
              user: {
                username: "AdventurePup",
                date: new Date(2023, 10, 22),
                avatar: "https://randomuser.me/api/portraits/men/54.jpg"
              },
              rating: 5,
              text: "I was so nervous leaving my dog for the first time, but the staff at this pet hotel put me at ease immediately. They sent me daily updates and photos, and I could tell my dog was having a blast! I'll definitely be using their services again."
            },
            {
              user: {
                username: "FelineFanatic",
                date: new Date(2023, 11, 30),
                avatar: "https://randomuser.me/api/portraits/women/87.jpg"
              },
              rating: 5,
              text: "My cat is usually quite shy, but she warmed up to the staff at this pet hotel right away. They provided her with plenty of attention and playtime, and she even made some new feline friends! I'm so grateful for their excellent care."
            },
            {
              user: {
                username: "PamperedPets",
                date: new Date(2022, 1, 8), 
                avatar: "https://randomuser.me/api/portraits/men/12.jpg"
              },
              rating: 5,
              text: "This pet hotel is truly a haven for animals! The staff goes above and beyond to ensure every pet's comfort and happiness. My dog received personalized attention and care, and I could tell he felt right at home. I wouldn't hesitate to recommend this hotel to any pet owner."
            },
            {
              user: {
                username: "BestPetStay",
                date: new Date(2022, 5, 20),
                avatar: "https://randomuser.me/api/portraits/women/65.jpg"
              },
              rating: 5,
              text: "From the moment I dropped off my pet, I knew they were in good hands. The staff was friendly and professional, and the facilities were immaculate. My pet received exceptional care and attention, and I felt completely comfortable leaving them in their care. This is the best pet hotel I've ever experienced!"
            },
            {
              user: {
                username: "KitaMariko",
                date: new Date(2022, 7, 10),
                avatar: "https://randomuser.me/api/portraits/women/4.jpg",
              },
              rating: 4,
              text: "私はアンチョビが大好きなので、このチームに満点を付けます。"
            },
            {
              user: {
                username: "AlexWong",
                date: new Date(2022, 9, 2),
                avatar: "https://randomuser.me/api/portraits/men/5.jpg",
              },
              rating: 3,
              text: "Average stay. Nothing special."
            },
            {
              user: {
                username: "SophiaMiller",
                date: new Date(2022, 11, 18),
                avatar: "https://randomuser.me/api/portraits/women/6.jpg",
              },
              rating: 4,
              text: "Fantastic hotel for both business and leisure. The meeting rooms were well-equipped, and the rooftop bar was perfect for unwinding after a long day. Will definitely return!"
            },
            {
              user: {
                username: "DavidLee",
                date: new Date(2021, 3, 14),
                avatar: "https://randomuser.me/api/portraits/men/7.jpg",
              },
              rating: 4,
              text: "A hidden gem in the heart of the city. The hotel's unique design and attention to detail made our stay truly special. The staff went above and beyond to ensure our comfort."
            },
            {
              user: {
                username: "OliviaGarcia",
                date: new Date(2021, 6, 5),
                avatar: "https://randomuser.me/api/portraits/women/8.jpg",
              },
              rating: 4,
              text: "An unforgettable experience from start to finish. The hotel's location is perfect for exploring the city. The room was spacious and beautifully decorated. The highlight was definitely the rooftop pool with its panoramic views."
            },
            {
              user: {
                username: "EthanChen",
                date: new Date(2021, 9, 25),
                avatar: "https://randomuser.me/api/portraits/men/9.jpg",
              },
              rating: 1,
              text: "Terrible experience. Avoid this hotel."
            },
            {
              user: {
                username: "AvaWilson",
                date: new Date(2021, 11, 11),
                avatar: "https://randomuser.me/api/portraits/women/10.jpg",
              },
              rating: 4,
              text: "Lovely stay overall. The breakfast was particularly impressive with a wide variety of options. The only downside was the slow Wi-Fi in some areas of the hotel."
            },
            {
              user: {
                username: "LiamTaylor",
                date: new Date(2020, 0, 2),
                avatar: "https://randomuser.me/api/portraits/men/11.jpg",
              },
              rating: 4,
              text: "Exceptional service and beautiful rooms. The hotel's attention to detail was evident in every aspect of our stay. The concierge was incredibly helpful in arranging tours and restaurant reservations."
            },
            {
              user: {
                username: "IsabellaMartin",
                date: new Date(2020, 2, 29),
                avatar: "https://randomuser.me/api/portraits/women/12.jpg",
              },
              rating: 3,
              text: "Decent hotel but overpriced for what it offers."
            },
            {
              user: {
                username: "TravelGuru",
                date: new Date(2020, 4, 17),
                avatar: "https://randomuser.me/api/portraits/men/13.jpg",
              },
              rating: 5,
              text: "This hotel exceeded all my expectations! The staff was amazing, the room was spotless, and the location was perfect. I would highly recommend it to anyone."
            },
            {
              user: {
                username: "AdventureSeeker",
                date: new Date(2020, 7, 3),
                avatar: "https://randomuser.me/api/portraits/women/14.jpg",
              },
              rating: 4,
              text: "Great hotel with a modern and stylish design. The breakfast buffet was delicious and offered a wide variety of options. The only minor drawback was the noise from the street at night."
            },
            {
              user: {
                username: "FoodieFanatic",
                date: new Date(2020, 10, 12),
                avatar: "https://randomuser.me/api/portraits/men/15.jpg",
              },
              rating: 4,
              text: "The hotel's restaurant was a highlight of our stay. The food was exquisite and the service was impeccable. We also enjoyed the cozy atmosphere of the bar."
            },
            {
              user: {
                username: "CultureEnthusiast",
                date: new Date(2023, 1, 1),
                avatar: "https://randomuser.me/api/portraits/women/16.jpg",
              },
              rating: 5,
              text: "Immersive cultural experience! The hotel's traditional architecture and beautiful gardens transported us to another world. We were also impressed by the staff's knowledge and hospitality."
            },
            {
              user: {
                username: "RelaxationExpert",
                date: new Date(2023, 6, 8),
                avatar: "https://randomuser.me/api/portraits/men/17.jpg",
              },
              rating: 5,
              text: "Perfect for a relaxing getaway. The spa treatments were divine and the pool area was an oasis of tranquility. We left feeling refreshed and rejuvenated."
            },
            {
              user: {
                username: "BudgetTraveler",
                date: new Date(2023, 6, 11),
                avatar: "https://randomuser.me/api/portraits/women/18.jpg",
              },
              rating: 3,
              text: "Affordable and comfortable. The hotel provided good value for money. The rooms were clean and functional, and the staff was friendly and helpful."
            },
            {
              user: {
                username: "SilentReviewer1",
                date: new Date(2023, 11, 8),
                avatar: "https://randomuser.me/api/portraits/men/19.jpg",
              },
              rating: 5,
              text: ""
            },
            {
              user: {
                username: "SilentReviewer2",
                date: new Date(2022, 1, 10),
                avatar: "https://randomuser.me/api/portraits/women/20.jpg",
              },
              rating: 3,
              text: ""
            },
            {
              user: {
                username: "SilentReviewer3",
                date: new Date(2022, 3, 3),
                avatar: "https://randomuser.me/api/portraits/men/21.jpg",
              },
              rating: 4,
              text: ""
            },
            {
              user: {
                username: "SilentReviewer4",
                date: new Date(2022, 3, 3),
                avatar: "https://randomuser.me/api/portraits/women/22.jpg",
              },
              rating: 2,
              text: ""
            },
            {
              user: {
                username: "ShortReview1",
                date: new Date(2022, 3, 3),
                avatar: "https://randomuser.me/api/portraits/men/23.jpg",
              },
              rating: 5,
              text: "Amazing!"
            },
            {
              user: {
                username: "ShortReview2",
                date: new Date(2022, 3, 3),
                avatar: "https://randomuser.me/api/portraits/women/24.jpg",
              },
              rating: 2,
              text: "Very bad."
            }
          ].sort(() => 0.5 - Math.random()) // это для симуляции того что отзывы настоящие
    };

    const hotelPageInfoPricesData = {
        vet: hotel.vet,
        groomer: hotel.groomer,
        camera: hotel.camera,
        description: hotel.description,
        pricePerNight: hotel.pricePerNight,
        groomerPrice: hotel.groomerPrice,
        vetPrice: hotel.vetPrice,
        cameraPrice: hotel.cameraPrice,
      };
    
      const hotelPageMainData = {
        name: hotel.name,
        location: hotel.location,
        images: hotel.images,
        logo: hotel.logo,
        reviews: hotel.reviews.map((review) => ({ rating: review.rating })),
    };

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
        htlIndicator.style.width = `${htlTabRect.width}px`;
        htlIndicator.style.left = `${htlActiveTabElement.offsetLeft}px`;
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
  
    return (
      <div className="HotelPageBg">
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
            <div className="htl-tabs-indicator"></div>
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
          <HotelPageReview rewievsData={hotel.reviews} />
        </div>
  
        <div ref={(el) => (contentRefs.current[3] = el)}>
          <HotelPageQuestions />
        </div>
      </div>
    );
  };
  
  export default HotelPage;
