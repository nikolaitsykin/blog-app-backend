import express from "express";
import mongoose from "mongoose";


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



app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server OK");
});
