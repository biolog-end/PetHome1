import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './ChatalogBlock.css';

const filters = [
    {
        title: "Rating",
        type: "checkbox",
        options: [
            { label: "4+", count: 100 },
            { label: "3+", count: 50 },
            { label: "2+", count: 12 },
            { label: "1+", count: 5 }
        ]
    },
    {
        title: "Price (per night)",
        type: "range",
        min: 10,
        max: 1000
    },
    {
        title: "Extra",
        type: "checkbox",
        options: [
            { label: "Vet", count: 200 },
            { label: "Groomer", count: 382 },
            { label: "CCTV cameras", count: 400 }
        ]
    },
    {
        title: "Special offers",
        type: "checkbox",
        options: [
            { label: "Top in your country", count: 20 },
            { label: "Available discounts", count: 80 },
            { label: "Free cancelation", count: 150 },
            { label: "No prepayment needed", count: 100 },
            { label: "Dog handler", count: 30 }
        ]
    },
    {
        title: "Nutrition",
        type: "checkbox",
        options: [
            { label: "Traditional food", count: 300 },
            { label: "Special food (hypoallergenic)", count: 100 },
            { label: "Regular food", count: 400 }
        ]
    },
    {
        title: "Way of walking animals",
        type: "checkbox",
        options: [
            { label: "Walking in the yard", count: 50 },
            { label: "Walking in own area", count: 150 },
            { label: "Walking in the park", count: 100 },
            { label: "Walking around the city", count: 50 },
            { label: "Walking in the forest", count: 30 },
            { label: "Walking on the beach", count: 20 }
        ]
    },
    {
        title: "Location",
        type: "checkbox",
        options: [
            { label: "Near sea", count: 50 },
            { label: "Near mountain", count: 30 },
            { label: "Near my location", count: 100 }
        ]
    }
];

