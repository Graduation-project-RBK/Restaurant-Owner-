import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setDescription, setPhoneNumber } from '../../features/restaurantSlice';

function NameDescriptionPhoneView() {
  const dispatch = useDispatch();
  const { name, description, phoneNumber } = useSelector(state => state.restaurant);

  const handleNameChange = (event) => {
    dispatch(setName(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    dispatch(setDescription(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    dispatch(setPhoneNumber(event.target.value));
  };

  return (
    <div>
      <form>
        <label htmlFor='restaurantName'></label>
        <input
          type="text"
          name="restaurantName"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your restaurant name" />
        <label htmlFor='restaurantPhoneNumber'></label>
        <input
          type="text"
          name="restaurantPhoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Enter your restaurant phone number" />
        <label htmlFor='restaurantDescription'></label>
        <input
          type="textarea"
          name="restaurantDescription"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter your restaurant Description" />
      </form>
    </div>
  )
}

export default NameDescriptionPhoneView
