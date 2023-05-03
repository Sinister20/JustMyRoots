import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  makeStyles,
  Typography,
  Box,
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { HistoryContext } from 'containers/App/HistoryContext';
import OwlCarousel from 'react-owl-carousel2';
import search from '../../../../images/search.png';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import ProductCard from '../../../HomePage/Components/ProductCard';
import CommonHeading from '../../../HomePage/Components/CommonHeading';
import city from '../../../../images/menuAddress.png';
import { debounceSearchFunction } from '../../../../utils/utils';


const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1280,
    // margin: '50px auto',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '14px auto',
    },
  },
  OwlCarousel: {
    maxWidth: 1224,
    margin: '35px auto 50px',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
    },
    '& .owl-carousel': {
      padding: '0 80px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
      },
      '& .owl-stage-outer': {
        zIndex: 1,
      },
    },
    '& .owl-nav': {
      position: 'absolute',
      top: '50%',
      width: '100%',
      justifyContent: 'space-between',
      zIndex: 0,
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
  },
  borderBottom: {
    borderBottom: 'none !important',
  },
  borderBottomLeftRadius: {
    borderBottomLeftRadius: '12px !important',
  },
  borderBottomRightRadius: {
    borderBottomRightRadius: '12px !important',
  },
  suggestionsBox: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    border: '1px solid #000',
    maxHeight: '500px',
    overflowY: 'scroll',
    background: '#fff',
    borderTop: 'none !important',
    transition: 'border 0.2s ease',
    zIndex:999,
    position:'fixed',
    marginLeft:'10px',
    minWidth:'200px',
    maxWidth:'1200px',
    width:'90%',
    // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  searchWrapper: {
    background: '#fff',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',

    transition: 'border 0.2s ease',
    // width: '100%',
    border: '1px solid #000',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '10px 10px 10px 30px',
    margin: 10,
    height: 45,
    '& img': {
      height: 28,
      width: 28,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 5px 8px 10px',
      // padding: '20px 10px',
      '& img': {
        height: 22, 
        width: 20,
      },

    },
  },
  styledInputBase: {
    paddingLeft: 20,
    flex: 1,
    color: 'inherit',
    fontSize: 20,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      // padding: '20px 10px',
      fontSize:16,
      paddingLeft: 10,

    },
  },
  popoverList: {
    marginTop: 17,
    minWidth: 400,
    padding: '10px 5px',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1,
    zIndex:999,
  },
  searchImg:{
    width:'100px',
  },
  searchSubTitle: {
    fontSize: 14,
    color: '#A9A9A9',
    lineHeight: 1.2,
    fontWeight:500,
    textTransform:'capitalize'
  },
  InputBase: {
    width: '100%',
  },
  recentHistory: {
    margin: '20px 0 0 30px',
    '& img': {
      marginRight: 10,
    },
    '& p': {
      fontSize: 16,
      fontWeight: 500,
      color: '#A9A9A9',
    },
    '& .MuiBox-root:not(:last-child)': {
      marginBottom: 15,
    },
    '& .MuiBox-root:first-child': {
      marginTop: 15,
    },
  },

}));

