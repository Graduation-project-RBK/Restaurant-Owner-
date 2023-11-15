import { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const OwnerMap = ({ lng, lat }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 15,
  });

  useEffect(() => {
    
    setViewport((prevViewport) => ({
      ...prevViewport,
      longitude: lng,
      latitude: lat,
    }));
  }, [lng, lat]);

  return (
    <div className="mapOwnerContainer">
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
                <Marker
                    latitude={lat}
                    longitude={lng}
              
                />
               
           
            </ReactMapGL>
        </div>
    );
};

export default OwnerMap;
