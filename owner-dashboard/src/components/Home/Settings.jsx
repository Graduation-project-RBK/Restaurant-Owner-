import React, { useState } from "react";
import NavBar from "./Navbar";
import "./Settings.css";
import CategoryCard from "../addRestaurant/CategoryCard";
import customAxios from "../../../services/axios-interceptor";
import moment from 'moment';

const categories = [
  "Italian",
  "Tunisian",
  "Japanese",
  "Lebanese",
  "Steakhouse",
  "Breakfast",
  "Mexican",
  "French",
];

const settings = () => {
  const [setting, setSetting] = useState({
    description: "",
    category: [],
    ReservationQuota: "",
    opensAt: Number,
    closingTime: Number,
    phoneNumber: Number,
  });
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSetting({ ...setting, [name]: value });
  };
  const handleCategorySelect = (category) => {
    const updatedCategories = setting.category.find((elem) => elem === category)
      ? selectedCategories.filter((c) => c !== category)
      : [...setting.category, category];
    setSetting({ ...setting, category: updatedCategories });
  };
  const handleSave = async (event) => {
    try {
      event.preventDefault()
     // setLoading(true);
 
      const {
        description,
        category: categories,
        ReservationQuota: reservationQuota,
        opensAt,
        closingTime:closesAt,
        phoneNumber,
      } = setting;
      const openingTime = moment(opensAt, 'HH:mm:ss').toISOString();
      const closingTime  = moment(closesAt, 'HH:mm:ss').toISOString();
      const response = await customAxios.post(
        `http://localhost:3000/api/restaurants/myRestaurant`,

        {
          description,
          categories,
          reservationQuota,
          openingTime,
          closingTime,
          phoneNumber,
        }
      );
      console.log(response);
      if (response.status === 201) {
        console.log("Restaurant uploaded successfully");
        const responseJson = response.data;
        console.log(responseJson)
      } else {
        console.error("Failed to upload images");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div>
      <NavBar />

      <div className="form-container">
        <h2>Edit Your Details</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input name={"description"} id="description" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="reserv-quota">Reservation Quota:</label>
            <input  name={"ReservationQuota"}   type="number" id="reserv-quota" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <div className="category-grid">
              {categories.map((category) => (
                <CategoryCard
                  key={category}
                  category={category}
                  selected={setting.category.find((elem) => elem === category)}
                  onSelect={handleCategorySelect}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="openTime">Opens at:</label>
            <input   name={"opensAt"}  type="time" id="openTime" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="closeTime">Closes at:</label>
            <input  name={"closingTime"} type="time" id="closeTime" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input name={"phoneNumber"} type="tel" id="phoneNumber" onChange={handleInputChange} />
          </div>

          <button className="save" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default settings;
