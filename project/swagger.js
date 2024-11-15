const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "API for getting contact information"
    },
    host: "localhost:8000"
}

const outputFile = "./swagger-output.json";
const routes = ["./server.js"]

swaggerAutogen(outputFile, routes, doc)