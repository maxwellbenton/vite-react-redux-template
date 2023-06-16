import {
  Outlet
} from "react-router-dom";
import Navigation from './Navigation'
import './App.css'

function App() {
  return (
    <div
      className="App"
      style={{
        height: `${window.innerHeight}px`
      }}
    >
      <Outlet />
      <Navigation />
    </div>
  )
}

export default App
