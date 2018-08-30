const mongoose = require('mongoose');
const config = require('config');
const { BlogPost } = require('./models/blogpost');
const { Photo } = require('./models/photo');

const data = [
  {
    title: 'Lorem ipsum dolor sit amet. 1',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 2',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 3',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 4',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 5',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 6',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 7',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 8',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 9',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 10',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 11',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 12',
    photo: 'http://localhost:3502/img/1.jpg',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  }
];

const photos = [
  {
    path: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    title: 'lorem 1'
  },
  {
    path: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    title: 'lorem 2'
  },
  {
    path: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    title: 'lorem 3'
  },
  {
    path: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    title: 'lorem 4'
  },
  {
    path: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    title: 'lorem 5'
  },
  {
    path: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    title: 'lorem 6'
  },
  {
    path: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    title: 'lorem 7'
  },
  {
    path: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    title: 'lorem 8'
  },
  {
    path: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    title: 'lorem 9'
  },
  {
    path: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    title: 'lorem 10'
  }
];

async function seed() {
  await mongoose.connect(config.get('db'));

  await BlogPost.deleteMany({});
  await Photo.deleteMany({});

  const posts = data.map(post => ({
    ...post
  }));
  await BlogPost.insertMany(posts);

  const images = photos.map(photo => ({ ...photo }));
  await Photo.insertMany(images);

  mongoose.disconnect();

  console.info('Done!');
}

seed();
