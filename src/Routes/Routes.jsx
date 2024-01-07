import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
// import NotFound from "../Pages/NotFound/NotFound";
import Home from "../Pages/Home/Home";
import TutorialDetails from "../Pages/TutorialDetails/TutorialDetails";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import PrivetRoute from "../Pages/Provider/PrivetRoute";
import AddLanguages from "../Pages/Admin/AddLanguages/AddLanguages";
import AddModule from "../Pages/Admin/AddModule/AddModule";
import QuestionsList from "../Pages/QustionsList/QuestionsList";
import QuestionDetails from "../Pages/QustionsList/QuestionDetails";
import Quiz from "../Pages/Quiz/Quiz";
import AddQuiz from "../Pages/Admin/AddQuiz/AddQuiz";

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
            {
                path: "/questions",
                element: <QuestionsList />
            },
            {
                path: "/questions-details/:qid",
                element: <QuestionDetails />
            },
            {
                path: "/quiz/:qid",
                element: <Quiz />
            },

        ]
    },
    {
        path: "/dashboard",
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
        // errorElement: <NotFound/>,
        children: [
            {
                path: "addLanguage",
                element: <AddLanguages />
            },
            {
                path: "addModule/:id",
                element: <AddModule />
            },
            {
                path: "AddQuiz/:id",
                element: <AddQuiz />
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