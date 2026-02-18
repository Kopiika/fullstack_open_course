import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }
  // Destructure message and type from the notification object
  const { message, type } = notification;

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={type} // 'success' | 'error' | 'info' | 'warning'
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
