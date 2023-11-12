import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMenuImages, setIsNextDisabled } from "../../features/restaurantSlice";

const MenuImagesView = () => {
  const dispatch = useDispatch();
  const { menuImages } = useSelector((state) => state.restaurant);

  useEffect(() => {
    checkIsNextDisabled(menuImages);
  }, [menuImages]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          dispatch(setMenuImages(imageArray));
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };
  const checkIsNextDisabled = (menuImages) => {
    if (menuImages.length === 0) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  };

  return (
    <div>
      <div>
        <h2 className="head2">Menu Images</h2>
      </div>
      <br></br>
      <label htmlFor="fileInput">
        <i className="Icon fas fa-plus"></i>
      </label>
      <input id="fileInput" type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} multiple />
      <br></br>
      <div className="images">
        {menuImages.map((image, index) => (
          <img key={index} className="Img" src={image} alt={`Menu ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default MenuImagesView;
