import React, { useState } from 'react';
import NameDescriptionPhoneView from './NameDescriptionPhoneView';
import CategoriesView from './CategoriesView';
import CityView from "./CityView"
import MainImageView from './MainImageView';
import MenuImagesView from './MenuImagesView';
import ExtraImagesView from './ExtraImagesView'
import TimeQuotesView from './TimeQuotesView';
import IntroductionView from './IntroductionView';

const RestaurantForm = () => {
    const [currentView, setCurrentView] = useState(1);

    const handleNextClick = () => {
        setCurrentView(currentView + 1);
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
                return <TimeQuotesView />;
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
        <div>
            {renderView()}
            {currentView > 1 && (
                <button onClick={handlePreviousClick}>Previous</button>
            )}

            {currentView < 8 ? (
                <button onClick={handleNextClick}>Next</button>
            ) : (
                <button>Submit</button>
            )}
        </div>
    );
}

export default RestaurantForm;
