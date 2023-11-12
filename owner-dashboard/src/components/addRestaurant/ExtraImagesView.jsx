import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExtraImages } from "../../features/restaurantSlice";

const ExtraImagesView = () => {
  const dispatch = useDispatch();
  const { extraImages } = useSelector((state) => state.restaurant);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          dispatch(setExtraImages(imageArray));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  return (
    <div>
      <div>
        <h2>Extra Images</h2>
        <br></br>
        <p>This step is optional you can skip it and add your extra images later</p>
      </div>
      <br></br>
      <label htmlFor="fileInput">
        <i className="Icon fas fa-plus"></i>
      </label>
      <input id="fileInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} multiple />
      <br></br>
      {extraImages.map((image, index) => (
        <img key={index} className="Img" src={image} alt={`Extra ${index + 1}`} />
      ))}
    </div>
  );
};

export default ExtraImagesView;
