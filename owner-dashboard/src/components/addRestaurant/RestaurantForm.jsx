import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment';
import NameDescriptionPhoneView from './NameDescriptionPhoneView';
import CategoriesView from './CategoriesView';
import CityView from "./CityView"
import MainImageView from './MainImageView';
import TimeQuotasView from './TimeQuotesView';
import IntroductionView from './IntroductionView';
import LocationPickerView from './addLocation/LocationPickerView.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestaurantForm = () => {
    const navigate = useNavigate()
    const [currentView, setCurrentView] = useState(1);
    const [loading, setLoading] = useState(false);
    const { name, description, phoneNumber, categories, city, mainImage, menuImages, extraImages, openingTime, closingTime, reservationQuota, isNextDisabled, lat, lng } = useSelector(state => state.restaurant);
    useEffect(() => {
        const storedView = localStorage.getItem('currentView');
        if (storedView) {
            setCurrentView(parseInt(storedView));
        }
    }, []);

    const handleNextClick = () => {
        if (currentView === 1 || !isNextDisabled) {
            setCurrentView(currentView + 1);
            localStorage.setItem('currentView', currentView + 1);
        }
    };

    const handlePreviousClick = () => {
        setCurrentView(currentView - 1);
        localStorage.setItem('currentView', currentView - 1);
    };
    const handleSubmit = async () => {
        setLoading(true);
        const formattedOpeningTime = moment(openingTime, 'HH:mm:ss').toISOString();
        const formattedClosingTime = moment(closingTime, 'HH:mm:ss').toISOString();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("phoneNumber", phoneNumber);
            categories.forEach((category, index) => {
                formData.append(`categories[${index}]`, category);
            });
            menuImages.forEach((image, index) => {
                formData.append(`menuImages[${index}]`, image);
            });
            extraImages.forEach((image, index) => {
                formData.append(`extraImages[${index}]`, image);
            });
            formData.append("City", city);
            formData.append("mainImage", mainImage);
            formData.append("openingTime", formattedOpeningTime);
            formData.append("closingTime", formattedClosingTime);
            formData.append("reservationQuota", reservationQuota);
            formData.append("lat", lat);
            formData.append("lng", lng);

            await axios.post("http://localhost:3000/api/restaurants/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            toast.success("Your application is successfully submitted. You'll hear from us soon!");

            localStorage.clear();
            navigate("/home");
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 403 || error.response.status === 401) {
                    localStorage.clear()
                    navigate('/')
                }
            }
        }
    }

    const renderView = () => {
        switch (currentView) {
            case 1:
                return <IntroductionView />
            case 2:
                return <NameDescriptionPhoneView />;
            case 3:
                return <CategoriesView />;
            case 4:
                return <CityView />;
            case 5:
                return <TimeQuotasView />;
            case 6:
                return <LocationPickerView />;
            case 7:
                return <MainImageView />;
            default:
                return null;
        }
    };

    return (
        <div className='addRestaurantContainer bg-white w-screen h-screen'>
            <div className='view bg-white w-screen'>
                {renderView()}
            </div>
            <div className='footer bg-white w-screen' >
                <div className='leftBtn pl-6'>
                    {currentView > 1 && (
                        <button className="btn" onClick={handlePreviousClick}>Back</button>
                    )}
                </div>
                <div className='righttBtn pr-6'>
                    {currentView < 7 ? (
                        <button className="btn" onClick={handleNextClick} disabled={currentView === 1 ? false : isNextDisabled}>Next</button>
                    ) : (
                        <button className="btn" onClick={handleSubmit} disabled={isNextDisabled}>Submit</button>
                    )}
                </div>
            </div>
            {loading && (
                <div className='loading'>
                    <div className='spinner'></div>
                </div>
            )}
        </div>
    );
}

export default RestaurantForm;
