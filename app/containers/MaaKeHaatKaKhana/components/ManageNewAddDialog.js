import { Dialog, DialogContent, DialogTitle, DialogHeader, Typography, Grid, IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import CreateAddress from '../../../components/CreateAddress';
const ManageNewAddDialog = ({ open, handleClose }) => {
    const [addrState, setAddrState] = useState({
        landmark: '',
        pinId: '',
        addressLineOne: '',
        cityId: '',
        stateId: '',
        name: '',
        addressLineTwo: '',
        isDefault: false,
        mobile: '',
        email: '',
    });
    const [message, setMessage] = useState();
    const [orderNow, setOrderNow] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [isEditable, setIsEditable] = useState(false);
    const [isEditableData, setIsEditableData] = useState();
    const [addressDeleted, setAddressDeleted] = useState();
    const [scroll, setScroll] = React.useState('paper');
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            maxWidth='md'
            fullWidth
        >

            <DialogTitle id="alert-dialog-title">
                <Grid container alignItems='center' alignContent='center ' justifyContent='space-between'>
                    <Typography variant="h2">Add new Address</Typography>
                    <IconButton onClick={()=>handleClose()}>
                        <CloseOutlined/>
                    </IconButton>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <CreateAddress
                    setIsEditable={false}
                    addrState={addrState}
                    setAddrState={setAddrState}
                    message={message}
                    setMessage={setMessage}
                    setOrderNow={setOrderNow}
                    isEditable={isEditable}
                    orderNow={true}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    isViewAll={false}
                    handleClose={handleClose}
                />
            </DialogContent>
        </Dialog>
    )

}
export default ManageNewAddDialog;
