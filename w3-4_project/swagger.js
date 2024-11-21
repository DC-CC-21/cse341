const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "CSE 341 Project API",
        description: "API endpoint for CSE 341 week 3-4 project"
    },
    host: "localhost:8000",
    servers: [
        {
            url: "http://localhost:8000",
            description: "Development server"
        },
        {
            url: "https://cse341-1-7h2g.onrender.com",
            description: "Production server"
        }
    ],
    schemes: ["http", "https"],
    tags: [
        {
            name: "Posts",
            description: "Endpoints for posts"
        },
        {
            name: "Users",
            description: "Endpoints for users"
        }
    ],
    definitions: {
        Post: {
            $title: "string",
            $content: "string",
            $author: "string",
            $date: "string",
            $attachments: ["b64String"],
            $lastUpdated: "string"
        },
        User: {
            $firstName: "string",
            $lastName: "string",
            $email: "string",
            $password: "string",
            $birthday: "string"
        }
    }
}

const outputFile = "./swagger-output.json";
const routes = ["./server.js"]

swaggerAutogen(outputFile, routes, doc)