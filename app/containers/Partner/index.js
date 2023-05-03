import React from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Logo from '../../images/revenues.png';
import Icon from '../../images/Peoples.png';
import Photo from '../../images/door.png';
import Capture from '../../images/brand.png';
import Card from './Components/Card';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    card:{
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        padding:'4rem 8rem' ,
        backgroundColor:'#F8F8FF',
        marginTop:'2rem',  
        width: '100%',
        height: 'auto',
        [theme.breakpoints.dowm('xs')]:{
          flexDirection:'column',
          padding:'0',
        }
         
     

    }

}))

const Partner = () => {
    const classes= useStyles();
  return (
    <div>
      {/* <Header />

      <Form /> */}


      <div className={classes.card}>
        <Card image={Logo} title="Increase your revenue" />
        <Card image={Icon} title="Reach out to a large customer base" />
        <Card image={Photo} title="Access to the large delivery fleet" />
        <Card image={Capture} title="Increase your brand visibility" />
      </div>
    </div>
  );
};

export default Partner;
