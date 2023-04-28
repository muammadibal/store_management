import express, { Express, Request, Response } from "express";
import session from "express-session";
import dotenv from "dotenv";

const AuthRoutes = require("./src/routes/auth");
const UserRoutes = require("./src/routes/user");
const ProductRoutes = require("./src/routes/user");
import db from "./src/configs/database";
import product from "./src/models/product";
import user from "./src/models/user";
import SequelizeStore from "connect-session-sequelize";
const cors = require("cors");

dotenv.config();
// (async () => {
//   await product.sync();
//   await user.sync();
// })();

const port = process.env.APP_PORT;
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db
});

app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      secure: "auto"
    }
  })
);
app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(ProductRoutes);

// store.sync();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
