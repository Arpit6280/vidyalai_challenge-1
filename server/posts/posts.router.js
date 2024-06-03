const express = require('express');
const { fetchPosts } = require('./posts.service');

const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await fetchPosts(req.query);

  const fetchPostsWithImagesAndUser = async () => {
    const postsWithImagesAndUser = await response.posts.reduce(
      async (accPromise, post) => {
        const acc = await accPromise;

        const [photosResponse, userResponse] = await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
          ),
          axios.get(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`,
          ),
        ]);

        const images = photosResponse.data
          .slice(0, 3)
          .map(photo => ({ url: photo.url }));
        const { name, email } = userResponse.data;
        return [
          ...acc,
          {
            ...post,
            images,
            user: {
              name,
              email,
            },
          },
        ];
      },
      Promise.resolve([]),
    );

    return postsWithImagesAndUser;
  };

  fetchPostsWithImagesAndUser()
    .then(postsWithImages => {
      return res.json({
        posts: postsWithImages,
        totalcount: response.totalcount,
      });
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
});

module.exports = router;
