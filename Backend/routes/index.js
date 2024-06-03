import express from "express";
import MessageRoutes from "./messageRoutes.js";
const router = express.Router();

const AllRoutes = [
  {
    route: "/message",
    routes: MessageRoutes,
  },
];

AllRoutes.forEach((data) => {
  router.use(data.route, data.routes);
});

export default router;
