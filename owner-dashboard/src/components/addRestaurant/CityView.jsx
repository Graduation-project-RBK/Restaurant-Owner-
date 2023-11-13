import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityCard from './CityCard';
import { setCity, setIsNextDisabled } from "../../features/restaurantSlice";

function CityView() {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.restaurant.city);
  const cities = [
    "Tunis",
    "Sousse",
    "Sfax",
    "Kairouan",
    "Mahdia",
    "Monastir",
    "Bizerte",
    "Touzeur",
    "Djerba",
    "Nabel",
    "Kelibia",
    "Gabes",
  ];
  useEffect(() => {
    if (!selectedCity) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  }, [dispatch, selectedCity]);

  const handleCitySelect = (city) => {
    dispatch(setCity(city));
    dispatch(setIsNextDisabled(false));
  };
  return (
    <div className="city-view">
      <h2 className="head2">Select a City</h2>
      <div className="city-cards">
        {cities.map((city) => (
          <CityCard
            key={city}
            city={city}
            selected={selectedCity === city}
            onSelect={handleCitySelect}
          />
        ))}
      </div>
    </div>
  );
}

export default CityView;
