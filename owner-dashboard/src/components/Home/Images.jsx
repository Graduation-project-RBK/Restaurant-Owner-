import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import "./Images.css";
import axios from "../../../services/axios-interceptor";

const Images = () => {
  const [mainImage, setMainImage] = useState(null);
  const [menuImages, setMenuImages] = useState([]);
  const [extraImages, setExtraImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultImageURLs, setResultImageURLs] = useState({
    main_image: null,
    menu_images: [],
    extra_images: [],
  });
  const [editImage, setEditImage] = useState({
    index: null,
    imageUrl: null,
  });
  const getMyRestaurant = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurants/myRestaurant`
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Images fetched  successfully");
        const responseJson = response.data;
        setResultImageURLs({
          main_image: responseJson.main_image,
          menu_images: responseJson.menu_images,
          extra_images: responseJson.extra_images,
        });
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    getMyRestaurant();
  }, []);
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
      setLoading(true);
      const formData = new FormData();

      formData.append("mainImage", mainImage);

      menuImages.forEach((image, index) => {
        console.log(image);
        formData.append(`menuImages[${index}]`, image);
      });
      extraImages.forEach((image, index) => {
        formData.append(`extraImages[${index}]`, image);
      });

      const response = await axios.post(
        `http://localhost:3000/api/restaurants/upload/`,

        formData
      );
      console.log(response);
      if (response.status === 201) {
        console.log("Images uploaded successfully");
        const responseJson = response.data;
        setResultImageURLs({
          main_image: responseJson.main_image,
          menu_images: responseJson.menu_images,
          extra_images: responseJson.extra_images,
        });
      } else {
        console.error("Failed to upload images");
      }
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  const updateImage = async (property, oldImageUrl, file) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("property", property);
      formData.append("newImageFile", file);
      formData.append("oldImageUrl", oldImageUrl);

      const response = await axios.post(
        `http://localhost:3000/api/restaurants/images`,
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
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setLoading(false);
    }
  };

  const handleEdit = async (property, imageUrl) => {
    try {
      setLoading(true);
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";

      fileInput.click();

      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onloadend = async () => {
            await updateImage(property, imageUrl, reader.result);
          };
        }
      });
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setLoading(false);
    }
  };
  const deleteImage = async (property, imageUrl) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/restaurants/images`,
        {
          data: {
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
      setLoading(false);
    } catch (error) {
      console.error(
        "An error occurred while deleting image property:",
        error.message
      );
      setLoading(false);
    }
  };
  const handleDelete = async (property, imageUrl) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this image?"
      );

      if (confirmDelete) {
        await deleteImage(property, imageUrl);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="menu-container mt-10 max-w-[80%]">
        <h2 className="text-2xl font-bold mb-4">Images</h2>
        <div className="mb-6">
          <label htmlFor="mainImage" className="form-label block mb-2">
            Choose Main Image
          </label>
          <input
            id="mainImage"
            type="file"
            accept="image/*"
            onChange={handleMainImage}
            className="border rounded p-2"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="menuImages" className="form-label block mb-2">
            Choose Menu Images
          </label>
          <input
            id="menuImages"
            type="file"
            accept="image/*"
            onChange={handleMenuImages}
            multiple
            className="border rounded p-2"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="extraImage" className="form-label block mb-2">
            Choose Extra Images
          </label>
          <input
            id="extraImage"
            type="file"
            accept="image/*"
            onChange={handleExtraImage}
            multiple
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
  
        <table className="table-auto mt-8">
          <thead>
            <tr>
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resultImageURLs.main_image && (
              <tr>
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">
                  <img
                    src={resultImageURLs.main_image}
                    alt="Main"
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">Main</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      handleEdit("main_image", resultImageURLs.main_image)
                    }
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete("main_image", resultImageURLs.main_image)
                    }
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )}
            {resultImageURLs.menu_images.map((image, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 2}</td>
                <td className="border px-4 py-2">
                  <img
                    src={image}
                    alt={`Menu ${index + 1}`}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">Menu</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit("menu_images", image)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("menu_images", image)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {resultImageURLs.extra_images.map((image, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {index + 2 + resultImageURLs.menu_images.length}
                </td>
                <td className="border px-4 py-2">
                  <img
                    src={image}
                    alt={`Extra ${index + 1}`}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">Extra</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit("extra_images", image)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete("extra_images", image)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
  
};

export default Images;
