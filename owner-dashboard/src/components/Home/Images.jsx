import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import "./Images.css";
import axios from "../../../services/axios-interceptor";
import { CiCirclePlus } from "react-icons/ci";

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
      <div className="menu-container mt-10 max-w-[70%]" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-2xl font-bold mb-4">Your Restaurant Images</h2>
        
   
        <div className="mb-6">
  {/* Choose Extra Images */}
  <label htmlFor="extraImage" className="flex mt-5 form-label block mb-2">
    Choose Main Image
    <label
    htmlFor="extraImage"
    className="ml-3 bg-red-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-red-700 inline-block"
  >
    <CiCirclePlus />
    
  </label>
  </label>
  <input
    id="extraImage"
    type="file"
    accept="image/*"
    onChange={handleMainImage}
    multiple
    className="hidden"
  />

</div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {/* Main image */}
          {resultImageURLs.main_image && (
  <div className="relative">
    <img
      src={resultImageURLs.main_image}
      alt="Main"
      className="w-full h-40 object-cover rounded-md"
    />
    <div className="absolute-buttons">
      <div className="image-buttons">
        <button
          onClick={() => handleEdit("main_image", resultImageURLs.main_image)}
          className="bg-blue-500 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete("main_image", resultImageURLs.main_image)}
          className="bg-red-500 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
        </div>

 
        <div className="mb-6">
  {/* Choose Extra Images */}
  <label htmlFor="extraImage" className="flex mt-5 form-label block mb-2">
    Add menu Images
    <label
    htmlFor="extraImage"
    className="ml-3 bg-red-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-red-700 inline-block"
  >
    <CiCirclePlus />
    
  </label>
  </label>
  <input
    id="extraImage"
    type="file"
    accept="image/*"
    onChange={handleMenuImages}
    multiple
    className="hidden"
  />

</div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {/* Menu images */}
          {resultImageURLs.menu_images.map((image, index) => (
  <div key={index} className="relative">
    <img
      src={image}
      alt={`Menu ${index + 1}`}
      className="w-full h-40 object-cover rounded-md"
    />
    <div className="absolute-buttons">
      <div className="image-buttons">
        <button
          onClick={() => handleEdit("menu_images", image)}
          className="bg-blue-500 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete("menu_images", image)}
          className="bg-red-600 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
          ))}
        </div>

        <div className="mb-6">
  {/* Choose Extra Images */}


  <label htmlFor="extraImage" className=" flex mt-5 form-label block mb-2">
    Add Extra Images
    <label
    htmlFor="extraImage"
    className="ml-3 bg-red-500 text-white px-1 py-1 rounded cursor-pointer hover:bg-red-700 inline-block"
  >
    <CiCirclePlus/>
  </label>
  </label>
  
  <input
    id="extraImage"
    type="file"
    accept="image/*"
    onChange={handleExtraImage}
    multiple
    className="hidden"
  />
</div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {/* Extra images */}
          {resultImageURLs.extra_images.map((image, index) => (
  <div key={index} className="relative">
    <img
      src={image}
      alt={`Extra ${index + 1}`}
      className="w-full h-40 object-cover rounded-md"
    />
    <div className="absolute-buttons">
      <div className="image-buttons">
        <button
          onClick={() => handleEdit("extra_images", image)}
          className="bg-blue-500 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete("extra_images", image)}
          className="bg-red-500 bg-opacity-50 text-white px-4 py-1 rounded focus:outline-none"
        >
          Delete
        </button>
      </div>
      </div>
  </div>

))}
        </div>

        {/* Save button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Images;
