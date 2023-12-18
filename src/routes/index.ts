import { Router } from "express";
import authRoute from "./auth.routes";

const router = Router();

const routes = [
  {
    path: "/auth",
    router: authRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;

// here we are using the router.use() method to use the routes defined in the auth.routes.ts file.
// export default router; is used to export the router object so that it can be used in the src/index.ts file.
// router consists of all the routes defined in the routes folder.
