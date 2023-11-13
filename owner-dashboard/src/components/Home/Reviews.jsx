import React, { useEffect, useState } from "react";
import './Reviews.css';
import NavBar from "./Navbar";
import axios from "../../../services/axios-interceptor";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Reviews = () => {

    const [reviews, setReviews] = useState([])

    const findCustomerName = async (customerId) => {

        try {

            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${customerId}`)
            return data.fullname


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
                <div className="card-container">

                    {reviews.map((review) =>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                            className="img-thumbnail"
                                            alt="User Avatar"
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <h5 className="card-title" id="name">
                                            Jawhar
                                        </h5>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className="svg"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>

                                        <h6 className="card-subtitle mb-2 text-muted" id="title">
                                            {review.review_title}
                                        </h6>
                                        <p className="card-text">{review.review_body}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
export default Reviews;