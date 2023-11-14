import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder.jsx';
import { useSelector } from 'react-redux';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { setLatitude, setLongitude } from "../../../features/restaurantSlice.js"
import 'mapbox-gl/dist/mapbox-gl.css';

const LocationPickerView = () => {
    const dispatch = useDispatch();
    const { lng, lat } = useSelector(state => state.restaurant);
    const mapRef = useRef();

    useEffect(() => {
        if (!lng && !lat) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position)
                        const { latitude, longitude } = position.coords;
                        mapRef.current.flyTo({
                            center: [longitude, latitude],
                        });
                        dispatch(setLatitude(latitude));
                        dispatch(setLongitude(longitude));
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by your browser');
            }
        }
    }, []);

    return (
        <div className="mapContainer">
            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 8,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={(event) => {
                    dispatch(setLatitude(lat));
                    dispatch(setLongitude(lng));
                }}
            >
                <Marker
                    latitude={lat}
                    longitude={lng}
                    draggable
                    onDragEnd={(e) => {
                        dispatch(setLatitude(e.lngLat.lat));
                        dispatch(setLongitude(e.lngLat.lng));
                    }

                    }
                />
                <NavigationControl position="bottom-right" />
                <GeolocateControl
                    position="top-left"
                    trackUserLocation
                    onGeolocate={(e) => {
                        dispatch(setLatitude(e.coords.longitude));
                        dispatch(setLongitude(e.coords.latitude));
                    }
                    }
                />
                <Geocoder />
            </ReactMapGL>
        </div>
    );
};

export default LocationPickerView;
