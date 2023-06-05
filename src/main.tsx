import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element: <App />,
  },
  {
    path: "/edit",
    element: <App />,
  },
  {
    path: "/plant",
    element: <App />,
  }
]);

// As of React 18
const root = ReactDOM.createRoot((document as any).getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)