import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import SplashPage from './SplashPage'
import Camera from './Camera'
import Plants from './Plants'
import Plant from './Plant'
import PlantEdit from './PlantEdit'

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
        path: "plants",
        element: <Plants />
      },
      {
        path: "plants/:plantId",
        element: <Plant />
      },
      {
        path: "plants/:plantId/edit",
        element: <PlantEdit />
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