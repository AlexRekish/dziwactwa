import http from './httpService';

const uploadEndpoint = '/upload';

const uploadImage = image => {
  const fd = new FormData();
  fd.append('1.jpg', image, image.name);
  return http.post(uploadEndpoint, fd);
};

export default uploadImage;
