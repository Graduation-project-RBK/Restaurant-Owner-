import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMainImage, setMenuImages, setExtraImages, setIsNextDisabled } from "../../features/restaurantSlice";

const MainImageView = () => {
  const dispatch = useDispatch();
  const { mainImage, menuImages, extraImages } = useSelector((state) => state.restaurant);

  useEffect(() => {
    checkIsNextDisabled(mainImage, menuImages);
  }, [mainImage, menuImages]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setMainImage(reader.result));
    };

    reader.readAsDataURL(file);
  };
  const handleMenuImagesChange = (event) => {
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
  const handleExtraImagesChange = (event) => {
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

  const checkIsNextDisabled = (mainImage, menuImages) => {
    if (!mainImage || menuImages.length === 0) {
      dispatch(setIsNextDisabled(true));
    } else {
      dispatch(setIsNextDisabled(false));
    }
  };

  return (
    <>
      <div className="pl-6">
        <div className="addImages">
          <h2 className="head2">Main Image</h2>
          <label htmlFor="mainImageInput">
            <i className="Icon fas fa-plus"></i>
          </label>
          <input id="mainImageInput" type="file" style={{ display: "none" }} accept="image/*" onChange={handleImageChange} />
        </div>
        <br></br>
        {mainImage && <img className="Img" src={mainImage} alt="Main" />}
      </div>
      <br></br>
      <div className="w-screen pl-6">
        <div className="addImages">
          <h2 className="head2">Menu Images</h2>
          <label htmlFor="menuImagesInput">
            <i className="Icon fas fa-plus"></i>
          </label>
          <input id="menuImagesInput" type="file" style={{ display: "none" }} accept="image/*" onChange={handleMenuImagesChange} multiple max={5} />
        </div>
        <br></br>
        <div className="images">
          {menuImages.map((image, index) => (
            <img key={index} className="Img" src={image} alt={`Menu ${index + 1}`} />
          ))}
        </div>
      </div>
      <br></br>
      <div className="pl-6 mb-2">
        <div className="addImages">
          <h2 className="head2">Extra Images</h2>
          <label htmlFor="extraImagesInput">
            <i className="Icon fas fa-plus"></i>
          </label>
          <input id="extraImagesInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleExtraImagesChange} multiple max={5} />
        </div>
        <br></br>
        <p>This step is optional you can skip it and add your extra images later</p>
        <br></br>
        <div className="images">
          {extraImages.map((image, index) => (
            <img key={index} className="Img" src={image} alt={`Extra ${index + 1}`} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainImageView;
