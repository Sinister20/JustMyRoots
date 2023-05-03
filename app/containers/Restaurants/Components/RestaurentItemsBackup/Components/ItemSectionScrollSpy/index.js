import React, { Fragment } from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { ListCard } from '../../../../../../components';
const useStyles = makeStyles(theme => ({
  section: {
    width: '100%',
    padding: '20px 45px',
    borderLeft: '1px solid #B69C72',
    borderRight: '1px solid #B69C72',
    [theme.breakpoints.down('sm')]: {
      borderLeft: 'none',
      borderRight: 'none',
      padding: '20px',
    },
  },
  sec2Grid: {
    paddingTop: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 0,
      gridRowGap: 0,
    },
  },
  sec1Grid: {
    paddingTop: 20,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridColumnGap: 20,
    gridRowGap: 20,
  },
}));

const ItemSectionScrollSpy = ({
  id,
  secTitle,
  viewType,
  secData,
  addItemToCart,
  cartData,
}) => {
  const classes = useStyles();

  return (
    <section id={id} className={classes.section}>
      <Typography variant="h5" color="primary">
        {secTitle}
      </Typography>

      {viewType === 0 && (
        <Grid item className={classes.sec1Grid}>
          {secData &&
            secData.map((product, i) => (
              <Fragment>
                <ListCard
                  cartData={cartData}
                  addItemToCart={addItemToCart}
                  key={`product-${i}`}
                  productData={product}
                  imgSrc={product.productImages && product.productImages[0]}
                />
                <Divider key={`devider-product${i}`} />
              </Fragment>
            ))}
        </Grid>
      )}
      {viewType === 1 && (
        <Grid item className={classes.sec2Grid}>
          {secData &&
            secData.map((product, i) => (
              <ListCard
                tileView
                cartData={cartData}
                addItemToCart={addItemToCart}
                key={`product-${i}`}
                productData={product}
                imgSrc={product.productImages && product.productImages[0]}
              />
            ))}
        </Grid>
      )}
    </section>
  );
};

export default ItemSectionScrollSpy;
