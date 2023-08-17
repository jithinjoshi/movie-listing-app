import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';
import { SignUp } from './components/signup';
import { SignIn } from './components/signin';
// import SharedLayout from './components/todoList/SharedLayout';
// import AddTodo from './components/todoList/AddTodo';
// import ProtectedRoute from './utils/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { addAccessTokenToken, setLoading } from './redux/appSlice';
import authApi from './api/axiosInstance';
import Movies from './components/Movies';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './components/DashBoard';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/movies',
    element: <ProtectedRoute><Movies/></ProtectedRoute>,
    errorElement: <ErrorPage />
  },
  {
    path : '/',
    element: <ProtectedRoute><DashBoard/></ProtectedRoute>,
    errorElement: <ErrorPage />
  }

])

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.app.accessToken)

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true))
      try {
        const {
          data: { accessToken },
        } = await authApi.get("auth/refresh");
        dispatch(addAccessTokenToken(accessToken));
      } catch (error) {
        // 
      } finally {
        dispatch(setLoading(false))
      }
    })();
  }, [token]);

  return <RouterProvider router={router} />
}

export default App