//import React, { useState, useEffect, useRef } from 'react';
import FlyPictures from '../PageParts/FlyPictures';
import ChatalogBlock from '../PagesSlice/ChatalogBlock'
import PageHotelsQuestions from '../PagesSlice/PageHotelsQuestions';
import AnimatedText from '../PageParts/AnimatedText'
import ReviewsBlock from '../PagesSlice/ReviewsBlock'


import DogFood from '../Assets/Img/DogFood.png';
import Ball from '../Assets/Img/Ball.png';
import Bone from '../Assets/Img/bone.png';


import CatFood from '../Assets/Img/CatFood.png';
import Mouse from '../Assets/Img/Mouse.png';
import FishBones from '../Assets/Img/FishBones.png';

import './ChatalogPage.css';
  function ChatalogPage() {
    const topflyImages = [
        { src: Ball, alt: "ballGreen" },
        { src: Bone, alt: "boneDog" },
        { src: DogFood, alt: "fooddog" },
        { src: Ball, alt: "ballGreen" },
        { src: Bone, alt: "boneDog" },
        { src: DogFood, alt: "fooddog" }
    ];
    
    const topflyImagesSettings = [
        { width: 325, height: 325, offsetX: -29, offsetY: 0, rotate: -15, zIndex: 2 },
        { width: 470, height: 460, offsetX: -100, offsetY: -17, rotate: 0, zIndex: 1 },
        { width: 280, height: 200, offsetX: 7, offsetY: -15, rotate: 0, zIndex: 3 },
        { width: 325, height: 325, offsetX: -17, offsetY: -14, rotate: 0, zIndex: 2 },
        { width: 470, height: 470, offsetX: 11, offsetY: 95, rotate: -70, zIndex: 1 },
        { width: 280, height: 200, offsetX: 6, offsetY: 8, rotate: -10, zIndex: 3 }
    ];

    const bottomflyImages = [
      { src: Mouse, alt: "Mouse" },
      { src: CatFood, alt: "CatFood" },
      { src: FishBones, alt: "FishBones" },
      { src: Mouse, alt: "Mouse" },
      { src: CatFood, alt: "CatFood" },
      { src: FishBones, alt: "FishBones" }
  ];
  
  const bottomflyImagesSettings = [
      { width: 427, height: 325, offsetX: -83, offsetY: -13, rotate: 22, zIndex: 2 },
      { width: 368, height: 460, offsetX: -46, offsetY: 15, rotate: 0, zIndex: 1 },
      { width: 425, height: 200, offsetX: -60, offsetY: 7, rotate: 0, zIndex: 3 },
      { width: 427, height: 325, offsetX: -59, offsetY: 5, rotate: 0, zIndex: 4 },
      { width: 368, height: 470, offsetX: 24, offsetY: -28, rotate: 25.5, zIndex: 1 },
      { width: 425, height: 200, offsetX: -20, offsetY: -35, rotate: 36, zIndex: 3 }
  ];
    return(
        <div className="ChatalogFlat">
          <div className="ChatalogTopThings">
            <AnimatedText 
              text="OUR HOTELS" 
              className="ChatalogTopThingsText"
            />
            <FlyPictures images={topflyImages} imageSettings={topflyImagesSettings}  direction="left-to-right"/>
          </div>
            <ChatalogBlock/>
            <FlyPictures images={bottomflyImages} imageSettings={bottomflyImagesSettings} direction="right-to-left"/>
            <ReviewsBlock backgroundColor="#f2e8df" cardColor="#FFFFFF"/>
            <PageHotelsQuestions />
            
        </div>
    );
  }

export default ChatalogPage;
