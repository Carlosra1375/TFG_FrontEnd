import Home from "../page/Home";
import Error404 from "../page/Error404";
import User from "../page/User";
import Users from "../page/Users";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      path: "/users",
      exact: true,
      page: Users,
    },
    {
      path: "/:id",
      exact: true,
      page: User,
    },
    {
      path: "/",
      exact: true,
      page: Home,
    },
    {
      path: "*",
      page: Error404,
    },
  ];