
import axios from "../../../services/axios-interceptor";
import porfileImage from '../../assets/images/icons8-customer-50.png'
import React, { useEffect, useState } from "react";
import './Reviews.css';
import { Rating } from 'react-simple-star-rating'






const ReviewsList = ({ review }) => {

    const [name, setName] = useState('')
    const [customerImage, setCustomerImage] = useState('')

    const findCustomerName = async (customerId) => {

        try {

            const { data } = await axios.get(`http://localhost:3000/api/owners/customers/${customerId}`)
            setName(data.fullname)
            setCustomerImage(data.profilePic)


        } catch (error) {
            console.log(error)
            if (error.response.status === 403 || error.response.status === 401) {
                localStorage.clear()
                navigate('/')
            }
        }
    }


    useEffect(() => {
        findCustomerName(review.customerId)
    })



    return (
        <div className="review-card">
            <div className="review-card-body">
                <div className="review-top">
                    <img
                        src={customerImage ? customerImage : porfileImage}
                        className="img-thumbnail"
                        alt="User Avatar"
                    />

                    <h5 className="review-card-title" id="name">
                        {name}
                    </h5>
                </div>

                <div className="review-row">

                    <div className="col-md-8">

                        <h6 className="review-card-subtitle text-muted" id="title">
                            {review.review_title}
                        </h6>
                        <div className="rating">

                            <Rating initialValue={review.rating} readonly={true} iconsCount={5}
                                allowFraction={true} size={20} />
                        </div>
                        <p className="review-card-text">{review.review_body}</p>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ReviewsList;