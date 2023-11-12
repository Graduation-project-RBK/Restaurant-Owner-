import React from 'react';

const CategoryCard = ({ category, selected, onSelect}) => {
  const handleClick = () => {
    onSelect(category);
  };

  return (
    <div
      className={`category-card ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {category}
    </div>
  );
};

export default CategoryCard;