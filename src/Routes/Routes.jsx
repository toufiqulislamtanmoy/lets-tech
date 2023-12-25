import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
// import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import TutorialDetails from "../Pages/TutorialDetails/TutorialDetails";

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
            
        ]
    },
    {
        path: "/dashboard",
        // element: <PrivetRoute><Dashboard /></PrivetRoute>,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "requestforbook",
                element: <Home />
            }

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