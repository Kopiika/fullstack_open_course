//import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log('Token set in service:', token);
};

const getAll = async() => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return await response.json();
};

const create = async (blogObject) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ ...blogObject, likes: 0 }),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error('Failed to create blog');
  }
  return response.json();
};

const update = async (blog) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(blog),
  };

  const response = await fetch(`${baseUrl}/${blog.id}`, options);

  if (!response.ok) {
    throw new Error('Failed to update blog');
  }
  return response.json();
};


const remove = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  };

  const response = await fetch(`${baseUrl}/${id}`, options);

  if (!response.ok) {
    throw new Error('Failed to delete blog');
  }
};

export default { getAll, create, update, remove, setToken };
