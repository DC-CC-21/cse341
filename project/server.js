require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const contactsRoute = require("./routes/contacts");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/contacts", contactsRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
