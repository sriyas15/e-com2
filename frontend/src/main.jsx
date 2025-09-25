
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route index element={<HomePage/>}/>

    </Route>
  ))

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>
  
)
