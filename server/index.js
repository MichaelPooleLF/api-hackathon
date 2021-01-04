const express = require('express');
const staticMiddleware = require("./static-middleware");
const port = "3000";

const app = express();

app.use(staticMiddleware);

app.listen(port, () => {
  console.log("Listening on Port", port)
});
