import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./Layout";
import HomePage from "../page/HomePage";
import ProjectPage from "../page/ProjectPage";

const rootRoute = createRootRoute({ component: () => <Layout /> });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

export const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/project/$projectId",
  component: () => <ProjectPage />,
});

const routeTree = rootRoute.addChildren([homeRoute, projectRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;

// export const projectRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/project/$projectId",
//   component: () => <ProjectPage />,
// });
