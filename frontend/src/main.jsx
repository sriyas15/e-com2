
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter,createRoutesFromElements,RouterProvider,Route, } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import Settings from './pages/Settings.jsx';
import store from './store.js';
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route index element={<HomePage/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/profile' element={<ProfileScreen/>}/>
      <Route path='/settings' element={<Settings/>}/>

    </Route>
  ))

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
)
