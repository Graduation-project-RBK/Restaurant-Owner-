import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Home.css'
import axios from "../../../services/axios-interceptor.js";
import NavBar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    const [currentIndex, setCurrentIndex] = useState();
    const [restaurant, setRestaurant] = useState({});
    function handleChange(index) {
        setCurrentIndex(index);
    }
    const imageData = [
        {
            label: "Image 1",
            alt: "image1",
            url:
                restaurant.main_image
        },
        {
            label: "Image 2",
            alt: "image2",
            url:
                "https://cdn.thomasnet.com/insights-images/eaf2ea91-c0ca-488d-ab63-af480b6f78cb/750px.png"
        },
        {
            label: "Image 3",
            alt: "image3",
            url: "https://moneyinc.com/wp-content/uploads/2018/11/Willow-750x500.jpg"
        },
        {
            label: "Image 4",
            alt: "image4",
            url:
                "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY"
        }
    ];
    const renderSlides = imageData.map((image) => (
        <div key={image.alt}>
            <img src={image.url} alt={image.alt} />
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
            <div className="form-container">
                <h2>Enter Details</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"

                        >
                            <option value="">Select a category</option>
                            <option value="Category 1">Category 1</option>
                            <option value="Category 2">Category 2</option>
                            <option value="Category 3">Category 3</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="openTime">Opens at:</label>
                        <input
                            type="time"
                            id="openTime"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="closeTime">Closes at:</label>
                        <input
                            type="time"
                            id="closeTime"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"


                        />
                    </div>

                    <button className='save' type="button">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Home