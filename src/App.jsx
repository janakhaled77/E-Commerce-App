import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ProtectedRoute.jsx';
import Layout from './Layout.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import Cart from './Cart.jsx';
import Register from './Register.jsx';
import Categories from './Categories.jsx';
import Brands from './Brands.jsx';
import Products from './Products.jsx';
import ProductDetails from './ProductDetails.jsx';
import ResetPasswordPage from './ResetPasswordPage.jsx';
import VerificationPage from './Verification.jsx';
import Checkout from './Checkout.jsx';  
import wishlistContextProvider from './WishlistContext.jsx';
import WishlistContextProvider from './WishlistContext.jsx';
import WishList from './Wishlist.jsx';
import CounterContextProvider from './CounterContext.jsx';
import UserContextProvider from './UserContext.jsx';
import CartContextProvider from './CartContext.jsx'; 

const routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verifyCode", element: <VerificationPage /> },
      { path: "reset-Password", element: <ResetPasswordPage /> },
      { path: "category", element: <ProtectedRoute><Categories/></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart/></ProtectedRoute> },
      { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products/></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands/></ProtectedRoute> },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishList/>
          </ProtectedRoute>
        ),
      },
      { path: "/checkout/:cartId", element: <ProtectedRoute><Checkout/></ProtectedRoute> },
      { path: "*", element:<h2 className='h-lvh p-32 text-center text-2xl font-semibold'>404 | This page could not be found.</h2> },
    ],
  },
]);

const myClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={myClient}>
      <Toaster />
      <UserContextProvider>
        <WishlistContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routing} />
            </CounterContextProvider>
          </CartContextProvider>
          </WishlistContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
