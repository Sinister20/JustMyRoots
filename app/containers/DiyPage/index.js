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
import { DiyHeroBanner, SetupAPickup, CuisineContainer } from './Components';
import imagehu15 from 'images/imagehu15.png';
import Rectangle09341 from 'images/Rectangle09341.png';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function DiyPage() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="DIY" defaultTitle="DIY">
        <meta name="DIY page" content="DIY" />
      </Helmet>
      <DiyHeroBanner imgSrc={Rectangle09341} heroText1="DIY" />
      <BtnGroup />
      <SetupAPickup
        text1="Missing your home?  Get food "
        text2="Direct From Home"
        btnTxt="Setup a Pickup"
      />
      <CuisineContainer imgSrc={imagehu15} />
    </AppWrapper>
  );
}
