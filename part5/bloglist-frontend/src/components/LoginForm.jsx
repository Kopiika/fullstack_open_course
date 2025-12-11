import styles from './LoginForm.module.css'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <form
    className={styles.form}
    onSubmit={handleLogin}>
    <label className={styles.label}>
      <input
			  className={styles.input}
			  placeholder='Username'
			  type="text"
			  value={username}
			  onChange={({ target }) => setUsername(target.value)}>
      </input>
    </label>
    <label className={styles.label}>
      <input
			  className={styles.input}
			  placeholder='Password'
			  type="password"
			  value={password}
			  onChange={({ target }) => setPassword(target.value)}>
      </input>
    </label>


	  <button className={styles.button} type="submit" variant="contained">Login</button>
  </form>
)

export default LoginForm