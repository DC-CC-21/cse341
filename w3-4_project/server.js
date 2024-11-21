const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db")();

const postsRoute = require("./routes/postsRoute");
const userRoute = require("./routes/userRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger-output.json");

if (process.env.NODE_ENV !== "development") { 
  swaggerDoc.host = swaggerDoc.servers[1].url.replace("https://", "");
}

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postsRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send(err.message || "Something went wrong.");
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
