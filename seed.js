const mongoose = require('mongoose');
const config = require('config');
const { BlogPost } = require('./models/blogpost');
const { Photo } = require('./models/photo');

const data = [
  {
    title: 'Lorem ipsum dolor sit amet. 1',
    photo: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 2',
    photo: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 3',
    photo: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 4',
    photo: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 5',
    photo: 'https://source.unsplash.com/KCQz_b2Hgi8/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 6',
    photo: 'https://source.unsplash.com/MBkQKiH14ng/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 7',
    photo: 'https://source.unsplash.com/GVnUVP8cs1o/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 8',
    photo: 'https://source.unsplash.com/R261qkc-nDE/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 9',
    photo: 'https://source.unsplash.com/8peGuud5cEw/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 10',
    photo: 'https://source.unsplash.com/hFzIoD0F_i8/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 11',
    photo: 'https://source.unsplash.com/IicyiaPYGGI/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 12',
    photo: 'https://source.unsplash.com/A_RXuJWAvmk/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 13',
    photo: 'https://source.unsplash.com/TtybI0ORH7w/600x799',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 14',
    photo: 'https://source.unsplash.com/lJB94bk-ePI/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 15',
    photo: 'https://source.unsplash.com/Rfflri94rs8/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 16',
    photo: 'https://source.unsplash.com/aBVidOolyu8/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 17',
    photo: 'https://source.unsplash.com/L0RqBLzQq2c/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 18',
    photo: 'https://source.unsplash.com/8fMwyZPxqtg/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 19',
    photo: 'https://source.unsplash.com/hpXX7cJXleE/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 20',
    photo: 'https://source.unsplash.com/GlHKd5I4SkY/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 21',
    photo: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },
  {
    title: 'Lorem ipsum dolor sit amet. 22',
    photo: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
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
    path: 'https://source.unsplash.com/KCQz_b2Hgi8/600x799',
    title: 'lorem 5'
  },
  {
    path: 'https://source.unsplash.com/MBkQKiH14ng/600x799',
    title: 'lorem 6'
  },
  {
    path: 'https://source.unsplash.com/GVnUVP8cs1o/800x599',
    title: 'lorem 7'
  },
  {
    path: 'https://source.unsplash.com/R261qkc-nDE/800x599',
    title: 'lorem 8'
  },
  {
    path: 'https://source.unsplash.com/8peGuud5cEw/800x599',
    title: 'lorem 9'
  },
  {
    path: 'https://source.unsplash.com/hFzIoD0F_i8/800x599',
    title: 'lorem 10'
  },
  {
    path: 'https://source.unsplash.com/IicyiaPYGGI/800x599',
    title: 'lorem 11'
  },
  {
    path: 'https://source.unsplash.com/A_RXuJWAvmk/600x799',
    title: 'lorem 12'
  },
  {
    path: 'https://source.unsplash.com/TtybI0ORH7w/600x799',
    title: 'lorem 13'
  },
  {
    path: 'https://source.unsplash.com/lJB94bk-ePI/800x599',
    title: 'lorem 14'
  },
  {
    path: 'https://source.unsplash.com/Rfflri94rs8/800x599',
    title: 'lorem 15'
  },
  {
    path: 'https://source.unsplash.com/aBVidOolyu8/800x599',
    title: 'lorem 16'
  },
  {
    path: 'https://source.unsplash.com/L0RqBLzQq2c/800x599',
    title: 'lorem 17'
  },
  {
    path: 'https://source.unsplash.com/8fMwyZPxqtg/800x599',
    title: 'lorem 18'
  },
  {
    path: 'https://source.unsplash.com/hpXX7cJXleE/800x599',
    title: 'lorem 19'
  },
  {
    path: 'https://source.unsplash.com/GlHKd5I4SkY/800x599',
    title: 'lorem 20'
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
