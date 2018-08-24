import http from './httpService';

const uploadEndpoint = '/upload';

const uploadImage = image => {
  const fd = new FormData();
  fd.append('image', image, image.name);
  return http.post(uploadEndpoint, fd);
};

export default uploadImage;
