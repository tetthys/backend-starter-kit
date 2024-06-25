import express from "express";
import env from "./Helpers/env/env.js";

const app = express();
const port = env("PORT");

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
