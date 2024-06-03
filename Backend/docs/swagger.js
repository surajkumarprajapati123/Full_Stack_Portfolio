// const dotenv = require("dotenv");
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Express API with Swagger",
      version: "0.1.0",
      description:
        "This is Mern Stack PortFolio  Aystem API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE",
      },
      contact: {
        name: "skills with suraj",
        email: "surajkumarprajapati632@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["docs/*.yml", "routes/*.js"],
};

console.log(process.env.PORT);
// module.exports = options;
