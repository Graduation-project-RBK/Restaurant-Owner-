import React from "react";
import './Reviews.css';
import NavBar from "./Navbar";


const Reviews = () => {
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
                    <h1 className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg" contenteditable="false">Read Customer Reviews</h1>
                </div>
                <ul className="hash-list pad-30-all align-center text-sm">
                    <li>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="wpx-100 img-round mgb-20 image" title="" alt="" data-edit="false" data-editor="field" data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]" />
                        <h5 className="font-cond mgb-5 fg-text-d fs-130 " id="title" contenteditable="false">Martha Stewart</h5>
                    </li>

                </ul>
            </div>
        </div>
    )
}
export default Reviews;