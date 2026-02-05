const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};
export const showNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, type } });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, seconds * 1000);
  };
};

export default notificationReducer;
