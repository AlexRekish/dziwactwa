import http from './httpService';

const blogEndpoint = '/blog/posts';

export const getPosts = () => http.get(blogEndpoint);

export const getPost = id => http.get(`${blogEndpoint}/${id}`);

export const addNewPost = post => http.post(blogEndpoint, post);

export const editPost = (id, post) => http.put(`${blogEndpoint}/${id}`, post);

export const deletePost = id => http.delete(`${blogEndpoint}/${id}`);
