import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setIsNextDisabled } from '../../features/restaurantSlice';
import CategoryCard from './CategoryCard';
import "./style.css"

const CategoriesView = () => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector((state) => state.restaurant.categories);

  const categories = [
    'Italian',
    'Tunisian',
    'Japanese',
    'Lebanese',
    'Steakhouse',
    'Breakfast',
    'Mexican',
    'French',
  ];

  useEffect(() => {
    if (selectedCategories.length === 0) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  }, [dispatch, selectedCategories]);

  const handleCategorySelect = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    dispatch(setCategories(updatedCategories));
    dispatch(setIsNextDisabled(updatedCategories.length === 0));
  };

  return (
    <div className="categories-view">
      <h2 className="head2">Select a Category</h2>
      <div className="category-cards">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            selected={selectedCategories.includes(category)}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesView;
