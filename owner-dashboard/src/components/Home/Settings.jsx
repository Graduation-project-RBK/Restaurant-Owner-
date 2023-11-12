import React, { useState ,useEffect} from "react";
import NavBar from "./Navbar";
import "./Settings.css";
import CategoryCard from "../addRestaurant/CategoryCard";
import customAxios from "../../../services/axios-interceptor";
import moment from "moment";
import { toast } from 'react-toastify';

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
    opensAt: "",
    closingTime: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSetting({ ...setting, [name]: value });
  };
  const handleCategorySelect = (category) => {
    const updatedCategories = setting.category.find((elem) => elem === category)
      ? setting.category.filter((c) => c !== category)
      : [...setting.category, category];
    setSetting({ ...setting, category: updatedCategories });
  };
  const handleSave = async (event) => {
    try {
      setLoading(true);

      event.preventDefault();

      const {
        description,
        category: categories,
        ReservationQuota: reservationQuota,
        opensAt,
        closingTime: closesAt,
        phoneNumber,
      } = setting;
      const openingTime = moment(opensAt, "HH:mm:ss").toISOString();
      const closingTime = moment(closesAt, "HH:mm:ss").toISOString();
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
      setLoading(false);
      console.log(response);
      if (response.status === 201) {
     
        console.log("Restaurant info upadted successfully");
        const responseJson = response.data;
        console.log(responseJson);
        toast.success(
          "Information saved"
        );
      } else {
        console.error("Failed to save changes");
        toast.error("Failed to save changes");
      }
      
      
      
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };
  const getRestaurant = async () => {
    try {
            setLoading(true)
          
        const { data } = await customAxios.get(`http://localhost:3000/api/restaurants/myRestaurant`)
        setSetting({
          description: data.description,
          category: data.category,
          ReservationQuota: data.reservation_quota,
          opensAt: moment(data.opening_time).format('HH:mm'),
          closingTime: moment(data.closing_time).format('HH:mm'),
          phoneNumber: data.phone_number,

        })
        setLoading(false)
     
    } catch (error) {
        console.log(error)
        setLoading(false)
        if (error.response.status === 403 || error.response.status === 401) {
            localStorage.clear()
            navigate('/')
        }
    }


}

useEffect(() => {
    getRestaurant()
}, [])
  return (
    <div>
      <NavBar />

      <div className="form-container">
        <h2>Edit Your Details</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              name={"description"}
              value={setting.description}
              id="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reserv-quota">Reservation Quota:</label>
            <input
              name={"ReservationQuota"}
              type="number"
              id="reserv-quota"
              value={setting.ReservationQuota}
              onChange={handleInputChange}
            />
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
            <input
              name={"opensAt"}
              value={setting.opensAt}
              type="time"
              id="openTime"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="closeTime">Closes at:</label>
            <input
              name={"closingTime"}
              value={setting.closingTime}
              type="time"
              id="closeTime"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              name={"phoneNumber"}
              value={setting.phoneNumber}
              type="tel"
              id="phoneNumber"
              onChange={handleInputChange}
            />
          </div>

          <button className="save" type="submit">
            Save
          </button>
        </form>
      </div>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};
export default settings;
