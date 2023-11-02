import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../features/restaurantSlice';
import CategoryCard from './CategoryCard';
import "./style.css"

const CategoriesView = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.restaurant.category);

  const categories = [
    'Italian',
    'Tunisian',
    'Japanese',
    'Lebanese',
    'Steakhouse',
    'Breakfast',
    'Mexican',
  ];

  const handleCategorySelect = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <div className="categories-view">
      <h2>Select a Category:</h2>
      <div className="category-cards">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            selected={selectedCategory === category}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
