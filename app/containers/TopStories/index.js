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
import { BtnGroup, HeroLanding, SliderContent, TopStoriesTextContent } from '../../components';
import {
  RestaurentItems,
} from './Components';
import Rectangle34341 from 'images/Rectangle34341.png';
import imagehu15 from 'images/imagehu15.png';






const AppWrapper = styled.div`
  width : 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;


export default function FruitsPage() {


  return (
    <AppWrapper>
      <Helmet
        titleTemplate="JMR"
        defaultTitle="Top Stories"
      >
        <meta name="description" content="JMR application" />
      </Helmet>
      <HeroLanding imgSrc={Rectangle34341} heroText1='TOP STORIES' />
      <TopStoriesTextContent />
      <BtnGroup />
      <SliderContent imgSrc={imagehu15} />
      <RestaurentItems />
    </AppWrapper>
  );
}
