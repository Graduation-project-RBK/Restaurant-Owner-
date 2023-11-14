import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PremiumCard.css';

const PremiumCard = () => {








    return (


        <div className="pack-container-premium bg-white">
            <div className="header-premium">
                <p className="title-premium">
                    Premium
                </p>
                <div className="price-container-premium">
                    <span>$</span>100
                    <span>/mo</span>
                </div>
            </div>
            <div>
                <ul className="lists-premium">
                    <li className="list-premium">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Everything in basic
                        </p>
                    </li>
                    <li className="list-premium">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Engage directly with potential customers in real-time through the platform.
                        </p>
                    </li>
                    <li className="list-premium">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Gain higher visibility and placement on the platform for increased exposure.
                        </p>
                    </li>
                    <li className="list-premium">
                        <span style={{ backgroundColor: '#fd5c63' }}>
                            <svg aria-hidden="true" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" fill="none" >
                                <path d="M4.5 12.75l6 6 9-13.5" style={{ color: 'black' }} strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        <p>
                            Post up to 20 images to showcase your restaurant in greater detail.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="button-container-premium">
                <button type="button-premium">
                    Buy Now
                </button>
            </div>
        </div>










    )

}


export default PremiumCard