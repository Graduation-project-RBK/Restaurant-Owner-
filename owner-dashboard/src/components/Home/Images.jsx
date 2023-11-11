import React, { useState } from "react";
import NavBar from "./Navbar";
import "./Images.css";
import axios from "axios";

const Images = () => {
  const [mainImage, setMainImage] = useState(null);
  const [menuImages, setMenuImages] = useState([]);
  const [extraImages, setExtraImage] = useState([]);
  const [resultImageURLs, setResultImageURLs] = useState({
    main_image: null,
    menu_images: [],
    extra_images: [],
  });
  const [editImage, setEditImage] = useState({
    index: null,
    imageUrl: null,
  });

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setMainImage(reader.result);
    };
  };

  const handleMenuImages = (e) => {
    const files = e.target.files;
    const imageArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          setMenuImages(imageArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleExtraImage = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);
        if (imageArray.length === files.length) {
          setExtraImage(imageArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("mainImage", mainImage);

      menuImages.forEach((image, index) => {
        console.log(image);
        formData.append(`menuImages[${index}]`, image);
      });
      extraImages.forEach((image, index) => {
        formData.append(`extraImages[${index}]`, image);
      });
      const restaurantId = 29;
      const response = await fetch(
        `http://localhost:3000/api/restaurants/upload/${restaurantId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Images uploaded successfully");
        const responseJson = await response.json();
        setResultImageURLs({
          main_image: responseJson.main_image,
          menu_images: responseJson.menu_images,
          extra_images: responseJson.extra_images,
        });
      } else {
        console.error("Failed to upload images");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  console.log(resultImageURLs);
  const updateImage = async (restaurantId, property, oldImageUrl, file) => {
    try {
      const formData = new FormData();

      formData.append("property", property);
      formData.append("newImageFile", file);
      formData.append("oldImageUrl", oldImageUrl);
      formData.append("restaurantId", restaurantId);

      const response = await axios.post(
        `http://localhost:3000/api/restaurants/${restaurantId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image updated successfully");
        const responseJson = response.data;
        setResultImageURLs({
          main_image: responseJson.main_image,
          menu_images: responseJson.menu_images,
          extra_images: responseJson.extra_images,
        });
      } else {
        console.error(
          "Failed to update image. Server returned:",
          response.status
        );
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const handleEdit = async (property, imageUrl) => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.click();

      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];

        if (file) {
          const restaurantId = 29;
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onloadend = async () => {
            await updateImage(restaurantId, property, imageUrl, reader.result);
          };
        }
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  const deleteImage = async (restaurantId, property, imageUrl) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/restaurants/${restaurantId}/images`,
        {
          data: {
            id: restaurantId,
            property: property,
            imageUrl: imageUrl,
          },
        }
      );

      if (response.status === 200) {
        console.log("Image property deleted successfully:", response.data);
        const responseJson = response.data;
        setResultImageURLs({
          main_image: responseJson.main_image,
          menu_images: responseJson.menu_images,
          extra_images: responseJson.extra_images,
        });
      } else {
        console.error("Failed to delete image property:", response.data.error);
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting image property:",
        error.message
      );
    }
  };
  const handleDelete = async (property, imageUrl) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this image?"
      );

      if (confirmDelete) {
        const restaurantId = 29;

        await deleteImage(restaurantId, property, imageUrl);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="menu-container">
        <h2>Images</h2>
        <div className="mb-3">
          <label htmlFor="mainImage" className="form-label">
            Choose Main Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleMainImage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="menuImages" className="form-label">
            Choose Menu Images
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleMenuImages}
            multiple
          />
        </div>
        <div className="mb-3">
          <label htmlFor="extraImage" className="form-label">
            Choose Extra Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleExtraImage}
            multiple
          />
        </div>
        <button onClick={handleSave}>Save</button>

        <table className="table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Image</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {resultImageURLs.main_image && (
              <tr>
                <td>1</td>
                <td>
                  <img
                    src={resultImageURLs.main_image}
                    alt="Main"
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                  <div>
                    <button
                      onClick={() =>
                        handleEdit("main_image", resultImageURLs.main_image)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete("main_image", resultImageURLs.main_image)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>Main</td>
              </tr>
            )}
            {resultImageURLs.menu_images.map((image, index) => (
              <tr key={index}>
                <td>{index + 2}</td>
                <td>
                  <img
                    src={image}
                    alt={`Menu ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                </td>
                <td>Menu</td>
              </tr>
            ))}
            {resultImageURLs.extra_images.map((image, index) => (
              <tr key={index}>
                <td>{index + 2 + resultImageURLs.menu_images.length}</td>
                <td>
                  <img
                    src={image}
                    alt={`Extra ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "auto",
                      display: "block",
                    }}
                  />
                </td>
                <td>Extra</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Images;
