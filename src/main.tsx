import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import SplashPage from './SplashPage'
import Camera from './Camera'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <SplashPage />
      },
      {
        path: 'camera',
        element: <Camera />
      },
      {
        path: "list",
        element: <SplashPage />
      },
      {
        path: "edit",
        element: <SplashPage />
      },
      {
        path: "plant",
        element: <SplashPage />
      }
    ]
  }
]);

// As of React 18
const root = ReactDOM.createRoot((document as any).getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)