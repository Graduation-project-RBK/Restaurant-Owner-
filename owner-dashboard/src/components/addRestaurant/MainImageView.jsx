import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainImage, setIsNextDisabled } from "../../features/restaurantSlice";

const MainImageView = () => {
  const dispatch = useDispatch();
  const { mainImage } = useSelector((state) => state.restaurant);

  useEffect(() => {
    checkIsNextDisabled(mainImage);
  }, [mainImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setMainImage(reader.result));
    };

    reader.readAsDataURL(file);
  };

  const checkIsNextDisabled = (mainImage) => {
    if (!mainImage) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  };

  return (
    <div>
      <h2 className="head2">Main Image</h2>
      <br></br>
      <label htmlFor="fileInput">
        <i className="Icon fas fa-plus"></i>
      </label>
      <input id="fileInput" type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
      <br></br>
      {mainImage && <img className="Img" src={mainImage} alt="Main" />}
    </div>
  );
};

export default MainImageView;
