import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { setName, setDescription, setPhoneNumber, setIsNextDisabled } from '../../features/restaurantSlice';

function NameDescriptionPhoneView() {
  const dispatch = useDispatch();
  const { name, description, phoneNumber } = useSelector(state => state.restaurant);

  const handleNameChange = (event) => {
    const updatedName = event.target.value;
    dispatch(setName(updatedName));
    checkIsNextDisabled(updatedName, phoneNumber, description);
  };

  const handleDescriptionChange = (event) => {
    const updatedDescription = event.target.value;
    dispatch(setDescription(updatedDescription));
    checkIsNextDisabled(name, phoneNumber, updatedDescription);
  };

  const handlePhoneNumberChange = (value) => {
    dispatch(setPhoneNumber(value));
    checkIsNextDisabled(name, value, description);
  };

  const checkIsNextDisabled = (name, phoneNumber, description) => {
    if (!name || !phoneNumber || !description) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  };

  return (
    <div className="input-wrapper">
      <div>
        <label>Name:</label>
        <input
          className="input-box"
          type="textarea"
          name="restaurantName"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your restaurant name"
          required
        />
        <label>Description:</label>
        <input
          className="input-box"
          type="textarea"
          name="restaurantDescription"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter your restaurant Description"
          required
        />
      </div>
      <br></br>
      <div>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
    </div>
  );
}

export default NameDescriptionPhoneView;
