import React from 'react';
import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import Rectangle1160 from '../../../../../../images/Rectangle1160.jpg';
import {
  JmrCardType1,
  ListCard,

} from '../../../../../../components';
import { addItemToCart } from '../../../../../HomePage/actions';
import { checkImageURL } from '../../../../../../utils/utils';
import { ProductCard } from '../../../../../HomePage/Components';
import { ImageCardWithTitleBtn } from '../../../../../../components';
const useStyles = makeStyles(theme => ({
  section: {
    width: '100%',
  },
  sec4Grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridColumnGap: 20,
    gridRowGap: 15,
    height: 390,
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
  temp,
  filters,
  searchResult,
  addItemToCart,
}) => {
  const classes = useStyles();

  const listUI = Array.from(Array(9).keys());

  return (
    <section id={id} className={classes.section}>
      {!temp && (
        <Typography variant="h5" color="primary">
          {/* {secTitle} */}
        </Typography>
      )}
      {/* <JMRCard /> */}
      {viewType === '1' && (
        <Grid container spacing={2}>
          {searchResult && searchResult.item && searchResult.item.length >= 1
            ? searchResult &&
            searchResult.item &&
            searchResult.item.sort().map((itemData, i) => {
              return (
                <Grid item xs={9} sm={6} md={4} lg={3} key={i}>
                  <ProductCard
                    productData={{
                      name: itemData.itemName,
                      brand: itemData.brand.brandName,
                      city: itemData.location.locationName,
                      price: itemData.sellingPrice,
                      discount: itemData.discount,
                      ratings: itemData.ratings,
                      UOM: itemData.UOM,
                      webLink: `item/${itemData.brand.brandSlug & itemData.brand.brandSlug}/${itemData.slug && itemData.slug}?brandId=${itemData.brand._id}&itemId=${itemData._id}`,
                      itemId: itemData._id,
                      brandId: itemData.brand._id,
                      type:itemData.itemType,
                    }}
                    // isFavorite={false}
                    imgSrc={checkImageURL(itemData.itemImage)}
                    addItemToCart={addItemToCart}

                  />
                </Grid>


              )
            })
            : <p>Item Not found</p>}
        </Grid>
      )}
      {viewType !== '1' && (
        <Grid container spacing={2}>
          {searchResult &&
            searchResult.brand && searchResult.brand.length >= 1
            ?
            searchResult.brand.map((item,i) => {
              return ((
                <Grid item xs={12} sm={6} md={4} lg={3} key={i} >
                  <ImageCardWithTitleBtn
                    productData={{
                      name: item.brandName,
                      description: item.brandDescription
                      ? item.brandDescription
                        : item.brandShortDescription,
                        webLink: `brand-and-restaurants/${item.brandSlug}?brandId=${
                          item._id
                        }`,
                    }}
                    subHeader={item.location.locationName}
                    imgSrc={checkImageURL(item.brandImage)}
                  />
                </Grid>

              ))
            })
            : <p>Brand Not Found</p>
          }
        </Grid>
      )}
    </section>
  );
};

export default ItemSectionScrollSpy;
