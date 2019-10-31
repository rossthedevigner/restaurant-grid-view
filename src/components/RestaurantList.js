import React, {useState, useEffect, memo} from 'react';
import styled from 'styled-components';
import {Box, Text} from 'rebass/styled-components/index';

import {DetailView} from './DetailView';
import {slugify} from '../utils/helpers';
import {useAppContext} from '../context/AppProvider';

import mapIcon from '../assets/images/icon_map@2x.png';
import cellGradient from '../assets/images/cellGradientBackground@2x.png';
import backNavIcon from '../assets/images/ic_webBack@2x.png';
import {breakpoints} from '../styles';

const headerHeight = '88px';

const DetailsViewContainer = styled(Box)`
  position: absolute;
  max-width: 100%;
  transform-origin: 0% 0%;
  transform: ${props =>
    props.detailsOpen ? 'translate(0, 0)' : 'translate(-101%, 0)'};
  transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);
  z-index: 10;
  background-color: rgba(255, 255, 255, 1);
  height: calc(100vh - ${headerHeight});
  margin-top: ${headerHeight};
  @media ${breakpoints.mobileLarge} {
    height: calc(100vh - 128px);
    margin-top: 128px;
  }
`;

const Header = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;
  /* padding: 2vmin 1rem; */
  padding: 1rem;
  color: white;
  background-color: rgba(67, 232, 149, 1);
  align-items: center;
  justify-content: space-between;
  display: flex;
  height: ${headerHeight};
  flex-direction: row;
  align-items: flex-end;

  @media ${breakpoints.mobileLarge} {
    height: 128px;
  }

  & .flex {
    /* flex-basis: 100vmax;
    flex-grow: 1; */
    display: flex;
    flex: 1;
  }

  h1 {
    font-size: 1.063rem;
    @media ${breakpoints.mobileMedium} {
      font-size: 1.25rem;
    }
    @media ${breakpoints.tablet} {
      font-size: 1.75rem;
    }
    @media ${breakpoints.laptop} {
      font-size: 2rem;
    }
    margin-bottom: 0;
    justify-content: center;
    flex: 2;
    padding-bottom: 3px;
    color: rgba(255, 255, 255, 1);
    &.title {
      flex: 2;
    }
  }
`;

const IconMap = styled.div`
  background: transparent url(${mapIcon}) no-repeat bottom right;
  display: flex;
  padding: 3px;
  width: 64px;
  height: 54px;
  background-size: auto 34px;
  @media ${breakpoints.mobileMedium} {
    background-size: auto 54px;
  }
`;

const NavIcon = styled.div`
  background: transparent url(${backNavIcon}) no-repeat bottom left;
  display: flex;
  padding: 3px;
  width: 26px;
  height: 54px;
  background-size: auto 34px;
  @media ${breakpoints.mobileMedium} {
    background-size: auto 54px;
  }
  visibility: hidden;
  .open & {
    visibility: visible;
  }
`;

const ImageRatio = styled(Box)`
  ::before {
    content: '';
    display: block;
    height: 0;
    width: 0;
    padding-bottom: calc(((9 / 16) * 100%));
  }

  div {
    position: absolute;
    bottom: 0;
  }

  p {
    font-size: 1rem;
    @media ${breakpoints.tablet} {
      font-size: 1.25rem;
    }
    @media ${breakpoints.laptop} {
      font-size: 1.375rem;
    }
    padding-bottom: 0.375em;
    font-weight: 800;
    &:last-child {
      font-size: 1rem;
      padding-bottom: 0.75em;
      font-weight: 100;
    }
  }
`;

const RestaurantContainer = styled(Box)`
  position: relative;
  width: 100vw;
  height: 100%;
  /* .open & {
    position: fixed;
  } */
  ::before {
    content: '';
    display: block;
    height: 0;
    width: 0;
    /* padding-bottom: calc(((9 / 16) * 100%)); */
    padding: 2vmin 1rem;
    height: ${headerHeight};
    @media ${breakpoints.mobileLarge} {
      height: 128px;
    }
  }
`;

const MainContainer = styled.main`
  margin-right: -17px;
  height: 100vh;
  overflow-y: ${props => (props.detailsOpen ? 'hidden' : 'scroll')};
  padding-right: ${props => (props.detailsOpen ? '17px' : 0)};
`;

const RestaurantList = memo(props => {
  const {history, match} = props;
  const [detailsOpen, setDetailsOpen] = useState(false);

  const {
    restaurants,
    currentRestaurant,
    handleSetCurrentRestaurant,
  } = useAppContext();

  useEffect(() => {
    let closing = true;

    if (currentRestaurant && currentRestaurant.name) {
      history.push(`/${slugify(currentRestaurant.name)}`);
    } else {
      history.push('/');
      closing = false;
    }
    const timer = setTimeout(() => setDetailsOpen(closing), 100);
    return () => {
      clearTimeout(timer);
    };
  }, [currentRestaurant]);

  useEffect(() => {
    if (!match.path.includes('restaurant')) {
      setDetailsOpen(false);
      handleSetCurrentRestaurant();
    }
  }, [match.path]);

  return (
    <MainContainer className={`app-container ${detailsOpen ? 'open' : ''}`}>
      <Header className="header-container">
        <NavIcon
          className="header-container flex"
          onClick={handleSetCurrentRestaurant}
        ></NavIcon>
        <h1 className="header-container flex title">Lunch Tyme</h1>
        <IconMap className="header-container flex" />
      </Header>

      <DetailsViewContainer detailsOpen={detailsOpen}>
        <DetailView
          className="restaurants__details"
          current={currentRestaurant}
        />
      </DetailsViewContainer>

      <RestaurantContainer className="restaurants">
        <Box
          className="restaurants__grid"
          sx={{
            display: 'grid',
            gridGap: [0],
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            '@media screen and (min-width: 40em)': {
              gridTemplateColumns: 'repeat(2, minmax(320px, 1fr))',
            },
            '@media screen and (min-width: 80em)': {
              gridTemplateColumns: 'repeat(3, minmax(320px, 1fr))',
            },
          }}
        >
          {restaurants.map((restaurant, idx) => {
            const {name, backgroundImageURL, category} = restaurant;
            return (
              <Box
                key={idx}
                onClick={() => handleSetCurrentRestaurant({id: idx})}
                sx={{
                  backgroundImage: `url(${backgroundImageURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <ImageRatio
                  {...props}
                  sx={{
                    px: 16,
                    backgroundImage: `url(${cellGradient})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    position: 'relative',
                  }}
                >
                  <Box>
                    <Text as="p">{name}</Text>
                    <Text as="p">{category}</Text>
                  </Box>
                </ImageRatio>
              </Box>
            );
          })}
        </Box>
      </RestaurantContainer>
    </MainContainer>
  );
});

export {RestaurantList};
