import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import ProductList from './components/ProductList.tsx'
import ProductDetails from './components/ProductDetails.tsx'
import CartList from './components/CartList.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout name={''}/>,
    children: [
         {
        path: "/products",
        element: <ProductList/>
      },
      {
        path: "/cart",
        element: <CartList/>
      },
      {
        path: "/products/:productId",
        element: <ProductDetails/>
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)