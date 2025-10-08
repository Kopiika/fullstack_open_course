/* Notification component for displaying error messages */
const Notification = ({ notification }) => {
  if (!notification.message) return null

  const className = notification.type === 'error' ? 'error' : 'success'

  return (
	 <div className={className}>
		{notification.message}
	 </div>
  )
}

export default Notification