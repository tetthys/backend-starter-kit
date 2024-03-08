import express from "express";
import env from "./helper/env/env";

const app = express();

app.get("/", (req, res) => {
  return res.json({
    message: "Hello World!",
  });
});

app.listen(env("PORT"), () => {
  console.log("Server is running");
});
