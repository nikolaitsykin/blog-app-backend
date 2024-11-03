import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  validateRegister,
  validateLogin,
  validatePost,
} from "./validations/validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { userController, postController } from "./controllers/index.js";
import cors from "cors";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

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

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/comments", postController.getLastComments);
app.get("/tags", postController.getLastTags);
app.get("/posts", postController.getAll);
app.get("/posts/tags", postController.getLastTags);
app.get("/posts/:id", postController.getOne);
app.post(
  "/posts",
  checkAuth,
  validatePost,
  handleValidationErrors,
  postController.createPost
);
app.post("/comments/:id", checkAuth, postController.createComment);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch(
  "/posts/:id/edit",
  checkAuth,
  validatePost,
  handleValidationErrors,
  postController.update
);

app.listen(process.env.PORT || 4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server Ok");
});
