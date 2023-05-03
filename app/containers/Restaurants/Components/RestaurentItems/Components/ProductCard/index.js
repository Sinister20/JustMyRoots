import React, { Fragment } from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { ListCard } from '../../../../../../components';
const useStyles = makeStyles(theme => ({
  sec1Grid: {
    paddingTop: 20,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
  },
}));

const ProductCard = ({
  id,
  secTitle,
  viewType,
  secData,
  addItemToCart,
  cartData,
}) => {
  const classes = useStyles();

  return (
    <Grid item className={classes.sec1Grid}>
      {secData &&
        secData.map((product, i) => (
          <ListCard
            cartData={cartData}
            addItemToCart={addItemToCart}
            key={`product-${i}`}
            productData={product}
            imgSrc={product.productImages && product.productImages[0]}
            cartStyle
          />
        ))}
    </Grid>
  );
};

export default ProductCard;
