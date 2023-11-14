import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "../../../services/axios-interceptor.js";
import moment from 'moment';
import NameDescriptionPhoneView from './NameDescriptionPhoneView';
import CategoriesView from './CategoriesView';
import CityView from "./CityView"
import MainImageView from './MainImageView';
import MenuImagesView from './MenuImagesView';
import ExtraImagesView from './ExtraImagesView'
import TimeQuotasView from './TimeQuotesView';
import IntroductionView from './IntroductionView';
import LocationPickerView from './addLocation/LocationPickerView.jsx';

const RestaurantForm = () => {
    const navigate = useNavigate()
    const [currentView, setCurrentView] = useState(1);
    const [loading, setLoading] = useState(false);
    const { name, description, phoneNumber, categories, city, mainImage, menuImages, extraImages, openingTime, closingTime, reservationQuota, isNextDisabled } = useSelector(state => state.restaurant);
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

            await axios.post("http://localhost:3000/api/restaurants/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
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
            case 8:
                return <MenuImagesView />
            case 9:
                return <ExtraImagesView />
            default:
                return null;
        }
    };

    return (
        <div className='container'>
            <div className='view'>
                {renderView()}
            </div>
            <div className='footer' >
                <div className='leftBtn'>
                    {currentView > 1 && (
                        <button className="btn" onClick={handlePreviousClick}>Back</button>
                    )}
                </div>
                <div className='righttBtn'>
                    {currentView < 8 ? (
                        <button className="btn" onClick={handleNextClick} disabled={currentView === 1 ? false : isNextDisabled}>Next</button>
                    ) : (
                        <button className="btn" onClick={handleSubmit}>Submit</button>
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
