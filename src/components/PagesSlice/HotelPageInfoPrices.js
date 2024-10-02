import './HotelPageInfoPrices.css';
import lapki from '../Assets/Img/lapki.png';


const HotelPageInfoPrices = ({ hotel }) => {
    return (
        <div className="htl-featuresThings">
                <HtlFeatures hotel={hotel} />
                <HtlDescriptionPrices hotel={hotel} />
        </div>
    );
}

function HtlFeatures({ hotel }) {
  return (
    <div className="htl-features">
      <div className="htl-features-left">
        {hotel.vet && (
          <div className="htl-feature htl-feature-Vet">
            <VetIcon />
            <span className="htl-feature-text">Vet</span>
          </div>
        )}
        {hotel.groomer && (
          <div className="htl-feature htl-feature-Groomer">
            <GroomerIcon />
            <span className="htl-feature-text">Groomer</span>
          </div>
        )}
        {hotel.camera && (
          <div className="htl-feature htl-feature-CCTV">
            <CameraIcon />
            <span className="htl-feature-text">CCTV Cameras</span>
          </div>
        )}
      </div>
      <div className="htl-paw-print">
        <img src={lapki} alt="Paw print" />
      </div>
    </div>
  );
}

const VetIcon = () => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="htl-feature-svg htl-feature-svg-vet ">
    <path d="M32.95 20.76c-.44-.36-.95-.73-1.5-1.06v-.03c0-1.6-1.37-2.9-3.05-2.9a2.98 2.98 0 0 0-3.06 2.9c0 1.6 1.37 2.9 3.06 2.9.96 0 1.82-.43 2.38-1.09.3.2.6.42.9.66 1.4 1.16 2.03 2.24 2.03 2.8 0 11.23-6.9 20.38-15.39 20.4-8.48-.02-15.38-9.17-15.38-20.4 0-.56.62-1.64 2.03-2.8.3-.24.6-.47.9-.66a3.11 3.11 0 0 0 2.38 1.09c1.69 0 3.06-1.3 3.06-2.9 0-1.6-1.37-2.9-3.06-2.9a2.98 2.98 0 0 0-3.06 2.9v.03c-.54.33-1.06.7-1.5 1.06-.8.67-2.69 2.41-2.69 4.17 0 5.89 1.77 11.44 4.98 15.62 3.27 4.26 7.64 6.6 12.32 6.62h.04c4.68-.02 9.05-2.36 12.32-6.62 3.21-4.18 4.98-9.73 4.98-15.62 0-1.76-1.88-3.5-2.7-4.17Z" fill="#F70" stroke="#F70" strokeWidth="1.5"/>
    <path d="M32.23 64c-8.14 0-14.76-6.34-14.76-14.14v-3.61h1.91v3.61c0 6.79 5.77 12.3 12.85 12.3 7.09 0 12.85-5.51 12.85-12.3V28.71H47v21.15C47 57.66 40.37 64 32.23 64ZM47 28.71h-1.91v-9.03c0-6.87-5.77-12.46-12.86-12.46V5.37C40.38 5.37 47 11.79 47 19.68v9.03ZM27.32 11.13a4.71 4.71 0 0 0 4.82-4.6c0-2.55-2.16-4.6-4.82-4.6a4.71 4.71 0 0 0-4.81 4.6c0 2.53 2.15 4.6 4.81 4.6Z" fill="#F70" stroke="#F70" strokeWidth="1.5"/>
    <path d="M27.32 12.05a5.66 5.66 0 0 1-5.77-5.53c0-3.04 2.59-5.52 5.77-5.52a5.66 5.66 0 0 1 5.78 5.52c0 3.05-2.6 5.53-5.78 5.53Zm0-9.2a3.77 3.77 0 0 0-3.85 3.67 3.77 3.77 0 0 0 3.85 3.68 3.77 3.77 0 0 0 3.85-3.68 3.77 3.77 0 0 0-3.85-3.68Z" fill="#F70" stroke="#F70" strokeWidth="1.5"/>
  </svg>
);

