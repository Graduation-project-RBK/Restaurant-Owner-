import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NameDescriptionPhoneView from './NameDescriptionPhoneView';
import CategoriesView from './CategoriesView';
import CityView from "./CityView"
import MainImageView from './MainImageView';
import MenuImagesView from './MenuImagesView';
import ExtraImagesView from './ExtraImagesView'
import TimeQuotasView from './TimeQuotesView';
import IntroductionView from './IntroductionView';

const RestaurantForm = () => {
    const [currentView, setCurrentView] = useState(1);
    const { isNextDisabled } = useSelector(state => state.restaurant);

    const handleNextClick = () => {
        if (currentView === 1 || !isNextDisabled) {
            setCurrentView(currentView + 1);
        }
    };

    const handlePreviousClick = () => {
        setCurrentView(currentView - 1);
    };

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
                return <MainImageView />;
            case 7:
                return <MenuImagesView />
            case 8:
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
            <div className='footer'>
                <div className='leftBtn'>
                    {currentView > 1 && (
                        <button onClick={handlePreviousClick}>Back</button>
                    )}
                </div>
                <div className='righttBtn'>
                    {currentView < 8 ? (
                        <button onClick={handleNextClick} disabled={currentView === 1 ? false : isNextDisabled}>Next</button>
                    ) : (
                        <button>Submit</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RestaurantForm;
