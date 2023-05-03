import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const defineHeightWidth = (height, width) => {
  const containerStyle = {
    width,
    height,
  };
  return containerStyle;
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MapCard(props) {
  const { width, height } = props;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={defineHeightWidth(height, width)}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapCard);
