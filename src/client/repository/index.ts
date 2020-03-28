import axios from 'axios';

export const fetchPost = async (id: string) => {
  return await axios.post(`/projects/${id}`, {
    password: 'Yahya123',
  });
};

export const fetchPosts = async () => {
  return await axios.post('/projects', {
    password: 'Yahya123',
  });
};
