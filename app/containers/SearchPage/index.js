/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { BtnGroup } from 'components';
import reducer from './reducer';
import saga from './saga';
import { selectSearchStoreByKey } from './selectors';
import { selectGlobelStoreByKey } from '../App/selectors';
import {
  searchByKey,
  fetchResults,
  updateSearchStoreByKeyVal,
} from './actions';
import { addItemToCart } from '../HomePage/actions';
import { HeroRestaurant, RestaurentItems } from './Components';
import LoadingIndicator from '../../components/LoadingIndicator';

const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

`;

const key = 'searchPageStore';

const SearchPage = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [selectedSearchKey, setSelectedSearchKey] = useState();
  const [loading , setLoading] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    cost: [0, 7000],
    offerDiscount: '',
    sortBy: '',
  });

  const {
    searchByKey,
    fetchResults,
    searchResult,
    addItemToCart,
    updateSearchStoreByKeyVal,
    deliveryInLoc,
  } = props;

  const fetchResultsMasterCall = () => {
    fetchResults({
      keyword: selectedSearchKey,
      // filter: filters.type,
      // sort: filters.sortBy,
      // offer: filters.offerDiscount,
      // cost: filters.cost,
    });
  };

  useEffect(
    () => () => {
      updateSearchStoreByKeyVal({ key: 'searchResult', value: undefined });
    },
    [],
  );

  useEffect(() => {
    if (selectedSearchKey){
     fetchResultsMasterCall();
    }
  }, [selectedSearchKey, filters, deliveryInLoc]);

  return (
    <AppWrapper>
      <Helmet titleTemplate="JMR" defaultTitle="Search">
        <meta name="description" content="JMR application" />
      </Helmet>
      {window.location.pathname !== '/search' &&
      <HeroRestaurant
        searchByKey={searchByKey}
        fetchResults={fetchResults}
        selectedSearchKey={selectedSearchKey}
        setSelectedSearchKey={setSelectedSearchKey}
        fetchResultsMasterCall={fetchResultsMasterCall}
      />
  }
      {searchResult ? (
        <RestaurentItems
          searchResult={searchResult}
          fetchResultsMasterCall={fetchResultsMasterCall}
          filters={filters}
          setFilters={setFilters}
          addItemToCart={addItemToCart}
        />
      ) : <LoadingIndicator/>}
      {/* <BtnGroup noDivider /> */}
    </AppWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  searchResult: selectSearchStoreByKey('searchResult'),
  deliveryInLoc: selectGlobelStoreByKey('deliveryInLoc'),
});

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      searchByKey,
      fetchResults,
      addItemToCart,
      updateSearchStoreByKeyVal,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(SearchPage);
