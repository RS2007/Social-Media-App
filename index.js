const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const connectToDB = async () => {
  try {
    const hasConnected = await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DB_URL 
        : process.env.DEV_DB_URL
    );
    if (hasConnected) console.log("Conneted to database");
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded());
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.resolve("frontend", "dist")));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3002",
      "http://localhost:9001",
      "https://socialmediaapp-cel.pages.dev/",
      "https://social-media-app-five-nu.vercel.app",
    ],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/", (req, res) => {
  res.sendFile(path.resolve("frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening at " + PORT);
});