const GroomerIcon = () => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="htl-feature-svg htl-feature-svg-groom">
    <path d="m50.8 41.72-8.97 9.13c-1.16 1.19-2.88 1.36-3.83.39L15.7 28.5l.57-.6 22.3 22.74c.64.65 1.84.48 2.68-.38l8.97-9.14c.34-.35.38-.74.27-.97-.1-.2-.27-.28-.53-.25-.22.03-.44.15-.62.33l-5.46 5.56c-1.16 1.18-2.88 1.35-3.83.38l-20.7-21.1.57-.59 20.7 21.1c.64.65 1.85.48 2.69-.38l5.45-5.56c.31-.31.7-.51 1.1-.56.6-.07 1.12.2 1.36.7.29.6.11 1.38-.43 1.93Z" fill="#F70"/>
    <path d="m50.22 41.13-8.97 9.14c-.84.86-2.04 1.03-2.68.38L2.3 13.7c-.63-.65-.46-1.88.38-2.74l8.97-9.13c.34-.35.72-.4.95-.28.19.1.27.28.24.54-.02.22-.14.45-.32.63L7.07 8.27c-1.16 1.18-1.34 2.94-.38 3.9l33.36 34.01c.95.97 2.68.8 3.84-.38l5.45-5.56c.18-.18.4-.3.62-.33.26-.03.44.06.53.25.11.23.07.62-.27.97Z" fill="#F70"/>
    <path d="m24.6 36.42-.57.59-22.3-22.74c-.96-.97-.79-2.72.37-3.9l8.97-9.14c.54-.55 1.3-.73 1.88-.44.5.25.77.78.7 1.38-.05.41-.24.81-.55 1.13L7.64 8.86c-.84.86-1.01 2.08-.38 2.73l20.7 21.1-.57.6L6.7 12.17c-.96-.97-.79-2.73.37-3.91l5.46-5.56c.18-.18.3-.41.32-.63.03-.26-.05-.45-.24-.54-.23-.11-.61-.07-.96.28l-8.96 9.13c-.84.86-1.01 2.09-.38 2.74l22.3 22.73Z" fill="#F70"/>
    <path d="M7 14.4c-.3-.3-.32-.78-.04-1.07l7.46-7.6c.28-.29.75-.27 1.05.03.3.3.31.78.03 1.07l-7.46 7.6c-.28.29-.75.27-1.05-.03ZM9.8 17.26c-.3-.3-.31-.78-.04-1.07l7.47-7.6c.28-.29.74-.27 1.04.03.3.3.32.79.04 1.07l-7.46 7.6c-.28.3-.75.27-1.05-.03ZM12.6 20.12c-.3-.3-.3-.78-.03-1.06l7.47-7.61c.27-.29.74-.27 1.04.04.3.3.31.78.04 1.06l-7.47 7.6c-.28.3-.74.28-1.04-.03ZM15.42 22.98c-.3-.3-.32-.78-.04-1.06l7.46-7.61c.28-.28.75-.27 1.05.04.3.3.31.78.03 1.06l-7.46 7.6c-.28.3-.75.28-1.04-.03ZM18.22 25.84c-.3-.3-.31-.78-.03-1.06l7.46-7.6c.28-.3.75-.28 1.04.03.3.3.32.78.04 1.06l-7.46 7.61c-.28.28-.75.27-1.05-.04ZM21.03 28.7c-.3-.3-.31-.78-.04-1.06l7.47-7.6c.28-.3.74-.28 1.04.03.3.3.32.78.04 1.06l-7.46 7.61c-.28.29-.75.27-1.05-.04ZM23.84 31.56c-.3-.3-.32-.78-.04-1.06l7.46-7.6c.28-.3.75-.27 1.05.03.3.3.31.78.03 1.06l-7.46 7.61c-.28.29-.75.27-1.04-.04ZM26.64 34.43c-.3-.3-.31-.78-.03-1.07l7.46-7.6c.28-.29.75-.27 1.04.03.3.3.32.78.04 1.07l-7.46 7.6c-.28.29-.75.27-1.05-.03ZM29.45 37.29c-.3-.3-.31-.78-.04-1.07l7.47-7.6c.28-.29.74-.27 1.04.03.3.3.32.78.04 1.07l-7.46 7.6c-.28.29-.75.27-1.05-.03ZM32.26 40.15c-.3-.3-.32-.78-.04-1.07l7.47-7.6c.27-.29.74-.27 1.04.03.3.3.32.78.04 1.07l-7.47 7.6c-.28.29-.74.27-1.04-.03ZM35.07 43.01c-.3-.3-.32-.78-.04-1.06l7.46-7.61c.28-.29.75-.27 1.05.03.3.3.31.79.04 1.07l-7.47 7.6c-.28.3-.74.27-1.04-.03ZM37.87 45.87c-.3-.3-.31-.78-.03-1.06l7.46-7.61c.28-.29.75-.27 1.05.04.3.3.31.78.03 1.06l-7.46 7.6c-.28.3-.75.28-1.05-.03Z" fill="#F70"/>
  </svg>
);

