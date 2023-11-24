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
  const [reviews, setReviews] = useState([])
  const [totalReservations, setTotalReservations] = useState([])
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

  const getTotalReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/restaurants/myRestaurant`)
      const { data } = await axios.get(`http://localhost:3000/api/reservations/resolved/${response.data.id}`)
      setTotalReservations(data)
    } catch (error) {
      console.log(error)
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    }
  }

  const getReviews = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/restaurants/myRestaurant`
    );
    try {
      const { data } = await axios.get(`http://localhost:3000/api/reviews/owner/${response.data.id}`)
      setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }

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

  const approvedReservations = totalReservations.filter(e => e.status === "Approved");
  const rejectedReservations = totalReservations.filter(e => e.status === "Declined");

  useEffect(() => {
    getRestaurant();
    getReviews();
    getTotalReservations();
  }, [navigate])



  return (
    <div >
      <NavBar />
      <div className="flex">
        <div className="flex-1">
          <Settings />
        </div>
        <div>
          <section className="grid gap-8 mt-20 mr-24 grid-cols-2">
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Review Count
                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {reviews.length}
                </dd>
              </dl>
            </div>
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Total Reservations
                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {totalReservations.length}
                </dd>
              </dl>
            </div>
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Rating Count
                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {restaurant.rating_count}
                </dd>
              </dl>
            </div>
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Accepted Reservations
                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {approvedReservations.length}

                </dd>
              </dl>
            </div>
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Total Rating

                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {restaurant.rating}

                </dd>
              </dl>
            </div>
            <div class="p-5 bg-white shadow rounded-2xl w-72 h-44">
              <dl class="space-y-2">
                <dt class="text-sm font-medium text-red-700">
                  Declined Reservations
                </dt>

                <dd class="text-5xl font-light md:text-6xl">
                  {rejectedReservations.length}

                </dd>
              </dl>
            </div>
          </section>
        </div>
      </div>
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
      </div>
    </div>
  );
}

export default Home