import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middleware/error.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./docs/swagger.js";
import messageroutes from "./routes/messageRoutes.js"
import userroutes from "./routes/userRoutes.js";
import timeLineroutes from "./routes/timelineRoutes.js";
import softwareroutes from "./routes/softwareRoutes.js"
import skillroutes from "./routes/skillRoute.js"
import projectrouter from "./routes/projectRoutes.js"


dotenv.config();
// dotenv.config({ path: "./config/config.env" });

const app = express();



const allowedOrigins = [
  "http://localhost:5173" 
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true  // Allow cookies and other credentials to be sent
};

app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("view", "./views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message",messageroutes)
app.use("/api/v1/user", userroutes);
app.use("/api/v1/timeline", timeLineroutes);
app.use("/api/v1/Software",softwareroutes)
app.use("/api/v1/skill/",skillroutes)
app.use("/api/v1/Project/",projectrouter)
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorMiddleware);

export default app;
