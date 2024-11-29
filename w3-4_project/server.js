const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db")();

const postsRoute = require("./routes/postsRoute");
const itemRoute = require("./routes/itemRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger-output.json");

if (process.env.NODE_ENV !== "development") { 
  swaggerDoc.host = swaggerDoc.servers[1].url.replace("https://", ""); // switch to production server
  swaggerDoc.schemes.splice(0, 1) // remove http
}

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postsRoute);
app.use("/item", itemRoute);

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
