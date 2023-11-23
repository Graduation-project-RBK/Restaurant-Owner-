import { useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const OwnerMap = ({ lng, lat }) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    longitude: Number(lng) || 0,
    latitude: Number(lat) || 0,
    zoom: 15,
  });

  useEffect(() => {
    if (!isNaN(Number(lng)) && !isNaN(Number(lat))) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        longitude: Number(lng),
        latitude: Number(lat),
      }));
    }
  }, [lng, lat]);


  const isValidLatLng = !isNaN(Number(lat)) && !isNaN(Number(lng));

  return (
    <div className="mapOwnerContainer" >
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        {...viewport}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"


      >
        {isValidLatLng && (
          <Marker latitude={Number(lat)} longitude={Number(lng)}>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default OwnerMap;