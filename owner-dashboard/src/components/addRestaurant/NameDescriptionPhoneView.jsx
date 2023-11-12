import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  const handlePhoneNumberChange = (event) => {
    const updatedPhoneNumber = event.target.value;
    dispatch(setPhoneNumber(updatedPhoneNumber));
    checkIsNextDisabled(name, updatedPhoneNumber, description);
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
      <label>Name:</label>
      <input
        className="input-box"
        type="textarea"
        name="restaurantName"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your restaurant name"
        required />
      <span className="underline"></span>
      <label>Description:</label>
      <input
        className="input-box"
        type="textarea"
        name="restaurantDescription"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter your restaurant Description"
        required />
      <span className="underline"></span>
      <label>Phone Number:</label>
      <input
        className="input-box"
        type="tel"
        name="restaurantPhoneNumber"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="99 999 999"
        pattern="[0-9]{2}-[0-9]{3}-[0-9]{3}"
        required />
      <span className="underline"></span>

    </div>
  )
}

export default NameDescriptionPhoneView;
