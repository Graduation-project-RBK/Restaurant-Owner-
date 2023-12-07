import React, { useEffect, useState } from "react";
import './Reviews.css';
import NavBar from "./Navbar";
import axios from "../../../services/axios-interceptor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReviewsList from "./ReviewsList.jsx";


const Reviews = () => {

    const [reviews, setReviews] = useState([])


    const getReviews = async () => {

        const response = await axios.get(
            `http://localhost:3000/api/restaurants/myRestaurant`
        );

        try {
            const { data } = await axios.get(`http://localhost:3000/api/reviews/owner/${response.data.id}`)
            setReviews(data)
        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear();
                navigate("/");
            }

        }
    }

    useEffect(() => {
        getReviews()

    })

    const sortedReviews = reviews.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })


    return (
        <div>
            <NavBar />
            <div className="review-container">

                {sortedReviews.length > 0 && (<div className="review-card-container">

                    {reviews.map((review) =>
                        <>
                            <ReviewsList review={review} key={review.id} />

                        </>
                    )}


                </div>)}


                {!reviews.length && (<h1 className="noReview">
                    No reviews yet.
                </h1>)}

            </div>
        </div>
    )
}
export default Reviews;