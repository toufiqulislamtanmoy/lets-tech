import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
// import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import TutorialDetails from "../Pages/TutorialDetails/TutorialDetails";
import Dashboard from "../Layout/Dashboard";
import AddModule from "../Pages/Admin/AddLanguages/AddLanguages";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import PrivetRoute from "../Pages/Provider/PrivetRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/tutorialdetails/:id",
                element: <TutorialDetails />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            
        ]
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "addModule",
                element: <AddModule />
            },
            {
                path: "manageModule",
                element: <AddModule />
            },

        ]

    },
    {
        path: "/userdashboard",
        // element: <PrivetRoute><UserDashboard /></PrivetRoute>,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "userCart",
                element: <Home />
            }

        ]

    }
]);

export default router;