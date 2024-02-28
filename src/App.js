import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import Notfound from './Components/NotFound/Notfound';
import Brand from './Components/Brand/Brand';
import Category from './Components/Category/Category';
import AuthProvider from './Context/Auth/auth';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Profile from './Components/Profile/Profile';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import CartProvider from './Context/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import Allorders from './Components/AllOrders/Allorders';
import WishList from './Components/WishList/WishList';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Codeverification from './Components/Codeverification/Codeverification';
import ResetPassword from './Components/ResetPassword/ResetPassword';

let queryClient =new QueryClient

const router = createHashRouter([{
  path: '/', element: <Layout />, children: [
    {
      path: '/', element: <ProtectedRoute><Home /></ProtectedRoute>
    },
    { path: 'register', element: <Register /> },
    { path: 'contact', element: <Contact /> },
    { path: 'forgotpassword', element: <ForgotPassword /> },
    { path: 'codeverification', element: <Codeverification /> },
    { path: 'resetpassword', element: <ResetPassword /> },
    { path: 'login', element: <Login /> },
    { path: 'brand', element: <ProtectedRoute><Brand /></ProtectedRoute>  },
    { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute>  },
    { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute>  },
    { path: 'details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>  },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute>  },
    { path: 'category', element: <ProtectedRoute><Category /></ProtectedRoute> },
    { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
    { path: '*', element: <Notfound /> },


  ]


}])

/* }, */


function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
      <Toaster/>
    <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      </CartProvider>

    </QueryClientProvider>
    </>
  );
}

export default App;