const hotels = [
    {
      name: "Uptown Pets Hotel ",
      location: "Philippines, Cagayan de Oro",
      pets: "Cats and Dogs",
      features: ["vet", "groomer", "cctv"],
      rating: 5,
      reviews: 46,
      price: 30,
      image: `https://placedog.net/300/200?id=9`,
      additionalFeatures: ["Yard for walking animals.", "It is possible to order a dog handler.", "Traditional feeding available.", "Pet sitting 24/7"],
      freeCancellation: true,
      noPrepayment: true,
      availablePlaces: 5,
      dateAdded: new Date('2024-09-28'),
      extraOption: "1-Top in Ukraine",
      logo: `https://placedog.net/30/30?id=100`
    },
    {
      name: "Uptown Pets Hotel",
      location: "Philippines, Cagayan de Oro",
      pets: "Dogs",
      features: ["vet", "groomer"],
      rating: 4,
      reviews: 46,
      price: 30,
      image: `https://placedog.net/300/200?id=1`,
      additionalFeatures: ["Yard for walking animals", "It is possible to order a dog handler."],
      freeCancellation: true,
      noPrepayment: false,
      availablePlaces: 10,
      dateAdded: new Date('2024-09-20'),
      extraOption: "Most popular hotel",
      discount: 16
    },
    {
      name: "Whiskers & Wags Inn",
      location: "New York City, New York",
      pets: "Cats",
      features: ["groomer"],
      rating: 3.2,
      reviews: 765,
      price: 180,
      image: `https://placedog.net/300/200?id=2`,
      additionalFeatures: ["Private rooms for pets.", "Paw daycare service available."],
      freeCancellation: false,
      noPrepayment: true,
      availablePlaces: 2,
      dateAdded: new Date('2024-09-20')
    },
    {
      name: "Tail Wagging Retreat",
      location: "Chicago, Illinois",
      pets: "Dogs",
      features: ["vet", "groomer", "cctv"],
      rating: 2.7,
      reviews: 1543,
      price: 200,
      image: `https://placedog.net/300/200?id=3`,
      additionalFeatures: ["24/7 vet service.", "Outdoor play area."],
      freeCancellation: true,
      noPrepayment: true,
      availablePlaces: 0,
      dateAdded: new Date('2024-09-20')
    },
    {
      name: "Purr-fect Pet Hotel",
      location: "Seattle, Washington",
      pets: "Cats and Dogs",
      features: ["cctv"],
      rating: 1.3,
      reviews: 654,
      price: 130,
      image: `https://placedog.net/300/200?id=4`,
      additionalFeatures: [],
      freeCancellation: false,
      noPrepayment: false,
      availablePlaces: 50,
      dateAdded: new Date('2024-09-20')
    }
  ];

  function generateRandomHotelName() {
    const adjectives = ["Sunny", "Cozy", "Luxury", "Royal", "Ocean", "Mountain", "Woodland", "Modern", "Charming", "Grand", "Elegant", "Peaceful"];
    const nouns = ["Retreat", "Resort", "Villa", "Lodge", "Inn", "Haven", "Sanctuary", "Getaway", "Hideaway", "Palace", "Oasis", "Manor"];
    const geographies = ["Bay", "Cove", "Hill", "Cliff", "Peak", "Valley", "River", "Island", "Forest", "Dunes", "Plains", "Springs"];
  
    const structureOptions = [
      () => `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`,
      () => `${nouns[Math.floor(Math.random() * nouns.length)]} at ${geographies[Math.floor(Math.random() * geographies.length)]}`,
      () => `The ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`,
      () => `The ${nouns[Math.floor(Math.random() * nouns.length)]} of ${geographies[Math.floor(Math.random() * geographies.length)]}`
    ];
  
    const randomStructure = structureOptions[Math.floor(Math.random() * structureOptions.length)];
    return randomStructure();
  }

  function generateRandomLocation() {
    const cities = ["New York", "Los Angeles", "London", "Tokyo", "Paris", "Berlin", "Moscow", "Sydney", "Rio de Janeiro", "Dubai", "Toronto", "Cape Town", "Bangkok", "Istanbul"];
    const countries = ["USA", "UK", "Japan", "France", "Germany", "Russia", "Australia", "Brazil", "Canada", "South Africa", "Thailand", "Turkey", "India", "China"];
    const regions = ["Downtown", "Uptown", "Old Town", "City Center", "Beachside", "Countryside", "Lakeside", "Seaside", "Mountainside", "Riverside", "Historic District"];
  
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
  
    const structureOptions = [
      () => `${randomCity}, ${randomCountry}`,
      () => `${randomRegion}, ${randomCity}`,
      () => `${randomRegion}, ${randomCountry}`,
      () => `${randomCity} - ${randomRegion}`
    ];
  
    const randomStructure = structureOptions[Math.floor(Math.random() * structureOptions.length)];
    return randomStructure();
  }
  function getRandomAdditionalFeatures() {
    const possibleFeatures = [
      "Yard for walking animals.",
      "It is possible to order a pet handler.",
      "Traditional feeding available.",
      "Pet sitting 24/7",
      "Only small pets"
    ];
  
    const features = [];

    if (Math.random() < 0.2) {
      return features; 
    }
  
    const numberOfFeatures = Math.floor(Math.random() * (possibleFeatures.length + 1)); 

    const shuffledFeatures = possibleFeatures.sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < numberOfFeatures; i++) {
      features.push(shuffledFeatures[i]);
    }
  
    return features;
  }
    
  for (let i = 1; i <= 160; i++) {
    const today = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 21); 
    const dateAdded = new Date(today);
    dateAdded.setDate(today.getDate() - randomDaysAgo);

    const rating = (Math.random() * 4 + 1).toFixed(1); 
    const discount = Math.random() < 0.1 ? Math.floor(Math.random() * 30) + 5 : null; 
    hotels.push({
        name: generateRandomHotelName(),
        location: generateRandomLocation(),
        pets: "Cats and Dogs",
        features: ["vet", "groomer", "cctv"],
        rating: parseFloat(rating),
        reviews: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 200) + 50,
        image: `https://placedog.net/300/200?id=${i}`,
        logo: Math.random() < 0.7 ? `https://placedog.net/30/30?id=${i}` : null,
        additionalFeatures: getRandomAdditionalFeatures(),
        freeCancellation: Math.random() < 0.5,
        noPrepayment: Math.random() < 0.5,
        availablePlaces: Math.floor(Math.random() * 15),
        dateAdded: dateAdded,
        discount: discount 
      });
  }
  

