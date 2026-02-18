import { TextField, Button, Typography } from '@mui/material';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '300px',
          margin: '0 auto',
        }}
      >
        <Typography variant="h5" component="h2" align="center" marginTop="48px">
          Log in to application
        </Typography>

        <TextField
          label="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          fullWidth
          required
        />

        <TextField
          id="outlined-password-input"
          autoComplete="current-password"
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          fullWidth
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
