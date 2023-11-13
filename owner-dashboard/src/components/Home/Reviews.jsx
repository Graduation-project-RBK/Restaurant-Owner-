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
            console.log(data)
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

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
                    <h1 className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg">Read Customer Reviews</h1>
                </div>
                {reviews.length > 0 && (<div className="card-container">

                    {reviews.map((review) =>
                        <ReviewsList review={review} key={review.id} />
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