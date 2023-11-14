import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder.jsx';
import { useSelector } from 'react-redux';
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { setLatitude, setLongitude } from "../../../features/restaurantSlice.js"
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoid29ya3NwYWNlODU0IiwiYSI6ImNsbDlnZHgxbzFmNmQzY2w3cnlteDF6cmQifQ.0mKeOtdHiEMHDyGzUef0fw';

const LocationPickerView = () => {
    const dispatch = useDispatch();
    const { lng, lat } = useSelector(state => state.restaurant);
    const mapRef = useRef();

    useEffect(() => {
        if (!lng && !lat) {
            fetch('https://ipapi.co/json')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    mapRef.current.flyTo({
                        center: [data.longitude, data.latitude],
                    });
                    dispatch(setLatitude(data.latitude));
                    dispatch(setLongitude(data.longitude));
                });
        }
    }, []);

    return (
        <div className="mapContainer">
            <ReactMapGL
                ref={mapRef}
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 8,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
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
