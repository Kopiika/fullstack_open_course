import { useSelector } from 'react-redux';
import styles from './Notification.module.css';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }
  // Destructure message and type from the notification object
  const { message, type } = notification;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>{message}</div>
  );
};

export default Notification;
