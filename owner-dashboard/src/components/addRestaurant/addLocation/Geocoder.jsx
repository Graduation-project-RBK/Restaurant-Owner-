import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useDispatch } from 'react-redux';
import { setLatitude, setLongitude } from "../../../features/restaurantSlice"
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = () => {
    const dispatch = useDispatch();
    const ctrl = new MapBoxGeocoder({
        accessToken: 'pk.eyJ1Ijoid29ya3NwYWNlODU0IiwiYSI6ImNsbDlnZHgxbzFmNmQzY2w3cnlteDF6cmQifQ.0mKeOtdHiEMHDyGzUef0fw',
        marker: false,
        collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        dispatch(setLatitude(coords[1]));
        dispatch(setLongitude(coords[0]));

    });
    return null;
};

export default Geocoder;