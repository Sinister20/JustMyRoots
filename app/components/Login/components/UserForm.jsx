import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Step3 from './Step3';
import Step4 from './Step4';
import { getUserDetails, submitUserDetails } from '../../../containers/HomePage/actions';
import { selectGlobelStoreByKey } from '../../../containers/App/selectors';

const UserForm = ({ handleClose, submitUserDetails,getUserDetails }) => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    address: '',
    pinCode: '',
    city: '',
    dob: '',
    gender: '',
    anniversary: '',
    ethnicIdentity: '',
    isVeg: '',
  });
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState({
    firstname: null,
    lastname: null,
    city: null,
  });
  // Proceed to next step
  const continues = () => {
    let error1 = null;
    let error2 =null;
    let error3 = null;
     if(!state.firstName){
       error1 ='Please enter first name';
     }
     else if (state.firstName){
      error1=''
    }
     if(!state.lastName){
      error2 ='Please enter last name';
    }
    else {
      error2=''
    }
    if(!state.city){
      error3 ='Please enter your city';
    }
    else{
      error3=''
    }
    setErrorMessage({firstname: error1, lastname: error2, city: error3})

    if(!error1 && !error2 && !error3){
      setStep(step + 1);

    }
  };

  const submit = () => {
    new Promise((resolve, reject) => {
      const tempState = { ...state };
      tempState.isVeg = !['false', 'other'].includes(tempState.isVeg);
      const merged = { ...state, ...tempState };
      //console.log(merged);
      submitUserDetails({ resolve, reject, merged });
    })
      .then(() => {
        if (values) {
          handleClose();
          getUserDetails();
        }
      })
      .catch(e => {
        //console.log(e);
      });
  };

  // Go back to prev step
  const back = e => {
    setStep(step - 1);
  };

  // Handle fields change
  const handleChange = (val, str) => {
    if (str) {
      setState({ ...state, [str]: val });
    }
  };

  const {
    firstName,
    lastName,
    address,
    pinCode,
    city,
    dob,
    gender,
    anniversary,
    ethnicIdentity,
    isVeg,
  } = state;
  const values = {
    firstName,
    lastName,
    address,
    pinCode,
    city,
    dob,
    gender,
    anniversary,
    ethnicIdentity,
    isVeg,
  };

  return (
    <div>
      {step === 1 && (
        <FormUserDetails
          handleChange={handleChange}
          values={values}
          continues={continues}
          errorMessage={errorMessage}
        />
      )}
      {step === 2 && (
        <FormPersonalDetails
          handleChange={handleChange}
          values={values}
          back={back}
          continues={continues}

        />
      )}
      {step === 3 && (
        <Step3
          handleChange={handleChange}
          values={values}
          back={back}
          continues={continues}
        />
      )}
      {step === 4 && (
        <Step4
          handleChange={handleChange}
          values={values}
          back={back}
          continues={submit}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitUserDetails,
      getUserDetails,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserForm);
