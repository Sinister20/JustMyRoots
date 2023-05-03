/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import {
  HeroRestaurant, TheSchedule, CustomerReviewAndRating,
} from './Components';



const AppWrapper = styled.div`
  width : 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {


  return (
    <AppWrapper>
      <Helmet
        titleTemplate="JMR"
        defaultTitle="Restaurants"
      >
        <meta name="description" content="JMR application" />
      </Helmet>
      <HeroRestaurant />
      <TheSchedule />
      <CustomerReviewAndRating />
    </AppWrapper>
  );
}
