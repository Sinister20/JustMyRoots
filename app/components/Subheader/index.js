import React, { useEffect, useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';

const useStyles = makeStyles(theme => ({
  appWrapper: {
    maxWidth: 1200,
    margin: '20px auto',
    padding:'4px',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll !important',
      padding: '0 5px',
      justifyContent: 'flex-start',
    },
  },
  boxList: {
    
    '& a': {
      position: 'relative',
      width: '226px',
      overflow: 'hidden',
      height: '240px',
      borderRadius: '4px',
      display:'flex',
      [theme.breakpoints.down('sm')]: {
        width: '140px',
        height: '130px',
        marginRight: '8px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '124px',
        height: '110px',
        marginRight: '8px',
      },
    },
    '& a::after': {
      content: '',
      display: 'block',
      width: '0',
      height: '3px',
      background: '#ac1715',
      transition: 'width .3s',
      position: 'absolute',
      bottom: '0px',
      zIndex: '9',
    },
    '& a:hover::after': {
      width: '100%',
    },
  },
  
  headerMain: {
    '& .slidemenu': {
      overflow: 'hidden',
      zIndex: '1200',
      display: 'block',
      color: '#fff',
      padding: '0',
      width: '100%',
      '& a': {
        position: 'relative',
        height: '35px',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',  
        borderRadius: '4px',
        boxShadow: '5px 2px 15px 5px #CFCFCF',
        '&:hover': {
        },
        // boxShadow: '5px 2px 15px 5px #CFCFCF',

        // border:'1px solid black',

        // boxShadow:'0 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px 0 rgba(0, 0, 0, 0.5),0 10px 0 0 rgba(0, 0, 0, 0.5),10px 0 0 0 rgba(0, 0, 0, 0.5)',

        [theme.breakpoints.down('sm')]: {
          height: '58px',
        },
        [theme.breakpoints.down('sm')]: {
          height: '56px',
        },
      },
      
      '& a p': {
        fontWeight: 'normal',
        margin: '4px 0 8px 0',
        minHeight: '16px',
        lineHeight: '1.4',
        display: '-webkit-box',
        '-webkit-line-clamp': '1',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
    '& .menuscroll': {
      '& .slidemenu': {
        // position: 'fixed',
        display: 'block',
        top: '150px',
        [theme.breakpoints.down('sm')]: {
          top: '140px',
        },
      },
    },
  },
  navLinks: {
    position: 'relative',
    zIndex: '2',
    alignSelf: 'flex-end',
    width: '100%',
    padding: '10px 10px 0 10px',
    // boxShadow: '1px 1px 1px 1px rgba(255,255,255,0.2)',
    // border:'1px solid black',
    display:'flex',
    justifyContent:'center',
    // background: 'rgb(0, 0, 0)',
    // background:
    //   'linear-gradient(0deg, rgba(0, 0, 0, 1) 34%, rgba(0, 212, 255, 0) 100%)',
    color: 'grey',
    
    [theme.breakpoints.down('sm')]: {
      padding: '50px 10px 0 10px',
    },
    '& h5': {
      padding: ' 0',
      margin: ' 0',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      '&:hover': {
        // boxShadow: '5px 2px 15px 5px #CFCFCF',
        // fontWeight:'bold',
        // fontSize:'16px',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
        marginBottom: '8px',
      },
    },
    '& p': {
      fontWeight: 'normal',
      margin: '6px 0 8px 0',
      minHeight: '36px',
      fontSize: '13px',
      lineHeight: '1.4',
      display: '-webkit-box',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
   
  },
  subHeaderWrapper: {
    background: 'radial-gradient(343px at 46.3% 47.5%, rgb(242, 242, 242) 0%, rgb(241, 241, 241) 72.9%)',
    padding: '2px 0',
    overflow: 'hidden',
    zIndex: 9,
    [theme.breakpoints.down('sm')]: {
      padding: '6px 0',
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.main,
      fontSize: 14,
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: 8,
      },
    },
  },
}));

const Subheader = () => {
  const [headerClassName, setHeaderClassName] = useState('');
  const classes = useStyles();
  const links = [
    {
      link: '/cities',
      text: 'Explore by City',
      paragraph:"",
        // 'Explore the plethora of Nostalgic food dishes from your favourite brands across India.',
      image: 'Cities Image.jpg',
    },
    {
      link: '/cuisine',
      text: 'Explore by Cuisine',
      paragraph:"",
        // 'Experience the different style of cooking characterized by distinctive ingredients, techniques and dishes.',
      image: 'Cuisine.jpg',
    },
    // {
    //   link: '/category',
    //   text: 'Explore by Category',
    //   paragraph:"",
    //     // 'Explore the food items from different brands clubbed together under similar bucket. ',
    //   image: 'Category.jpg',
    // },
    {
      link: '/restaurant-and-brand',
      text: 'Explore by Brand',
      paragraph:"",
        // 'Explore the heirloom restaurants that connects you back to your roots.',
      image: 'Restaurent.jpg',
    },
    {
      link: '/maa-ke-haat-ka-khana',
      text: 'Maa ke haath ka khana',
      paragraph:"",
        // 'Single most intimate expression of our mothers’ love is cooking and pampering their kids with home cooked delicious meals.',
      image: 'Maa ke hath ka khana.jpg',
    },
    // {
    //   link: '/gift-vouchers',
    //   text: 'Gift Vouchers',
    //   paragraph:
    //     'Gift Vouchers',
    //   image: 'bg-maa.png',
    // },
  ];
  const handleScroll = headerClassName => {
    if (headerClassName !== 'menuscroll' && window.pageYOffset >= 280) {
      setHeaderClassName('menuscroll');
    } else if (headerClassName === 'menuscroll' && window.pageYOffset < 280) {
      setHeaderClassName('');
    }
  };

  React.useEffect(() => {
    window.onscroll = () => handleScroll(headerClassName);
  }, [headerClassName]); // IMPORTANT, This will cause react to update depending on change of this value

  return (
    <div className={classes.headerMain}>
      <div id="header_menu" className={headerClassName}>
        {/* <Box
          className={classes.subHeaderWrapper}
          display="flex"
          alignItems="center"
        >
          <div className={classes.appWrapper}>
            {links.map(link => (
              <Box
                display="flex"
                alignItems="center"
                className={classes.boxList}
              >
                <Link to={link.link} title={link.text}>
                  <div className={classes.bgSection}>
                    <img
                      src={require(`../../images/${link.image}`)}
                      alt={link.text}
                    />
                  </div>
                  <div className={classes.navLinks}>
                    <h5>{link.text}</h5>
                    <p title={link.paragraph}>{link.paragraph}</p>
                  </div>
                </Link>
              </Box>
            ))}
          </div>
        </Box> */}
        <div className="slidemenu">
          <Box
            className={classes.subHeaderWrapper}
            display="flex"
            alignItems="center"
          >
            <div className={classes.appWrapper}>
              {links.map(link => (
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.boxList}
                >
                  <Link to={link.link} title={link.text}>
                    {/* <div className={classes.bgSection}>
                      <img
                        src={require(`../../images/${link.image}`)}
                        alt={link.text}
                      />
                    </div> */}
                    <div className={classes.navLinks}>
                      <h5>{link.text}</h5>
                      <p title={link.paragraph}>{link.paragraph}</p>
                    </div>
                  </Link>
                </Box>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
