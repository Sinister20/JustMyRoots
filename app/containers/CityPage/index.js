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
import Rectangle9341 from 'images/Rectangle9341.png';
import { BtnGroup, HeroLanding, SliderContent } from '../../components';
import { RestaurentItems } from './Components';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function OfferPage() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="City | Just My Roots">
        <meta name="description" content="JMR application" />
      </Helmet>
      <HeroLanding imgSrc={Rectangle9341} heroText1={[<h2>Kolkata</h2>]} />
      <BtnGroup />
      <SliderContent />
      <RestaurentItems />
    </AppWrapper>
  );
}
