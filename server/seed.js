const mongoose = require('mongoose');
const config = require('config');
const { BlogPost } = require('./models/blogpost');

const data = [
  {
    title: 'Lorem ipsum dolor sit amet. 1',
    photo: 'http://localhost:3502/img/1.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 2',
    photo: 'http://localhost:3502/img/2.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 3',
    photo: 'http://localhost:3502/img/3.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 4',
    photo: 'http://localhost:3502/img/4.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 5',
    photo: 'http://localhost:3502/img/5.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 6',
    photo: 'http://localhost:3502/img/6.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 7',
    photo: 'http://localhost:3502/img/7.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 8',
    photo: 'http://localhost:3502/img/8.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 9',
    photo: 'http://localhost:3502/img/9.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 10',
    photo: 'http://localhost:3502/img/10.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 11',
    photo: 'http://localhost:3502/img/11.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  },{
    title: 'Lorem ipsum dolor sit amet. 12',
    photo: 'http://localhost:3502/img/12.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta sequi sint maiores voluptate recusandae placeat quo natus odio rem qui! Possimus vitae, perferendis, blanditiis voluptatem eum mollitia animi eos ad nihil provident fugit, quae rerum facilis vero aspernatur distinctio. Nemo modi, cumque in inventore ab accusantium dignissimos eius facilis iusto!'
  }
];

async function seed() {
  await mongoose.connect(config.get('db'));

  	await BlogPost.deleteMany({});

    const posts = data.map(post => ({
     ...post,
    }));
    await BlogPost.insertMany(posts);

  mongoose.disconnect();

  console.info('Done!');
}

seed();
