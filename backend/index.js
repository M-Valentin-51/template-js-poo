const express = require("express");

const userRoutes = require("./routers/user.routes");
const app = express();
const port = 5000;

app.use(express.json());

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
