
const posts = require("../data/posts");

const users = [
    {
      id: 1,
      name: "Carey",
      username: "cyare23",
      email: "cy23@example.com",
      posts: posts.filter((post) => post.userId === 1),
    },
    {
      id: 2,
      name: "Mikoto",
      username: "Miiko",
      email: "mikoto_u@example.com",
      posts: posts.filter((post) => post.userId === 1),
    },
    {
      id: 3,
      name: "Ronald",
      username: "RonRonRon",
      email: "mronald@example.com",
      posts: posts.filter((post) => post.userId === 1),
    },
  ];
  
  module.exports = users;
  