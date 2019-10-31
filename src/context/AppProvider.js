import React, {useState, useContext, createContext} from 'react';
import {getRestaurantData} from '../utils/api';

const AppContext = createContext();

function AppProvider(props) {
  const [currentRestaurant, setCurrentRestaurant] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  async function getData() {
    try {
      const {restaurants} = await getRestaurantData();
      return setRestaurants(restaurants);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  function handleSetCurrentRestaurant({id} = '') {
    if (id !== undefined) {
      return setCurrentRestaurant(restaurants[id]);
    }
    return setCurrentRestaurant([]);
  }

  return (
    <AppContext.Provider
      value={{
        currentRestaurant,
        restaurants,
        getData,
        handleSetCurrentRestaurant,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useAppContext must be used with an AppProvider`);
  }
  return context;
}

function useAppConsumer(props) {
  return (
    <AppContext.Consumer>
      {({currentRestaurant}) => props.children}
    </AppContext.Consumer>
  );
}

export {AppProvider, useAppContext, useAppConsumer as AppConsumer};
