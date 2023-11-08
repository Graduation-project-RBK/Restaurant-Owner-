import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Home.css'
import { useSelector } from 'react-redux';
import axios from "axios";
import NavBar from "./Navbar.jsx";







function Home() {

  const { ownerId,main_image } = useSelector((state) => state.restaurant);



  const [currentIndex, setCurrentIndex] = useState();
  const [restaurant, setRestaurant] = useState({});
  function handleChange(index) {
    setCurrentIndex(index);
  }
  const imageData = [
    {
      label: "Image 2",
      alt: "image2",
      url:
        "https://lh3.googleusercontent.com/p/AF1QipOx2adqMx4WdHSw8CAj49e4cyHhyFKD4snDJJ9V=s680-w680-h510"
    },
    {
      label: "Image 3",
      alt: "image3",
      url: "https://lh3.googleusercontent.com/p/AF1QipN-VHzLRvf5SD06jLuQjnEIMCd4x6DLlquflXMH=s680-w680-h510"
    },
    {
      label: "Image 4",
      alt: "image4",
      url:
      "https://lh3.googleusercontent.com/p/AF1QipPOi82wRLInx9yBX0Ym4Xpm47xFTRjrKJTBf6Kh=s680-w680-h510"
    }
  ];
  const renderSlides = imageData.map((image) => (
    <div className="image-container" key={image.alt}>
      <img src={image.url} alt={image.alt} className="slide-img"  />
    </div>
  ));

  const getRestaurant = async () => {
    try {

      const { data } = await axios.get(`http://localhost:3000/api/restaurants/${ownerId}`)
      setRestaurant(data)

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    getRestaurant()
    console.log(restaurant.main_image)
  }, [])



  return (
    <div>
      <NavBar />

      <div className="App">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          selectedItem={imageData[currentIndex]}
          onChange={handleChange}
          className="carousel-container"
        >
          {renderSlides}
        </Carousel>
 
      </div>
    </div>
 
  );
}

export default Home
