import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import CommonHeading from '../../../HomePage/Components/CommonHeading';
import ProductCard from '../../../HomePage/Components/ProductCard';
import { sliderOptions, checkImageURL, getItemsSortedByPriorityName , sliderOptionsCustomer } from '../../../../utils/utils';
const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1224,
    margin: '20px auto 40px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
  },
  OwlCarousel: {
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      zIndex: 9999,
      left: '0px',
      transform: 'translateY(-50%)',
      display: 'flex !important',
      [theme.breakpoints.down('sm')]: {
        display: 'none !important',
      },
    },
    '& .owl-item': {
      padding: '20px 15px',
      '&.active:first': {
        paddingLeft: 20,
      },
      [theme.breakpoints.down('sm')]: {
        padding: '20px 10px',
      },
    },
    '& .owl-prev': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .owl-next': {
      background: 'none !important',
      '&:hover': {
        background: 'none !important',
      },
    },
    '& .overlay': {
       overflow: 'scroll',
    },
  },
}));

const CustomerBought = ({ customerBrought, deliveryInLoc, foodType,addItemToCart }) => {

  const classes = useStyles();
  return (
    <div className={classes.appWrapper}>
      <CommonHeading
        heading={['CUSTOMERS WHO BOUGHT THIS ITEM', <br />, 'ALSO BOUGHT']}
        viewmore
      />
      <div className={classes.OwlCarousel}>
        <OwlCarousel options={sliderOptions}>
          {customerBrought  ? customerBrought.items.filter(type=>foodType.indexOf(type.itemType) >= 0).sort((a, b) => getItemsSortedByPriorityName(a,b)).map((item, index) => (
            <ProductCard
              key={index}
                productData={{
                name: item.itemName,
                brand: item.brand,
                // city: deliveryInLoc ? deliveryInLoc.name : '',
                city: item.brandCity,
                type: item.itemType,
                ratings: item.ratings,
                price: item.sellingPrice,
                UOM: item.UOM,
                itemId:item._id,
                 webLink: `item/${item.brandSlug}/${item.slug}?brandId=${
                  item.brandId
                }&itemId=${item._id}`,
                }}
              imgSrc={
                 checkImageURL(item.productImages[0])
              }
              addItemToCart={addItemToCart}

            />
          )): <Skeleton variant="rectangular" width={210} height={118} />}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default CustomerBought;
