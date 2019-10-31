import React, {useState, useMemo, useEffect, useRef} from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';

import styled from 'styled-components';
import {Box, Text, Heading} from 'rebass/styled-components';

import {GOOGLE_MAPS_API_KEY} from '../utils/constants';
import hambugerIcon from '../assets/images/icons/hamburger.svg';
import restaurantIcon from '../assets/images/icons/fork-knife.png';
import {googleMapsStyle} from '../styles';

const containerStyle = {
  position: 'relative',
  height: 'calc(100vmin - 55vmin)',
  minHeight: '180px',
  width: '100vw',
  maxWidth: '100%',
};

const mapStyle = {
  width: '100vw',
  maxWidth: '100%',
};

const InfoWindowMeta = styled(Box)`
  h1 {
    font-size: 1rem;
  }
`;

const GoogleMaps = props => {
  const {
    google,
    location: {lat = 0, lng = 0} = {},
    contact,
    category,
    name,
  } = props;

  const [mapRef, setMapRef] = useState(null);
  const [markerDrop, setMarkerDrop] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(false);
  const [centerMap, setCenterMap] = useState({lat, lng});
  const [zoom, setZoom] = useState(14);
  const [infoOpen, setInfoOpen] = useState(false);

  const infoRef = useRef();

  const handleLoadMap = useMemo(
    () => (...[, map]) => {
      setMapRef(map);
      const styledMapType = new google.maps.StyledMapType(googleMapsStyle, {
        name: 'Lunch Tyme',
      });
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    },
    [],
  );

  const handleMarkerClick = (...[, marker]) => {
    setCenterMap(marker.position);
    setSelectedPlace(marker);
    setZoom(16);

    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
    setMarkerDrop(false);
  };

  useEffect(() => {
    if (infoRef.current) {
      infoRef.current.infowindow.close();
    }
    setCenterMap({lat, lng});
    setZoom(14);
  }, [name]);

  return (
    <Map
      google={google}
      onReady={handleLoadMap}
      centerAroundCurrentLocation
      mapTypeControl={false}
      fullscreenControl={false}
      streetViewControl={false}
      zoom={zoom}
      style={mapStyle}
      zoomControl={false}
      scaleControl={false}
      containerStyle={containerStyle}
      onCenterChanged={() => setCenterMap(mapRef.getCenter().toJSON())}
      className={'lunch-map'}
      initialCenter={centerMap}
      center={centerMap}
    >
      <Marker
        name={name}
        map={mapRef}
        position={{lat, lng}}
        onClick={handleMarkerClick}
        icon={{
          url: restaurantIcon,
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(0, 40),
        }}
        optimized={false}
        animation={markerDrop ? google.maps.Animation.DROP : false}
      />

      {selectedPlace && (
        <InfoWindow marker={selectedPlace} visible={infoOpen} ref={infoRef}>
          <InfoWindowMeta className="infowindow">
            <Heading
              as="h2"
              sx={{
                fontSize: '0.875rem',
                fontFamily: 'inherit',
              }}
            >
              {name}
            </Heading>
            <Text as="p">{category}</Text>
            {contact && contact.formattedPhone && (
              <Text as="p">{contact.formattedPhone}</Text>
            )}
          </InfoWindowMeta>
        </InfoWindow>
      )}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(GoogleMaps);
