import { createBrowserRouter } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import loaders from './user/loaders';
import actions from './user/actions'
import Root from './core/Root';
import ErrorPage from './core/ErrorPage';
import SignUp from './user/SignUp';
import Profile from './user/Profile';
import SignIn from './user/SignIn';
import PrivateRoute from './auth/PrivateRoute';
import EditUser from './user/EditUser';

const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: "/signin",
                        element: <SignIn />,
                        action: actions.signInAction,
                    },
                    {
                        path: "/signup",
                        element: <SignUp />,
                        action: actions.signUpAction,
                    },
                    {
                        path: "/users",
                        element: <Users />,
                        loader: loaders.usersLoader
                    },
                    {
                        path: "/users/:userId",
                        element: <PrivateRoute ><Profile /></PrivateRoute>,
                        loader: loaders.profileLoader
                    },
                    {
                        path: "/users/:userId/edit",
                        element: <PrivateRoute ><EditUser /></PrivateRoute>,
                        loader: loaders.profileLoader,
                        action: actions.editAction
                    },
                    {
                        path: "/users/:userId/delete",
                        action: actions.deleteAction
                    },
                    {
                        path: "/users/:userId/follow",
                        action: actions.followAction
                    },
                    {
                        path: "/signout",
                        loader: loaders.signOutLoader
                    }
                ]
            }
        ]
    }
])

export default MainRouter