import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import CategoryCard from "../addRestaurant/CategoryCard";
import customAxios from "../../../services/axios-interceptor";
import moment from "moment";
import { toast } from 'react-toastify';
import CategoryCheckbox from "./CategoryCheckbox";

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

const Settings = () => {
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
    const { name, value, type } = e.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setSetting({ ...setting, [name]: selectedOptions });
    } else {
      setSetting({ ...setting, [name]: value });
    }
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

    <div className="mt-7 max-w-[700px] ml-2 bg-white rounded-lg p-5 shadow-sm">
      <h2 className="text-black font-bold text-lg">Your restaurant details</h2>

      <div className="mt-4">
        <label className="text-black" htmlFor="quota">
          Reservation Quota:
        </label>
        <input
          id="quota"
          placeholder="Your reservation quota"
          className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2"
          type="text"
          name="ReservationQuota"
          value={setting.ReservationQuota}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <label className="text-black" htmlFor="description">
          Description:
        </label>
        <textarea
          placeholder="Your description"
          className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2"
          id="description"
          name="description"
          value={setting.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4 flex flex-row space-x-2">
        <div className="flex-1">
          <label className="text-black" htmlFor="opensAt">
            Opens at:
          </label>
          <input
            id="opensAt"
            placeholder="Opening time"
            className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2"
            type="time"
            name="opensAt"
            value={setting.opensAt}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-1">
          <label className="text-black" htmlFor="closesAt">
            Closes at:
          </label>
          <input
            id="closesAt"
            placeholder="Closing time"
            className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2"
            type="time"
            name="closingTime"
            value={setting.closingTime}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-black" htmlFor="phoneNumber">
          Phone Number:
        </label>
        <input
          id="phoneNumber"
          placeholder="Your phone number"
          className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2"
          type="tel"
          name="phoneNumber"
          value={setting.phoneNumber}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-4">
        <label className="text-black" htmlFor="categories">
          Categories:
        </label>
        <div className="w-full bg-white rounded-md border-gray-300 text-black px-4 py-2">
          {categories.map((category) => (
            <CategoryCheckbox
              key={category}
              category={category}
              selected={setting.category.includes(category)}
              onChange={() => handleCategorySelect(category)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-white text-black rounded-md px-4 py-2 hover:bg-gray-200 hover:text-gray-900"
          type="submit"
          onClick={handleSave}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Settings;