const CameraIcon = () => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="htl-feature-svg htl-feature-svg-cctv">
    <path d="M28 36.9c-6.7 0-12-5.2-12-11.6 0-6.4 5.3-11.6 12-11.6S40 19 40 25.3C40 31.7 34.8 37 28 37ZM28 16a9.4 9.4 0 0 0-9.6 9.2c0 5 4.3 9.2 9.6 9.2s9.6-4.1 9.6-9.2c0-5-4.3-9.2-9.6-9.2ZM45.2 17.2c1.6 0 3-1.3 3-2.9 0-1.6-1.4-2.9-3-2.9a2.9 2.9 0 0 0-2.8 3c0 1.5 1.2 2.8 2.8 2.8Z" fill="#F70" stroke="#F70"/><path d="M49.6 45H6.4c-3 0-5.4-2.4-5.4-5.4v-28C1 8.5 3.4 6 6.4 6h1.7A5.4 5.4 0 0 1 13.5 1h7.3c2.9 0 5.3 2.3 5.4 5.2h23.4c3 0 5.4 2.4 5.4 5.3v28.1c0 3-2.4 5.4-5.4 5.4ZM6.4 8.6c-1.6 0-2.9 1.3-2.9 3v28c0 1.6 1.3 3 3 3h43c1.7 0 3-1.4 3-3v-28c0-1.7-1.3-3-3-3H26c-1.3 0-2.3-1-2.3-2.2 0-1.6-1.3-3-3-3h-7.2c-1.6 0-3 1.4-3 3 0 1.2-1 2.2-2.2 2.2H6.4Z" fill="#F70" stroke="#F70"/>
  </svg>
);

function HtlDescriptionPrices({ hotel }) {
  const calculatePrice = (nights) => {
    return hotel.pricePerNight * nights;
  };

  const extraHeight =
    (hotel.vet ? 65 : 0) + (hotel.groomer ? 65 : 0) + (hotel.camera ? 65 : 0);

  return (
    <div className="htl-description-prices">
      <div className="htl-description">
        <p>{hotel.description}</p>
      </div>
      <div
        className="htl-prices"
        style={{
          height:
            hotel.vet || hotel.groomer || hotel.camera
              ? `calc(580px + ${extraHeight}px)`
              : "480px",
        }}
      >
        <h2>Prices</h2>
        <div className="htl-price-item">
          <span>One night - {hotel.pricePerNight}$</span>
          <hr />
        </div>
        <div className="htl-price-item">
          <span>Seven nights - {calculatePrice(7)}$</span>
          <hr />
        </div>
        <div className="htl-price-item">
          <span>One month - {calculatePrice(30)}$</span>
          <hr />
        </div>
        <div className="htl-price-item">
          <span>Three month - {calculatePrice(90)}$</span>
          <hr />
        </div>
        <div className="htl-price-item">
          <span>Six month - {calculatePrice(180)}$</span>
          <hr />
        </div>
        {(hotel.vet || hotel.groomer || hotel.camera) && (
          <div className="htl-extra">
            <h3>Extra</h3>
            {hotel.groomer && (
              <div className="htl-price-item">
                <span>Groomer - {hotel.groomerPrice}$</span>
                <hr />
              </div>
            )}
            {hotel.vet && (
              <div className="htl-price-item">
                <span>Vet - {hotel.vetPrice}$</span>
                <hr />
              </div>
            )}
            {hotel.camera && (
              <div className="htl-price-item">
                <span>CCTV Cameras - {hotel.cameraPrice}$</span>
                <hr />
              </div>
            )}
          </div>
        )}
        <button className="htl-btn htl-btn-reserve htl-btn-prices">
          Reserve
        </button>
      </div>
    </div>
  );
};
export default HotelPageInfoPrices;
