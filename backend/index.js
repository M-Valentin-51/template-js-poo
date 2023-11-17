const express = require("express");

const userRoutes = require("./routers/user.routes");
const router = require("./routers/routes");
const app = express();
const port = 5000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
