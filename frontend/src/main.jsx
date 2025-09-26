
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import store from './store.js';
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route index element={<HomePage/>}/>

    </Route>
  ))

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
)
