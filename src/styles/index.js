import styledNormalize from 'styled-normalize';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
 
  html, body {
    @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800&display=swap');
    font-family: "Nunito", Arial, Helvetica, sans-serif;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    height: 100%;
    margin: 0;
    padding: 0;    
  }

  *, *:before, *:after {
    -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box; 
    box-sizing: border-box;
  }
`;

const size = {
  mobileSmall: '320px',
  mobileMedium: '375px',
  mobileLarge: '640px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
};

const breakpoints = {
  mobileSmall: `(min-width: ${size.mobileSmall})`,
  mobileMedium: `(min-width: ${size.mobileMedium})`,
  mobileLarge: `(min-width: ${size.mobileLarge})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

const googleMapsStyle = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: 33,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f7f7f7',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#deecdb',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
      {
        lightness: '25',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        lightness: '25',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        saturation: '-90',
      },
      {
        lightness: '25',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#e0f1f9',
      },
    ],
  },
];

export {GlobalStyle, breakpoints, googleMapsStyle};
