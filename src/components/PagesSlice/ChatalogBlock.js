import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './ChatalogBlock.css';
import { Link } from 'react-router-dom';


const filtersData  = [
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

const isHotelNew = (dateAdded) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 14);
    return dateAdded >= oneWeekAgo;
};

const ChatalogBlock = () => {
    const priceFilter = filtersData.find(filter => filter.title === "Price (per night)");

    const [filters, setFilters] = useState({
      selectedTags: [],
      minRating: null,
      petsAllowed: null,
      priceRange: [priceFilter.min, priceFilter.max],
      searchTerm: '',
      sortBy: '',
    });
  
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
  
    const [favorites, setFavorites] = useState({});
    const [isPetDropdownOpen, setIsPetDropdownOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [priceRange, setPriceRange] = useState([priceFilter.min, priceFilter.max]);

    const [isModified, setIsModified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            const newPriceRange = values.map(value => parseFloat(value));
            setPriceRange(newPriceRange);
            setFilters(prevFilters => ({ ...prevFilters, priceRange: newPriceRange }));
            setIsModified(true);
          });
        }
    }, [priceRange]);

    const fetchHotels = async () => {
        setIsLoading(true);
        try {
          const params = new URLSearchParams();

          if (filters.selectedTags.length > 0) {
            filters.selectedTags.slice(0, 10).forEach(tag => {
              params.append('Tags', tag);
            });
          }

          if (filters.minRating != null) {
            params.append('MinRating', filters.minRating);
          }
    
          if (filters.petsAllowed != null) {
            params.append('PetsAllowed', filters.petsAllowed);
          }

          if (filters.priceRange[0] != null) {
            params.append('PriceMin', filters.priceRange[0]);
          }
          if (filters.priceRange[1] != null) {
            params.append('PriceMax', filters.priceRange[1]);
          }
    
          if (filters.searchTerm) {
            params.append('SearchTerm', filters.searchTerm);
          }
    
          if (filters.sortBy) {
            params.append('SortBy', filters.sortBy);
          }
    
          params.append('PageNumber', currentPage);
          params.append('PageSize', pageSize);
    
          const response = await fetch(`/api/hotels/catalog?${params.toString()}`, {
            method: 'GET'
          });
    
          if (response.ok) {
            const data = await response.json();
    
            setHotels(data.items);
            setTotalPages(data.totalPages);
            setTotalCount(data.totalCount);
            setPageSize(data.pageSize);
          } else {
            console.error('Failed to fetch hotels');
          }
        } catch (error) {
          console.error('Error fetching hotels', error);
        }finally {
            setIsLoading(false); 
        }
      };
    
      useEffect(() => {
        fetchHotels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage]);
    
      const handleSearch = () => {
        setCurrentPage(1);
        fetchHotels();
        setIsModified(false);
      };
    
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

    const handleTagChange = (tagValue) => {
        setFilters(prevFilters => {
            let selectedTags = [...prevFilters.selectedTags];
            if (selectedTags.includes(tagValue)) {
            selectedTags = selectedTags.filter(tag => tag !== tagValue);
            } else {
            if (selectedTags.length < 10) {
                selectedTags.push(tagValue);
            }
            }
            return {
            ...prevFilters,
            selectedTags
            };
        });
        setIsModified(true);
    };

    const handleRatingChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            minRating: prevFilters.minRating === value ? null : value
        }));
        setIsModified(true);
    };

    const handlePetsAllowedChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            petsAllowed: value
        }));
        setIsModified(true);
        setIsPetDropdownOpen(false);
    };

    const handleSortChange = (value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            sortBy: value
        }));
        setIsModified(true);
        setIsSortOpen(false);
    };
    const handleSearchTermChange = (e) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          searchTerm: e.target.value
        }));
        setIsModified(true);
    };

    return (
        <div className="ctlgBlkSrtc-ChatalogBlock-Field">
            {isLoading && (
                <div className="ctlgBlkSrtc-loading-overlay">
                    <div className="ctlgBlkSrtc-loading-animation">
                        
                    </div>
                </div>
            )}
            <div className="ctlgBlkSrtc-header">
                <div className="ctlgBlkSrtc-pet-selector">
                    <button className={`ctlgBlkSrtc-pet-dropdown-button ${isPetDropdownOpen ? 'active' : ''}`} onClick={togglePetDropdown}>
                        <span id="ctlgBlkSrtc-selected-pet">
                            {filters.petsAllowed === '0' ? 'Cat' : filters.petsAllowed === '1' ? 'Dog' : 'Cat and Dog'}
                        </span>
                        <span className="ctlgBlkSrtc-dropdown-arrow">
                            <svg width="20" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 .3h14A3 3 0 0 1 19.7 2a3.5 3.5 0 0 1-.5 3.7l-7 8.5a3 3 0 0 1-4.4 0l-7-8.5A3.5 3.5 0 0 1 .3 2 3 3 0 0 1 3 .3Z" fill="#F70"/></svg>
                        </span>
                    </button>
                    <div className={`ctlgBlkSrtc-pet-dropdown-content ${isPetDropdownOpen ? 'show' : ''}`}>
                        <div className="ctlgBlkSrtc-pet-option" onClick={() => { handlePetsAllowedChange('1'); setIsPetDropdownOpen(false); }}>Cat</div>
                        <div className="ctlgBlkSrtc-pet-option" onClick={() => { handlePetsAllowedChange('2'); setIsPetDropdownOpen(false); }}>Dog</div>
                        <div className="ctlgBlkSrtc-pet-option" onClick={() => { handlePetsAllowedChange('3'); setIsPetDropdownOpen(false); }}>Cat and Dog</div>
                    </div>
                </div>
                <div className="ctlgBlkSrtc-search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filters.searchTerm}
                        onChange={handleSearchTermChange}
                    />
                    <button
                        onClick={handleSearch}
                        className={`ctlgBlkSrtc-search-button ${isModified ? 'modified' : ''}`}
                    >
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
                            {filtersData.map((filter, index) => (
                                <div key={index} className="ctlgBlkSrtc-filter-group">
                                <h3>{filter.title}</h3>
                                {filter.type === 'checkbox' && filter.title === 'Rating' && filter.options.map((option, idx) => (
                                    <div key={idx} className="ctlgBlkSrtc-filter-option">
                                    <label>
                                        <input
                                        type="radio"
                                        name="rating"
                                        value={option.label}
                                        checked={filters.minRating === option.label[0]}
                                        onChange={() => handleRatingChange(option.label[0])}
                                        />
                                        {option.label}
                                    </label>
                                    <span className="ctlgBlkSrtc-filter-count">{option.count}</span>
                                    </div>
                                ))}
                                {filter.type === 'checkbox' && filter.title !== 'Rating' && filter.options.map((option, idx) => (
                                    <div key={idx} className="ctlgBlkSrtc-filter-option">
                                    <label>
                                        <input
                                        type="checkbox"
                                        checked={filters.selectedTags.includes(option.label)}
                                        onChange={() => handleTagChange(option.label)}
                                        />
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
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'best_selling'}
                                        onChange={() => handleSortChange('best_selling')}
                                    /> Best selling
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'name_asc'}
                                        onChange={() => handleSortChange('name_asc')}
                                    /> Alphabetically, A-Z
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'name_desc'}
                                        onChange={() => handleSortChange('name_desc')}
                                    /> Alphabetically, Z-A
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'price_asc'}
                                        onChange={() => handleSortChange('price_asc')}
                                    /> Price, low to high
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'price_desc'}
                                        onChange={() => handleSortChange('price_desc')}
                                    /> Price, high to low
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'date_old_new'}
                                        onChange={() => handleSortChange('date_old_new')}
                                    /> Date, old to new
                                </label>
                            </div>
                            <div className="ctlgBlkSrtc-filter-option">
                                <label>
                                    <input
                                        type="radio"
                                        name="sort"
                                        checked={filters.sortBy === 'date_new_old'}
                                        onChange={() => handleSortChange('date_new_old')}
                                    /> Date, new to old
                                </label>
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
                            <input
                            type="checkbox"
                            checked={filters.selectedTags.includes(filter.label)}
                            onChange={() => handleTagChange(filter.label)}
                            />
                            {filter.label}
                        </label>
                        <span>{filter.count}</span>
                        </div>
                    ))}
                </div>
                <div className="ctlgBlkSrtc-hotel-list">
                {hotels.map((hotel, index) => (
                    <div key={index} className={`ctlgBlkSrtc-hotel-card ${hotel.availablePlaces === 0 ? 'no-places' : ''}`}>
                        <div className="ctlgBlkSrtc-hotel-image">
                            <img src={hotel.photoUrl} alt={hotel.name} className="ctlgBlkSrtc-hotel-image-img"/>
                            <FavoriteButton index={index} isFavorite={favorites[index]} />
                            {hotel.smallLogoUrl && (
                                <div className="ctlgBlkSrtc-hotel-logo">
                                    <img src={hotel.smallLogoUrl} alt={`${hotel.name} Logo`} />
                                </div>
                            )}
                            {hotel.extraOption && hotel.extraOption != " " && (
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
                                {hotel.tags && hotel.tags.includes('Vet') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="19" height="27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m13.1 8.7-.5-.4c0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .6.5 1.2 1.1 1.2.4 0 .7-.2 1-.5l.3.3c.5.4.7.9.7 1 0 4.5-2.6 8-5.8 8-3.2 0-5.9-3.5-5.9-8 0-.1.3-.6.8-1l.3-.3c.3.3.6.5 1 .5.6 0 1.1-.6 1.1-1.2s-.5-1.1-1.1-1.1c-.7 0-1.2.5-1.2 1.1l-.6.4c-.3.3-1 1-1 1.7 0 2.3.7 4.5 1.9 6.1 1.2 1.7 2.9 2.6 4.7 2.6 1.8 0 3.4-1 4.7-2.6 1.2-1.6 1.9-3.8 1.9-6.1 0-.7-.7-1.4-1-1.7Z" fill="#F70" stroke="#F70"/><path d="M12.9 25.7c-3.1 0-5.6-2.5-5.6-5.6v-1.4H8v1.4c0 2.7 2.2 4.9 4.9 4.9s4.9-2.2 4.9-4.9V12h.7V20c0 3.1-2.5 5.6-5.6 5.6Z" fill="#F70" stroke="#F70"/><path d="M18.5 11.9h-.7V8.3c0-2.7-2.2-4.9-5-4.9v-.7c3.2 0 5.7 2.5 5.7 5.6V12Z" fill="#F70" stroke="#F70"/><path d="M11 5c1 0 1.8-.8 1.8-1.8S12 1.4 11 1.4s-1.8.8-1.8 1.8S10 5 11 5Z" fill="#F70" stroke="#F70"/><path d="M11 5.3c-1.2 0-2.2-1-2.2-2.1C8.8 2 9.8 1 11 1c1.2 0 2.2 1 2.2 2.2 0 1.2-1 2.1-2.2 2.1Zm0-3.6c-.8 0-1.5.7-1.5 1.5s.7 1.4 1.5 1.4 1.5-.6 1.5-1.4c0-.8-.7-1.5-1.5-1.5Z" fill="#F70" stroke="#F70"/></svg>
                                </div>
                                )}
                                {hotel.tags && hotel.tags.includes('Groomer') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="23" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m22.1 18.62-3.9 4.08c-.5.53-1.25.6-1.67.17l-9.7-10.15.25-.26 9.7 10.15c.28.29.8.21 1.17-.17l3.9-4.08c.15-.16.17-.33.12-.44-.04-.08-.12-.12-.23-.1-.1 0-.2.06-.27.14l-2.37 2.48c-.5.53-1.26.6-1.67.17L8.42 11.2l.25-.26 9 9.42c.29.3.8.21 1.18-.17l2.37-2.48a.8.8 0 0 1 .48-.25c.26-.03.48.09.59.31.12.27.05.62-.19.86Z" fill="#F70"/><path d="m21.85 18.36-3.9 4.08c-.36.38-.89.46-1.16.17L1 6.1c-.27-.29-.2-.84.17-1.22L5.07.8c.15-.15.31-.17.41-.12.09.04.12.12.1.24a.5.5 0 0 1-.13.28L3.08 3.69C2.57 4.22 2.5 5 2.9 5.44L17.43 20.6c.41.44 1.16.36 1.67-.17l2.37-2.48a.46.46 0 0 1 .27-.14c.11-.02.2.02.23.1.05.1.03.28-.12.44Z" fill="#F70"/><path d="m10.7 16.26-.24.26L.76 6.37C.33 5.94.4 5.16.91 4.63L4.82.55c.23-.25.56-.33.82-.2.21.11.33.35.3.62a.87.87 0 0 1-.24.5L3.32 3.95c-.36.39-.44.93-.16 1.22l9.01 9.42-.25.27-9.01-9.42c-.42-.44-.34-1.22.16-1.75l2.38-2.48a.5.5 0 0 0 .14-.28c.01-.12-.03-.2-.1-.24-.1-.05-.27-.03-.42.12L1.17 4.9C.8 5.27.73 5.82 1 6.1l9.7 10.15Z" fill="#F70"/><path d="M3.04 6.43c-.13-.14-.13-.35-.01-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48L3.5 6.45c-.12.12-.33.11-.46-.02Z" fill="#F70"/><path d="M4.27 7.7c-.13-.13-.14-.34-.02-.47l3.25-3.4c.12-.12.32-.12.45.02.13.14.14.35.02.47l-3.25 3.4c-.12.13-.32.12-.45-.02Z" fill="#F70"/><path d="M5.49 8.98c-.13-.13-.14-.35-.02-.47l3.25-3.4c.12-.13.32-.12.45.02.13.13.14.35.02.47L5.94 9c-.12.12-.32.12-.45-.02Z" fill="#F70"/><path d="M6.7 10.26c-.12-.14-.13-.35 0-.48l3.24-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M7.93 11.54c-.13-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.33-.11.46.02.13.14.13.35.01.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M9.15 12.81c-.13-.13-.14-.35-.01-.47l3.24-3.4c.13-.13.33-.12.46.02.13.13.14.35.01.47l-3.24 3.4c-.12.13-.33.12-.46-.02Z" fill="#F70"/><path d="M10.37 14.09c-.13-.14-.13-.35-.01-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.33.12-.46-.02Z" fill="#F70"/><path d="M11.6 15.37c-.14-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.32-.11.45.02.13.14.14.35.02.48l-3.25 3.4c-.12.12-.33.11-.46-.02Z" fill="#F70"/><path d="M12.82 16.64c-.13-.13-.14-.34-.02-.47l3.25-3.4c.12-.12.32-.12.45.02.13.14.14.35.02.47l-3.25 3.4c-.12.13-.32.12-.45-.02Z" fill="#F70"/><path d="M14.04 17.92c-.13-.14-.14-.35-.02-.47l3.25-3.4c.12-.13.32-.12.45.02.13.13.14.34.02.47l-3.25 3.4c-.12.12-.32.12-.45-.02Z" fill="#F70"/><path d="M15.26 19.2c-.13-.14-.14-.35-.02-.48l3.25-3.4c.12-.12.33-.11.46.02.13.14.13.35.01.48l-3.25 3.4c-.12.12-.32.11-.45-.02Z" fill="#F70"/><path d="M16.48 20.48c-.13-.14-.14-.35-.01-.48l3.24-3.4c.12-.12.33-.12.46.02.13.14.14.35.01.48l-3.24 3.4c-.13.12-.33.11-.46-.02Z" fill="#F70"/></svg>
                                </div>
                                )}
                                {hotel.tags && hotel.tags.includes('CCTV_Cameras') && (
                                <div className="ctlgBlkSrtc-feature-cube">
                                    <svg width="24" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.31 16.1a4.97 4.97 0 0 1-5.05-4.87 4.97 4.97 0 0 1 5.05-4.87 4.97 4.97 0 0 1 5.06 4.87 4.97 4.97 0 0 1-5.06 4.87Zm0-8.74a3.95 3.95 0 0 0-4.02 3.87c0 2.14 1.8 3.87 4.02 3.87a3.95 3.95 0 0 0 4.02-3.87c0-2.14-1.8-3.87-4.02-3.87Z" fill="#F70" stroke="#F70" stroke-width=".5"/><path d="M19.54 7.82c.66 0 1.2-.54 1.2-1.22 0-.67-.54-1.21-1.2-1.21-.67 0-1.2.54-1.2 1.21 0 .68.53 1.22 1.2 1.22Z" fill="#F70" stroke="#F70" stroke-width=".5"/><path d="M21.36 19.51H3.26A2.26 2.26 0 0 1 1 17.26V5.42a2.26 2.26 0 0 1 2.27-2.25h.7A2.26 2.26 0 0 1 6.23 1H9.3c1.22 0 2.22.96 2.26 2.17h9.81a2.26 2.26 0 0 1 2.27 2.25v11.84a2.26 2.26 0 0 1-2.27 2.25ZM3.26 4.21c-.67 0-1.21.54-1.21 1.21v11.84c0 .67.54 1.21 1.22 1.21h18.1c.67 0 1.21-.54 1.21-1.21V5.42c0-.67-.54-1.21-1.22-1.21h-9.9a.96.96 0 0 1-.95-.95c0-.67-.55-1.22-1.22-1.22H6.23c-.67 0-1.22.55-1.22 1.22 0 .52-.42.95-.95.95h-.8Z" fill="#F70" stroke="#F70" stroke-width=".5"/></svg>
                                </div>
                                )}
                            </div>
                            </h3>
                            <p className="ctlgBlkSrtc-hotel-location">{hotel.location}</p>
                            <p className="ctlgBlkSrtc-hotel-pets">{hotel.petsAllowed === '0' ? 'Cats' : hotel.petsAllowed === '1' ? 'Dogs' : 'Cats and Dogs'}</p>
                            
                            <div className="ctlgBlkSrtc-additional-info">
                            {hotel.customTags && hotel.customTags.map((feature, i) => (
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
                                        <span className="ctlgBlkSrtc-rating-text">{getRatingText(hotel.averageRating)}</span>
                                        <div className="ctlgBlkSrtc-review-count">{hotel.reviewCount} reviews</div>
                                    </div>
                                    <span className="ctlgBlkSrtc-rating-cube">{hotel.averageRating.toFixed(1)}</span>
                                </div>

                                {isHotelNew(hotel.dateAdded) && (
                                    <div className="ctlgBlkSrtc-new-badge">New!</div>
                                )}
                            </div>
                            <div className="ctlgBlkSrtc-hotel-price">
                                <div className="ctlgBlkSrtc-price-from">from</div>
                                <div className="ctlgBlkSrtc-price-value">
                                    {hotel.discountPercentage ? (
                                        <>
                                            <span className="ctlgBlkSrtc-old-price">{Math.round(hotel.pricePerNight)}$</span>
                                            <span className="ctlgBlkSrtc-new-price">
                                                {Math.round(hotel.pricePerNight * (1 - hotel.discountPercentage / 100))}$
                                            </span>
                                        </>
                                    ) : (
                                        `${Math.round(hotel.pricePerNight)}$`
                                    )}
                                </div>
                                <Link to={`/hotelPage/${hotel.id}`}> 
                                    <button className="ctlgBlkSrtc-availability-button" onClick={handleClickCard}> 
                                        See availability
                                        <svg width="14" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.06 13.06a1.5 1.5 0 0 0 0-2.12L3.51 1.39A1.5 1.5 0 1 0 1.4 3.51L9.88 12l-8.49 8.49a1.5 1.5 0 1 0 2.12 2.12l9.55-9.55ZM11 13.5h1v-3h-1v3Z" fill="#fff"/></svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                    {totalPages > 1 && (
                        <div className="ctlgBlkSrtc-pagination">
                        {currentPage > 1 && (
                            <button
                                className="ctlgBlkSrtc-pagination-button ctlgBlkSrtc-pagination-button-back"
                                onClick={() => { setCurrentPage(currentPage - 1); fetchHotels(); }}
                            >
                                <svg width="54" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M52 13.5a1.5 1.5 0 0 0 0-3v3ZM.94 10.94a1.5 1.5 0 0 0 0 2.12l9.55 9.55a1.5 1.5 0 1 0 2.12-2.12L4.12 12l8.49-8.49a1.5 1.5 0 1 0-2.12-2.12L.94 10.94ZM52 10.5H2v3h50v-3Z" fill="#F70"/></svg>
                            </button>
                        )}
                        {pages.map((page, index) =>
                            typeof page === 'number' ? (
                            <button
                                key={index}
                                className={`ctlgBlkSrtc-pagination-circle ${page === currentPage ? 'active' : ''} ${index === 0 ? 'first-circle' : ''}`}
                                onClick={() => { setCurrentPage(page); fetchHotels(); }}
                            >
                                {page}
                            </button>
                            ) : (
                            <button
                                key={index}
                                className="ctlgBlkSrtc-pagination-circle"
                                onClick={() => { setCurrentPage(currentPage + 2); fetchHotels(); }}
                            >
                                ...
                            </button>
                            )
                        )}
                        {currentPage < totalPages && (
                            <button
                                className="ctlgBlkSrtc-pagination-button ctlgBlkSrtc-pagination-button-next"
                                onClick={() => { setCurrentPage(currentPage + 1); fetchHotels(); }}
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
