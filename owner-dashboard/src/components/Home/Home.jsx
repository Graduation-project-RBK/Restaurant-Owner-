import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Home.css'
import axios from "../../../services/axios-interceptor.js";
import NavBar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings.jsx";
import OwnerMap from "./OwnerMap.jsx";


function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState();
  const [restaurant, setRestaurant] = useState({});
  function handleChange(index) {
    setCurrentIndex(index);
  }

  const getImages = () => {
    if (!restaurant.main_image) {
      return []
    }
    const { main_image, menu_images, extra_images } = restaurant
    return [main_image, ...extra_images]
  }

  const renderSlides = getImages().map((image, index) => (
    <div className="image-container" key={index}>
      <img src={image} alt={`carouesel-image-${index}`} className="slide-img" />
    </div>
  ));

  const getRestaurant = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`)
      setRestaurant(data)

    } catch (error) {
      console.log(error)

      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    }
  }


  useEffect(() => {
    getRestaurant()
    console.log(restaurant.main_image)
  }, [navigate])



  return (
    <div >
      <NavBar />
      <section class="grid gap-8 my-6 md:grid-cols-3">
      <div class="p-5 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
            Reservation Requests for basic restaurants
          </dt>

          <dd class="text-5xl font-light md:text-6xl">
            00%
          </dd>
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
        </dl>
      </div>
      <div class="p-6 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
           Total Number Reservation 
          </dt>

          <dd class="text-5xl font-light md:text-6xl">
            50
          </dd>
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
        </dl>
      </div>
      <div class="p-6 bg-white shadow rounded-2xl">
        <dl class="space-y-2">
          <dt class="text-sm font-medium text-gray-500">
            Number of cu
          </dt>

          <dd class="text-5xl font-light md:text-6xl">
            00%
          </dd>
          <svg
            class="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
        </dl>
      </div>
      </section>
      <div className="App">
        <div className="flex flex-wrap justify-between items-baseline flex-row">
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            selectedItem={getImages()[currentIndex]}
            onChange={handleChange}
            className="carousel-container"
            showThumbs={false}
            showIndicators={true}
            showStatus={false}


          >
            {renderSlides}
          </Carousel>

          <OwnerMap lng={restaurant.longtitude} lat={restaurant.latitude} />
        </div>
        <Settings />



      </div>



    </div>


  );
}

export default Home