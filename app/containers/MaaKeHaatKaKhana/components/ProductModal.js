import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const ProductAddModal = ({
  open,
  handleClose,
  history,
  updateGlobelStoreByKeyVal,
  packagingType = [],
  handleAddProduct,
}) => {
  const [state, setState] = React.useState({
    description: null,
    packagingType: null,
    quantity: null,
  });
  const [error, setError] = React.useState({
    packagingType: null,
    quantity: null,
    description: null,
  });
  const [weightScale, setWeightScale] = React.useState(null);
  const handleChange = e => {
    const { name, value } = e.target;
    setError({
      ...error,
      [e.target.name]: null,
    });
    if (name === 'quantity') {
      if (value <= 0) {
        setError({
          ...error,
          [e.target.name]: 'Quantity should be greater than 0',
        });
      }
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  React.useEffect(() => {
    const pkType = window.localStorage.getItem('validateDFHCity');
    if (pkType) {
      const ws = JSON.parse(pkType).weightScale;
      setWeightScale(ws);
    } else {
      history.push('/maa-ke-haat-ka-khana');
    }
  }, []);

  const handleSubmit = () => {
    const isValid = Object.entries(state).every(([key, value]) => {
      if (key === 'quantity') {
        if (value <= 0 || value === '' || value === null) {
          setError({
            ...error,
            [key]: 'Quantity should be greater than 0',
          });
          return false;
        }
      } else if (value === '' || value === null) {
        setError({
          ...error,
          [key]: 'This field is required',
        });
        return false;
      }

      return true;
    });
    if (isValid) {
      handleAddProduct({ ...state });
    }
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      style={{
        overFlow: 'hidden',
      }}
    >
      <DialogTitle>
        <Typography variant="h2">Add New Product</Typography>
      </DialogTitle>
      <DialogContent
        style={{
          overflow: 'hidden',
        }}
      >
        <Box>
          <TextField
            id="outlined-basic"
            label="Product Description"
            variant="outlined"
            name="description"
            fullWidth
            minRows={4}
            rows={4}
            multiline
            margin="dense"
            value={state.description}
            onChange={handleChange}
            error={error.description}
            helperText={error.description}
          />
        </Box>
        <Box display="flex" alignItems="center" my={4} width="100%">
          <Box width="100%">
            <Autocomplete
              id="combo-box-demo"
              freeSolo
              options={weightScale}
              value={state.packagingType}
              getOptionLabel={option => option.unit || ''}
              style={{ width: '100%' }}
              onChange={(e, val) => {
                handleChange({
                  target: {
                    name: 'packagingType',
                    value: val,
                  },
                });
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Packaging Type"
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={error.packagingType}
                  helperText={error.packagingType}
                />
              )}
            />
          </Box>

          <Box ml={2} width="100%">
            <TextField
              id="outlined-basic"
              label="Product Quantity"
              variant="outlined"
              fullWidth
              type="number"
              name="quantity"
              value={state.quantity}
              onChange={handleChange}
              error={error.quantity}
              helperText={error.quantity}
              size="small"
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductAddModal;
