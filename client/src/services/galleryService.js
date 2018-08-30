import http from './httpService';

const galleryEndPoint = '/photos';

export const getPhotos = () => http.get(galleryEndPoint);

export const getPhoto = id => http.get(`${galleryEndPoint}/${id}`);

export const addNewPhoto = photo => http.post(galleryEndPoint, photo);

export const deletePhoto = id => http.delete(`${galleryEndPoint}/${id}`);
