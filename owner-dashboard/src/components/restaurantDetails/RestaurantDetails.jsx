import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from 'react-redux';
import { Carousel } from "react-responsive-carousel";
import './restaurantDetails.css'

const RestaurantDetails = () => {
    const { ownerId } = useSelector((state) => state.restaurant);
    const [restaurant, setRestaurant] = useState({})
    const [currentIndex, setCurrentIndex] = useState();
    const menuImages = restaurant.menu_images;
    console.log(restaurant)
    const fetchRestaurant = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/restaurants/${ownerId}`)
            setRestaurant(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchRestaurant();
    }, [])

    // const renderSlides = menuImages.map((image) => (
    //     <div>
    //         <img src={image} alt="" />
    //     </div>
    // ));

    function handleChange(index) {
        setCurrentIndex(index);
    }
    return (

        <div className="restaurantDetails">
            <div className="restaurant-image">
                <img className="Img" src={restaurant.main_image} alt="Main" />s
            </div>
            <div className="menu-images">
                {/* <Carousel
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    selectedItem={restaurant.menu_images[currentIndex]}
                    onChange={handleChange}
                    className="carousel-container"
                >
                    {renderSlides}
                </Carousel> */}
            </div>
            <div className="extra-images">
                {restaurant.extra_images}
            </div>
            <div className="restaurant-details">
                <h2>{restaurant.name}</h2>
                <p>{restaurant.description}</p>
                <p>Phone: {restaurant.phone_number}</p>
                <p>City: {restaurant.City}</p>
                <p>Categories: {restaurant.category}</p>
                <p>Opening Time: {restaurant.opening_time}</p>
                <p>Closing Time: {restaurant.closing_time}</p>
                <p>Reservation Quota: {restaurant.reservation_quota}</p>
            </div>
        </div>
    );
}

export default RestaurantDetails;



