import './App.css';
import Header from './pages/Header';
import { Outlet } from "react-router-dom";
import { ToastContainer} from "react-toastify";

function App() {

  return (
    <>
      <Header/>
      <ToastContainer/>
      <Outlet/>
    </>
  )
}

export default App
