//index.js
const express = require("express");
const bodyParser = require("body-parser");

const users = require("./routes/users");
const usersRoute = require("./routes/users"); 
const posts = require("./routes/posts");
const commentsRoute = require("./routes/comments")
const comments = require("./data/comments");

const postsRoute = require("./routes/posts");

const error = require("./utilities/error");

const app = express();
const port = 3000;
// Set Pug as the template engine
app.set('view engine', 'pug');

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Valid API Keys.
apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];

app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

  // Check for the absence of a key.
  if (!key) next(error(400, "API Key Required"));

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
});

// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", commentsRoute);
app.use("/api/users", usersRoute); 
app.use("/api/posts", postsRoute);


// New route for GET /comments
app.get("/api/comments", (req, res) => {
    res.json({ comments });
  });

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
      {
        href: "api/comments",
        rel: "comments",
        type: "GET",
      },
      {
        href: "api/comments",
        rel: "comments",
        type: "POST",
      },
    ],
  });
});
// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});



app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});