const HeroRestaurant = props => {
  const { searchByKey, setSelectedSearchKey, selectedSearchKey } = props;

  const classes = useStyles();
  const { history } = useContext(HistoryContext);
  const [suggestions, setSuggestions] = useState([]);
  const debounceSearch = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchKey, setSearchKey] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const inputRef = useRef();


  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const getResults = keyword => {
    setSelectedSearchKey(keyword);
    setSearchKey(keyword);
    setAnchorEl(null);

  };
  const options = {
    margin: 0,
    nav: true,
    dots: false,
    autoplay: false,
    loop: true,
    navText: [
      `<div class='prev-slide'><svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23.6456" cy="24.6417" r="23.6474" transform="rotate(-180 23.6456 24.6417)" fill="#D0D0D0"/>
        <path d="M25.541 15.1829L18.9273 21.7187C17.356 23.2716 17.3411 25.8044 18.8941 27.3757L25.541 34.1008" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
      `<div class='next-slide'>
        <svg width="49" height="49" viewBox="0 0 49 49" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <circle cx="24.6435" cy="24.6437" r="23.6474" fill="#D0D0D0"/>
        <path d="M21.8067 34.103L28.4203 27.5672C29.9917 26.0143 30.0066 23.4815 28.4536 21.9102L21.8067 15.1851" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>`,
    ],
    responsive: {
      0: {
        items: 1.6,
        nav: false,
      },
      450: {
        items: 1.6,
        nav: false,
      },
      600: {
        items: 1.6,
        nav: false,
      },
      1000: {
        items: 4,
      },
    },
  };
  const handleSearch = (value) => {
    
    if (value.length > 0) {
      new Promise((resolve, reject) =>
        searchByKey({ searchKey:value, resolve, reject }),
      ).then(options => {
        setOpenSuggestions(true);
        setSuggestions(options);
      });
    } else {
      setOpenSuggestions(false);
    }
    setSearchKey(value);
      
  }
  const debounceFunSearch = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  }

  const handleBrand =(params)=>{
    history.push(`/brand-and-restaurants/${params.slug}?brandId=${params.id}`)
   
  }

  const handleCuisine =(params)=>{
    history.push(`/cuisine/${params.keyword}`)
   
  }

  const handleCategory =(params)=>{
    history.push(`/category/${params.keyword}`)
   
  }
  const optimizedFn = React.useCallback(debounceFunSearch(handleSearch, 1000), []);

  return (
    <>
      <div className={classes.appWrapper}>
        <div className={`${openSuggestions && classes.borderBottom} ${!openSuggestions && classes.borderBottomLeftRadius} ${!openSuggestions && classes.borderBottomRightRadius} ${classes.searchWrapper}`}>
          <img src={search} height="19px" width="18px" />
          <InputBase
            className={classes.styledInputBase}
            placeholder="Search for brand, cuisine or a dish"
            onChange={(e) =>
              {setSearchKey(e.target.value)
              optimizedFn(e.target.value)}
            }
            onClick={()=> history.push('/search')}
            value={searchKey}
            ref={inputRef}
          />
           {/* <Button 
            variant="text"
            onClick={(e) => {
             setSearchKey('')
             optimizedFn('')
            }}
          > X</Button> */}
        </div>
        {
          openSuggestions  && (<div className={classes.suggestionsBox}>
            {suggestions.length > 0 ?
              suggestions.slice(0,100).map((searchitem, key) => {
                return ((
                  <ListItem
                    key={key}
                    button
                    onClick={() => {
                      // history.push('/search')
                      setOpenSuggestions(false);
                      getResults(searchitem.keyword);
                      setSearchKey(searchitem.keyword);
                      {
                      searchitem.type==='brand' ? handleBrand(searchitem) : getResults(searchitem.keyword);
                      setSearchKey(searchitem.keyword);
                      }
                      {
                      searchitem.type==='cuisine' ? handleCuisine(searchitem) : getResults(searchitem.keyword);
                      setSearchKey(searchitem.keyword);
                      }
                      {
                      searchitem.type==='category' ? handleCategory(searchitem) : getResults(searchitem.keyword);
                      setSearchKey(searchitem.keyword);
                      }
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box mr={2}>
                        <img className={classes.searchImg} src={searchitem.image} alt="City Image" />
                      </Box>
                      <div>
                        <Typography className={classes.searchTitle}>
                          {searchitem.keyword}
                        </Typography>
                        <Typography className={classes.searchSubTitle}>
                          {searchitem.address}
                        </Typography>
                        <Typography className={classes.searchSubTitle}>
                          {searchitem.type}
                        </Typography>
                      </div>
                    </Box>
                  </ListItem>
                ))
              })
              : <Box display="flex" alignItems="center" justifyContent="center" height={100}>
                <div>
                  <Typography className={classes.searchTitle}>
                    No results found
                  </Typography>
                </div>
              </Box>

            }

          </div>)
        }

        {/* <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          // anchorPosition={{ top: 349, left: 420 }}

          >
            {suggestions &&
              suggestions.slice(0,10).map((searchitem, key) => {
                return((
                  <ListItem
                    key={key}
                    button
                    onClick={() => {
                      getResults(searchitem.keyword);
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Box mr={2}>
                        <img src={city} alt="City Image" />
                      </Box>
                      <div>
                        <Typography className={classes.searchTitle}>
                          {searchitem.keyword}
                        </Typography>
                        <Typography className={classes.searchSubTitle}>
                          By category
                        </Typography>
                      </div>
                    </Box>
                  </ListItem>
                ))
              })}
          </Popover> */}

      </div>

    </>
  );
};

export default HeroRestaurant;