const isHotelNew = (dateAdded) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    return dateAdded >= oneWeekAgo;
};

const ChatalogBlock = () => {
    const priceFilter = filters.find(filter => filter.title === "Price (per night)");

    const [selectedPet, setSelectedPet] = useState('Cat');
    const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([priceFilter.min, priceFilter.max]);
    const [favorites, setFavorites] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const hotelsPerPage = 8;
    const totalHotels = hotels.length;
    const totalPages = Math.ceil(totalHotels / hotelsPerPage);
  
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);


    const navigate = useNavigate(); 

    const handleClickCard = () => {
        navigate('/hotelPage'); 
    };
    
    useEffect(() => {
        
        const priceSlider = document.getElementById('ctlgBlkSrtc-price-slider');

        if (priceSlider && !priceSlider.noUiSlider) {
            noUiSlider.create(priceSlider, {
                start: priceRange,
                connect: true,
                range: {
                    'min': priceFilter.min,
                    'max': priceFilter.max
                },
                margin: priceFilter.max * 0.071, 
                step: 0.01, 
                format: {
                    to: (value) => value.toFixed(2), 
                    from: (value) => Number(value)
                }
            });

            priceSlider.noUiSlider.on('update', function (values) {
                setPriceRange(values.map(value => parseFloat(value)));
            });
        }
    }, [priceRange]);

    const togglePetDropdown = () => {
        setIsPetDropdownOpen(!isPetDropdownOpen);
        setIsFilterOpen(false);
        setIsSortOpen(false);
    };

    const toggleFilters = () => {
        setIsFilterOpen(!isFilterOpen);
        setIsSortOpen(false);
        setIsPetDropdownOpen(false);
    };

    const toggleSorts = () => {
        setIsSortOpen(!isSortOpen);
        setIsFilterOpen(false);
        setIsPetDropdownOpen(false);
    };

    const toggleFavorite = (index) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [index]: !prevFavorites[index]
        }));
    };

    const FavoriteButton = ({ index, isFavorite }) => (
        <button className="ctlgBlkSrtc-favorite-button" onClick={() => toggleFavorite(index)}>
            {isFavorite ? (
            <svg width="28" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0a8 8 0 0 0-6 3 8 8 0 0 0-6-3 8 8 0 0 0-8 8c0 9 13 16 13 16a2 2 0 0 0 2 0s13-7 13-16a8 8 0 0 0-8-8Z" fill="#F70"/></svg>
            ) : (
            <svg width="28" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 0a8 8 0 0 0-6 3 8 8 0 0 0-6-3 8 8 0 0 0-8 8c0 9 13 16 13 16a2 2 0 0 0 2 0s13-7 13-16a8 8 0 0 0-8-8Zm-1 17a40 40 0 0 1-5 4 40 40 0 0 1-5-4c-3-2-6-5-6-9a5 5 0 0 1 5-5 5 5 0 0 1 5 3 1 1 0 0 0 1 1 2 2 0 0 0 1-1 5 5 0 0 1 5-3 5 5 0 0 1 5 5c0 4-3 7-6 9Z" fill="#F70"/></svg>
            )}
        </button>
    );

    const popularFilters = [
        { label: "CCTV Cameras", count: 400 },
        { label: "Groomer", count: 382 },
        { label: "Vet", count: 200 },
        { label: "Yard", count: 50 },
        { label: "Near sea", count: 3 },
        { label: "Near mountains", count: 1 },
        { label: "Near my location", count: 1083 },
        { label: "Highest rating", count: 20 },
        { label: "Most popular", count: 10 },
        { label: "Traditional feeding", count: 30 },
        { label: "Free cancellation", count: 11 }
    ];

    const getRatingText = (rating) => {
        if (rating > 4) return "Very good";
        if (rating > 3) return "Good";
        if (rating > 2) return "Bad";
        return "Very Bad";
    };

    const getPaginationPages = (currentPage, totalPages) => {
        let pages = [];
    
        if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (currentPage <= 1) {
            pages = [1, 2, '...', totalPages-1, totalPages];
          } else if (currentPage >= totalPages - 2) {
            pages = [];
            for (let i = totalPages - 4; i <= totalPages; i++) {
              if (i > 0) {
                pages.push(i);
              }
            }
          } else {
            pages = [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
          }
        }
    
        return pages;
    };

    const pages = getPaginationPages(currentPage, totalPages);

    return (
        <div className="ctlgBlkSrtc-ChatalogBlock-Field">
            <div className="ctlgBlkSrtc-header">
                <div className="ctlgBlkSrtc-pet-selector">
                    <button className={`ctlgBlkSrtc-pet-dropdown-button ${isPetDropdownOpen ? 'active' : ''}`} onClick={togglePetDropdown}>
                        <span id="ctlgBlkSrtc-selected-pet">{selectedPet}</span>
                        <span className="ctlgBlkSrtc-dropdown-arrow">
                            <svg width="20" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 .3h14A3 3 0 0 1 19.7 2a3.5 3.5 0 0 1-.5 3.7l-7 8.5a3 3 0 0 1-4.4 0l-7-8.5A3.5 3.5 0 0 1 .3 2 3 3 0 0 1 3 .3Z" fill="#F70"/></svg>
                        </span>
                    </button>
                    <div className={`ctlgBlkSrtc-pet-dropdown-content ${isPetDropdownOpen ? 'show' : ''}`}>
                        <div className="ctlgBlkSrtc-pet-option" onClick={() => { setSelectedPet('Cat'); setIsPetDropdownOpen(false); }}>Cat</div>
                        <div className="ctlgBlkSrtc-pet-option" onClick={() => { setSelectedPet('Dog'); setIsPetDropdownOpen(false); }}>Dog</div>
                    </div>
                </div>
                <div className="ctlgBlkSrtc-search-bar">
                    <input type="text" placeholder="Search..." />
                    <button className="ctlgBlkSrtc-search-button">
                        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.81 15.23a8.27 8.27 0 1 1 1.46-1.46l4.2 4.2a1.03 1.03 0 1 1-1.46 1.46l-4.2-4.2Zm1.13-6.54a6.2 6.2 0 1 0-12.4-.19 6.2 6.2 0 0 0 12.4.19Z" fill="#fff"/></svg>
                    </button>
                </div>
                <div className="ctlgBlkSrtc-filter-sort">
                    <div className="ctlgBlkSrtc-dropdown">
                        <button className="ctlgBlkSrtc-filter-button" onClick={toggleFilters}>
                            <div>
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.9 19.3a.9.9 0 0 1-.9.9h-6.1a3.5 3.5 0 0 1-6.7 0H1a.9.9 0 1 1 0-1.8h9.3a3.5 3.5 0 0 1 6.7 0h6.1c.5 0 .9.4.9.9Zm0-15.8a.9.9 0 0 1-.9.9h-2.9a3.5 3.5 0 0 1-6.8 0H1a.9.9 0 1 1 0-1.8h12.4a3.5 3.5 0 0 1 6.8 0h2.9c.5 0 .9.4.9.9Zm0 7.9a.9.9 0 0 1-.9.9H9.1a3.5 3.5 0 0 1-6.8 0H1a.9.9 0 1 1 0-1.8h1.4a3.5 3.5 0 0 1 6.8 0H23c.5 0 .9.4.9.9Z" fill="#F70"/></svg>
                            </div>
                        </button>
                        <div className={`ctlgBlkSrtc-dropdown-content ${isFilterOpen ? 'show' : ''}`} id="ctlgBlkSrtc-filterDropdown">
                            <div className="ctlgBlkSrtc-filters-heading">Filters</div>
                            {filters.map((filter, index) => (
                                <div key={index} className="ctlgBlkSrtc-filter-group">
                                    <h3>{filter.title}</h3>
                                    {filter.type === 'checkbox' && filter.options.map((option, idx) => (
                                        <div key={idx} className="ctlgBlkSrtc-filter-option">
                                            <label>
                                                <input type="checkbox" />
                                                {option.label}
                                            </label>
                                            <span className="ctlgBlkSrtc-filter-count">{option.count}</span>
                                        </div>
                                    ))}
                                    {filter.type === 'range' && (
                                        <div className="ctlgBlkSrtc-price-range">
                                            <div className="ctlgBlkSrtc-price-display">
                                                ${priceRange[0]} - ${priceRange[1]}
                                            </div>
                                            <div id="ctlgBlkSrtc-price-slider"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ctlgBlkSrtc-dropdown">
                        <button className="ctlgBlkSrtc-sort-button" onClick={toggleSorts}>
                            <div>
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9 7.3h9.5M10.8 12h6M10.9 16.8h3.6m-3.6-14.3h12M4.3 22.7V1.3m0 21.4c-.9 0-2.4-2.3-3-3m3 3c.8 0 2.3-2.4 3-3" stroke="#F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                        </button>
                        <div className={`ctlgBlkSrtc-dropdown-content ${isSortOpen ? 'show' : ''}`} id="ctlgBlkSrtc-sortDropdown">
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Best selling</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Alphabetically, A-Z</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Alphabetically, Z-A</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Price, low to high</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Price, high to low</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Date, old to new</label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label><input type="radio" name="sort" /> Date, new to old</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ctlgBlkSrtc-catalog-container">
                <div className="ctlgBlkSrtc-popular-filters">
                <h2>Popular filters</h2>
                {popularFilters.map((filter, index) => (
                    <div key={index} className="ctlgBlkSrtc-filter-option">
                    <label>
                        <input type="checkbox" />
                        {filter.label}
                    </label>
                    <span>{filter.count}</span>
                    </div>
                ))}
                </div>
                <div className="ctlgBlkSrtc-hotel-list">
                {currentHotels.map((hotel, index) => (
                    <div key={index} className={`ctlgBlkSrtc-hotel-card ${hotel.availablePlaces === 0 ? 'no-places' : ''}`}>
                        <div className="ctlgBlkSrtc-hotel-image">
                            <img src={hotel.image} alt={hotel.name} className="ctlgBlkSrtc-hotel-image-img"/>
                            <FavoriteButton index={index} isFavorite={favorites[index]} />
                            {hotel.logo && (
                                <div className="ctlgBlkSrtc-hotel-logo">
                                    <img src={hotel.logo} alt={`${hotel.name} Logo`} />
                                </div>
                            )}
                            {hotel.extraOption && (
                                <div 
                                className="ctlgBlkSrtc-extra-option" 
                                style={{
                                    backgroundColor: hotel.extraOption.includes("1-Top in") ? '#FFCC00' : '#6DD3E1',
                                    color: '#395874',
                                }}
                                >
                                    {hotel.extraOption}
                                </div>
                            )}
                        </div>
                        <div className="ctlgBlkSrtc-hotel-info">
                            <h3 className="ctlgBlkSrtc-hotel-name">
                            {hotel.name}
                            <div className="ctlgBlkSrtc-hotel-features">
                                {hotel.features.includes('vet') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="19" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m13.1 8.7-.5-.4c0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .6.5 1.2 1.1 1.2.4 0 .7-.2 1-.5l.3.3c.5.4.7.9.7 1 0 4.5-2.6 8-5.8 8-3.2 0-5.9-3.5-5.9-8 0-.1.3-.6.8-1l.3-.3c.3.3.6.5 1 .5.6 0 1.1-.6 1.1-1.2s-.5-1.1-1.1-1.1c-.7 0-1.2.5-1.2 1.1l-.6.4c-.3.3-1 1-1 1.7 0 2.3.7 4.5 1.9 6.1 1.2 1.7 2.9 2.6 4.7 2.6 1.8 0 3.4-1 4.7-2.6 1.2-1.6 1.9-3.8 1.9-6.1 0-.7-.7-1.4-1-1.7Z" fill="#F70" stroke="#F70"/><path d="M12.9 25.7c-3.1 0-5.6-2.5-5.6-5.6v-1.4H8v1.4c0 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9V12h.7V20c0 3.1-2.5 5.6-5.6 5.6Z" fill="#F70" stroke="#F70"/><path d="M18.5 11.9h-.7V8.3c0-2.7-2.2-4.9-5-4.9v-.7c3.2 0 5.7 2.5 5.7 5.6V12Z" fill="#F70" stroke="#F70"/><path d="M11 5c1 0 1.8-.8 1.8-1.8S12 1.4 11 1.4s-1.8.8-1.8 1.8S10 5 11 5Z" fill="#F70" stroke="#F70"/><path d="M11 5.3c-1.2 0-2.2-1-2.2-2.1C8.8 2 9.8 1 11 1c1.2 0 2.2 1 2.2 2.2 0 1.2-1 2.1-2.2 2.1Zm0-3.6c-.8 0-1.5.7-1.5 1.5s.7 1.4 1.5 1.4 1.5-.6 1.5-1.4c0-.8-.7-1.5-1.5-1.5Z" fill="#F70" stroke="#F70"/></svg>
                                </div>
                                )}
                                {hotel.features.includes('groomer') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="23" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22.1 18.62-3.9 4.08c-.5.53-1.25.6-1.67.17l-9.7-10.15.25-.26 9.7 10.15c.28.29.8.21 1.17-.17l3.9-4.08c.15-.16.17-.33.12-.44-.04-.08-.12-.12-.23-.1-.1 0-.2.06-.27.14l-2.37 2.48c-.5.53-1.26.6-1.67.17L8.42 11.2l.25-.26 9 9.42c.29.3.8.21 1.18-.17l2.37-2.48a.8.8 0 0 1 .48-.25c.26-.03.48.09.59.31.12.27.05.62-.19.86Z" fill="#F70"/><path d="m21.85 18.36-3.9 4.08c-.36.38-.89.46-1.16.17L1 6.1c-.27-.29-.2-.84.17-1.22L5.07.8c.15-.15.31-.17.41-.12.09.04.12.12.1.24a.5.5 0 0 1-.13.28L3.08 3.69C2.57 4.22 2.5 5 2.9 5.44L17.43 20.6c.41.44 1.16.36 1.67-.17l2.37-2.48a.46.46 0 0 1 .27-.14c.11-.02.2.02.23.1.05.1.03.28-.12.44Z" fill="#F70"/><path d="m10.7 16.26-.24.26L.76 6.37C.33 5.94.4 5.16.91 4.63L4.82.55c.23-.25.56-.33.82-.2.21.11.33.35.3.62a.87.87 0 0 1-.24.5L3.32 3.95c-.36.39-.44.93-.16 1.22l9.01 9.42-.25.27-9.01-9.42c-.42-.44-.34-1.22.16-1.75l2.38-2.48a.5.5 0 0 0 .14-.28c.01-.12-.03-.2-.1-.24-.1-.05-.27-.03-.42.12L1.17 4.9C.8 5.27.73 5.82 1 6.1l9.7 10.15Z" fill="#F70"/><path d="M3.04 6.43c-.13-.14-.13-.35-.01-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48L3.5 6.45c-.12.12-.33.11-.46-.02Z" fill="#F70"/><path d="M4.27 7.7c-.13-.13-.14-.34-.02-.47l3.25-3.4c.12-.12.32-.12.45.02.13.14.14.35.02.47l-3.25 3.4c-.12.13-.32.12-.45-.02Z" fill="#F70"/><path d="M5.49 8.98c-.13-.13-.14-.35-.02-.47l3.25-3.4c.12-.13.32-.12.45.02.13.13.14.35.02.47L5.94 9c-.12.12-.32.12-.45-.02Z" fill="#F70"/><path d="M6.7 10.26c-.12-.14-.13-.35 0-.48l3.24-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M7.93 11.54c-.13-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.33-.11.46.02.13.14.13.35.01.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M9.15 12.81c-.13-.13-.14-.35-.01-.47l3.24-3.4c.13-.13.33-.12.46.02.13.13.14.35.01.47l-3.24 3.4c-.12.13-.33.12-.46-.02Z" fill="#F70"/><path d="M10.37 14.09c-.13-.14-.13-.35-.01-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.33.12-.46-.02Z" fill="#F70"/><path d="M11.6 15.37c-.14-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.33.11-.46-.02Z" fill="#F70"/><path d="M12.82 16.64c-.13-.13-.14-.34-.02-.47l3.25-3.4c.12-.12.32-.12.45.02.13.14.14.35.02.47l-3.25 3.4c-.12.13-.32.12-.45-.02Z" fill="#F70"/><path d="M14.04 17.92c-.13-.14-.14-.35-.02-.47l3.25-3.4c.12-.13.32-.12.45.02.13.13.14.34.02.47l-3.25 3.4c-.12.12-.32.12-.45-.02Z" fill="#F70"/><path d="M15.26 19.2c-.13-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.33-.11.46.02.13.14.13.35.01.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M16.48 20.48c-.13-.14-.14-.35-.01-.48l3.24-3.4c.12-.12.33-.12.46.02.13.14.14.35.01.48l-3.24 3.4c-.13.12-.33.11-.46-.02Z" fill="#F70"/></svg>
                                </div>
                                )}
                                {hotel.features.includes('cctv') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="24" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.31 16.1a4.97 4.97 0 0 1-5.05-4.87 4.97 4.97 0 0 1 5.05-4.87 4.97 4.97 0 0 1 5.06 4.87 4.97 4.97 0 0 1-5.06 4.87Zm0-8.74a3.95 3.95 0 0 0-4.02 3.87c0 2.14 1.8 3.87 4.02 3.87a3.95 3.95 0 0 0 4.02-3.87c0-2.14-1.8-3.87-4.02-3.87Z" fill="#F70" stroke="#F70" stroke-width=".5"/><path d="M19.54 7.82c.66 0 1.2-.54 1.2-1.22 0-.67-.54-1.21-1.2-1.21-.67 0-1.2.54-1.2 1.21 0 .68.53 1.22 1.2 1.22Z" fill="#F70" stroke="#F70" stroke-width=".5"/><path d="M21.36 19.51H3.26A2.26 2.26 0 0 1 1 17.26V5.42a2.26 2.26 0 0 1 2.27-2.25h.7A2.26 2.26 0 0 1 6.23 1H9.3c1.22 0 2.22.96 2.26 2.17h9.81a2.26 2.26 0 0 1 2.27 2.25v11.84a2.26 2.26 0 0 1-2.27 2.25ZM3.26 4.21c-.67 0-1.21.54-1.21 1.21v11.84c0 .67.54 1.21 1.22 1.21h18.1c.67 0 1.21-.54 1.21-1.21V5.42c0-.67-.54-1.21-1.22-1.21h-9.9a.96.96 0 0 1-.95-.95c0-.67-.55-1.22-1.22-1.22H6.23c-.67 0-1.22.55-1.22 1.22 0 .52-.42.95-.95.95h-.8Z" fill="#F70" stroke="#F70" stroke-width=".5"/></svg>
                                </div>
                                )}
                            </div>
                            </h3>
                            <p className="ctlgBlkSrtc-hotel-location">{hotel.location}</p>
                            <p className="ctlgBlkSrtc-hotel-pets">{hotel.pets}</p>
                            
                            <div className="ctlgBlkSrtc-additional-info">
                            {hotel.additionalFeatures && hotel.additionalFeatures.map((feature, i) => (
                                <p key={i} className="ctlgBlkSrtc-additional-features">{feature}</p>
                            ))}
                            
                            {hotel.freeCancellation && (
                                <p className="ctlgBlkSrtc-free-cancellation">
                                    <span className="ctlgBlkSrtc-green-galotsha">
                                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m2.75 8.75 3.5 3.5 7-7.5" stroke="#2B7C00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    Free cancellation
                                </p>
                            )}

                            {hotel.noPrepayment && (
                                <p className="ctlgBlkSrtc-no-prepayment">
                                    <span className="ctlgBlkSrtc-green-galotsha">
                                        <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m2.75 8.75 3.5 3.5 7-7.5" stroke="#2B7C00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    No prepayment needed <span>– pay at the property</span>
                                </p>
                            )}
                            
                            {hotel.availablePlaces > 0 && hotel.availablePlaces <= 5 && (
                                <p className="ctlgBlkSrtc-places-left">Only {hotel.availablePlaces} free places left</p>
                            )}
                            
                            {hotel.availablePlaces === 0 && (
                                <p className="ctlgBlkSrtc-no-places">No places.</p>
                            )}
                            </div>
                            <div className="ctlgBlkSrtc-hotel-rating-wrapper">
                                <div className="ctlgBlkSrtc-hotel-rating">
                                    <div className="ctlgBlkSrtc-review-texts-block">
                                        <span className="ctlgBlkSrtc-rating-text">{getRatingText(hotel.rating)}</span>
                                        <div className="ctlgBlkSrtc-review-count">{hotel.reviews} reviews</div>
                                    </div>
                                    <span className="ctlgBlkSrtc-rating-cube">{hotel.rating}</span>
                                </div>

                                {isHotelNew(hotel.dateAdded) && (
                                    <div className="ctlgBlkSrtc-new-badge">New!</div>
                                )}
                            </div>
                            <div className="ctlgBlkSrtc-hotel-price">
                                <div className="ctlgBlkSrtc-price-from">from</div>
                                <div className="ctlgBlkSrtc-price-value">
                                    {hotel.discount ? (
                                        <>
                                            <span className="ctlgBlkSrtc-old-price">{Math.round(hotel.price)}$</span>
                                            <span className="ctlgBlkSrtc-new-price">
                                                {Math.round(hotel.price * (1 - hotel.discount / 100))}$
                                            </span>
                                        </>
                                    ) : (
                                        `${Math.round(hotel.price)}$`
                                    )}
                                </div>
                                <button className="ctlgBlkSrtc-availability-button" onClick={handleClickCard}> 
                                    See availability
                                    <svg width="14" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.06 13.06a1.5 1.5 0 0 0 0-2.12L3.51 1.39A1.5 1.5 0 1 0 1.4 3.51L9.88 12l-8.49 8.49a1.5 1.5 0 1 0 2.12 2.12l9.55-9.55ZM11 13.5h1v-3h-1v3Z" fill="#fff"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                    {totalPages > 1 && (
                        <div className="ctlgBlkSrtc-pagination">
                        {currentPage > 1 && (
                            <button
                            className="ctlgBlkSrtc-pagination-button ctlgBlkSrtc-pagination-button-back"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            >
                            <svg width="54" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52 13.5a1.5 1.5 0 0 0 0-3v3ZM.94 10.94a1.5 1.5 0 0 0 0 2.12l9.55 9.55a1.5 1.5 0 1 0 2.12-2.12L4.12 12l8.49-8.49a1.5 1.5 0 1 0-2.12-2.12L.94 10.94ZM52 10.5H2v3h50v-3Z" fill="#F70"/></svg>
                            </button>
                        )}
                        {pages.map((page, index) =>
                            typeof page === 'number' ? (
                            <button
                                key={index}
                                className={`ctlgBlkSrtc-pagination-circle ${page === currentPage ? 'active' : ''} ${index === 0 ? 'first-circle' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                            ) : (
                            <button
                                key={index}
                                className="ctlgBlkSrtc-pagination-circle"
                                onClick={() => setCurrentPage(currentPage + 2)}
                            >
                                ...
                            </button>
                            )
                        )}
                        {currentPage < totalPages && (
                            <button
                            className="ctlgBlkSrtc-pagination-button ctlgBlkSrtc-pagination-button-next"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            >
                            <span>Next page</span> 
                            <svg width="74" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10.5a1.5 1.5 0 0 0 0 3v-3Zm71.06 2.56a1.5 1.5 0 0 0 0-2.12l-9.55-9.55a1.5 1.5 0 1 0-2.12 2.12L69.88 12l-8.49 8.49a1.5 1.5 0 1 0 2.12 2.12l9.55-9.55ZM2 13.5h70v-3H2v3Z" fill="#fff"/></svg>
                            </button>
                        )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatalogBlock;
