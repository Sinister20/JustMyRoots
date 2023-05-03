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
import { BtnGroup, HeroLanding, SliderContent } from '../../components';
import {
  RestaurentItems,
} from './Components';
import Rectangle8341 from 'images/Rectangle8341.png';
import imaged15 from 'images/imaged15.png';






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
        defaultTitle="Fruits & more"
      >
        <meta name="description" content="JMR application" />
      </Helmet>
      <HeroLanding imgSrc={Rectangle8341} heroText1='FRUITS & MORE' />
      <BtnGroup />
      <SliderContent imgSrc={imaged15} />
      <RestaurentItems />
    </AppWrapper>
  );
}
