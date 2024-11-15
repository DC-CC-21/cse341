const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "API for getting contact information"
    },
    host: "cse341-b316.onrender.com",
    schemes: ["https"]
}

const outputFile = "./swagger-output.json";
const routes = ["./server.js"]

swaggerAutogen(outputFile, routes, doc)