import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

// páginas
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Shop from './pages/Shop.tsx'
import Cart from './pages/Cart.tsx'
import CheckOut from './components/CheckOut.tsx'
import Detail from './pages/Detail.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import ProtectedRoute from './routes/ProtectedRoute';
import ThankYou from './pages/ThankYou.tsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/shop",
        element: <Shop />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckOut/>
          </ProtectedRoute>
        )
      },
      {
        path: "/product/:id",
        element: <Detail />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/thankyou",
        element: (
          <ProtectedRoute>
            <ThankYou />
          </ProtectedRoute>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
