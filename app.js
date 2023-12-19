import express from "express";
import books from "./books.json" assert { type: "json" };
import session from "express-session";
import bodyParser from "body-parser";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const app = express();

const redisClient = createClient();
redisClient.connect();

const redisStore = new RedisStore({ client: redisClient, prefix: "session:" });

app.listen(8000);

app.use(
  session({
    secret: "myUnsafeSecret",
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
      expires: 5 * 60 * 1000, //Går ut efter 5 minuter av inaktivitet
    },
  })
);

app.use(bodyParser.json());

app.get("/api/books", (_req, res) => {
  res.json(books);
});

app.get("/api/books/:bookId", (req, res) => {
  const book = books[req.params.bookId];
  if (book) {
    res.json(book);
  } else {
    res.status(400).send("Invalid Book ID");
  }
});

app.get("/api/recentlyviewed", (req, res) => {
  if (!req.session.recentlyViewed) {
    req.session.recentlyViewed = [];
  }
  res.json(req.session.recentlyViewed);
});

app.post("/api/recentlyviewed", (req, res) => {
  if (!req.session.recentlyViewed) {
    req.session.recentlyViewed = [];
  }
  req.session.recentlyViewed.unshift(req.body);
  if (req.session.recentlyViewed.length > 3) {
    req.session.recentlyViewed.pop();
  }
  res.send("Added to recently viewed.");
});

app.get("/api/cart", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.json(req.session.cart);
});

app.post("/api/cart", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(req.body.title);
  res.send("Added to cart.");
});

app.use(express.static("public"));
