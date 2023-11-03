import React from 'react';

const CityCard = ({ city, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(city);
  };

  return (
    <div
      className={`city-card ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {city}
    </div>
  );
};

export default CityCard;