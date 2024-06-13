import express from "express";
import MessageRoutes from "./messageRoutes.js";
import UserRouter from "./userRoutes.js";
const router = express.Router();

const AllRoutes = [
  {
    route: "/message",
    routes: MessageRoutes,
  },
  {
    route: "/user",
    routes: UserRouter,
  },
];

AllRoutes.forEach((data) => {
  router.use(data.route, data.routes);
});

export default router;
