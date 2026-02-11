const baseUrl = '/api/users';

/*let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log('Token set in service:', token);
};*/

const getAll = async () => {
	const response = await fetch(baseUrl)
	if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
}

export default {getAll}