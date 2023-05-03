import React, { Fragment, useEffect } from 'react';
import UserForm from './components/UserForm';


const UserDetails = props => {
  const { handleClose } = props;
  return (
    <div>
      <UserForm handleClose={handleClose} />
    </div>
  );
};

export default UserDetails;
