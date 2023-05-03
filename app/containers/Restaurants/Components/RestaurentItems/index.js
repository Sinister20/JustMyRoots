import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { ProductCard } from './Components';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '0px auto',
    width: '100%',
    overflow: 'hidden',
    padding: '40px',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      padding: 0,
    },
  },
  section: {
    width: '100%',
    padding: '20px 45px',
    borderLeft: '1px solid #B69C72',
    borderRight: '1px solid #B69C72',
  },
  radioFilter: {
    fontSize: 12,
  },
  radioLabel: {
    fontSize: 12,
  },
  filterChip: {
    padding: '0 25px 30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '10px',
    '& .MuiChip-root': {
      borderRadius: 4,
    },
  },
}));

const RestaurentItems = props => {
  const { brandItems, addItemToCart, cartData, filters, setFilters } = props;
  const [restItems, setResItems] = useState({});
  const classes = useStyles();
  const [tabs, setTabs] = useState(0);
  const costSliderDebounce = useRef();
  const [costSlider, setCostSlider] = useState(filters.cost);

  useEffect(() => {
    costSliderDebounce.current = clearTimeout(costSliderDebounce.current);
    costSliderDebounce.current = setTimeout(() => {
      setFilters({ ...filters, cost: costSlider });
    }, 500);
  }, [costSlider]);

  useEffect(() => {
    if (brandItems && brandItems.items) {
      const restaurentItems = brandItems.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.itemType]: [
            ...(acc[item.itemType] ? acc[item.itemType] : []),
            item,
          ],
        }),
        {},
      );
      setResItems(restaurentItems);
    } else {
      setResItems({});
    }
  }, [brandItems]);

  const handleType = event => {
    setFilters({ ...filters, type: event.target.value });
  };

  return (
    <div className={classes.appWrapper}>
      <div>
        {restItems &&
          !!Object.keys(restItems).length &&
          Object.keys(restItems).map((itmKey, i) => (
            <ProductCard
              cartData={cartData}
              addItemToCart={addItemToCart}
              viewType={tabs}
              secData={restItems[itmKey]}
              id="box-1"
              secTitle={itmKey}
            />
          ))}
        {restItems && !Object.keys(restItems).length && (
          <center>
            <Typography>No item found</Typography>
          </center>
        )}
        {!restItems && (
          <center>
            <Typography>
              No items found please reset or update the filters{' '}
            </Typography>
          </center>
        )}
      </div>
    </div>
  );
};

export default RestaurentItems;
