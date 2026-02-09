const baseUrl = '/api/login';

const login = async (credentials) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  };
  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Wrong username or password');
  }

  return await response.json();
}

export default { login };
