import express from "express";
import mongoose from "mongoose";
import {
  validateRegister,
  validateLogin,
  validatePost,
} from "./validations/validations.js";
import { checkAuth } from "./utils/checkAuth.js";
import * as userController from "./controllers/userController.js";
import * as postController from "./controllers/postController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.zdggzrs.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const app = express();
const port = 4000;
app.use(express.json());

app.post(
  "/auth/login",
  validateLogin,
  handleValidationErrors,
  userController.login
);
app.post(
  "/auth/register",
  validateRegister,
  handleValidationErrors,
  userController.register
);
app.get("/auth/me", checkAuth, userController.getMe);

app.get("/posts", checkAuth, postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post(
  "/posts",
  checkAuth,
  validatePost,
  handleValidationErrors,
  postController.create
);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  validatePost,
  handleValidationErrors,
  postController.update
);

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server OK");
});
