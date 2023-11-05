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
      <input
        className="input-box"
        type="textarea"
        name="restaurantName"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your restaurant name" />
      <span className="underline"></span>
      <input
        className="input-box"
        type="textarea"
        name="restaurantPhoneNumber"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter your restaurant phone number" />
      <span className="underline"></span>
      <input
        className="input-box"
        type="textarea"
        name="restaurantDescription"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter your restaurant Description" />
      <span className="underline"></span>
    </div>
  )
}

export default NameDescriptionPhoneView;
