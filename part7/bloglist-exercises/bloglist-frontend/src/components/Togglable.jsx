import { useState, forwardRef, useImperativeHandle } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box
      sx={{
        marginBottom: '32px',
      }}
    >
      <div style={hideWhenVisible}>
        <Button variant="contained" color="success" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Button
          variant="text"
          color="error"
          onClick={toggleVisibility}
          startIcon={<CancelIcon />}
        >
          cancel
        </Button>
        {props.children}
      </div>
    </Box>
  );
});

export default Togglable;
