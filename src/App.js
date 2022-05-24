import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from "./components/shared/Require/RequireAuth"; 
import Home from './components/pages/Home/Home';
import Footer from './components/shared/Footer/Footer';
import Navbar from './components/shared/Navbar/Navbar';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/Register';
import ForgetPassword from './components/pages/Login/ForgetPassword';
import Products from './components/pages/AllProducts/AllProducts';
import Purchese from './components/pages/Purchese/Purchese';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Orders from './components/pages/Dashboard/Orders';
import AddReviews from './components/pages/Dashboard/AddReviews';
import Profile from './components/pages/Dashboard/Profile';


function App() {
  return (
    <div className=" max-w-7xl mx-auto">
      <Navbar />

      <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/forget-password' element={<ForgetPassword />}></Route>
            <Route path='/register' element={<Register />}></Route>

            <Route path='/purchese/:id' element={
              <RequireAuth>
                  <Purchese />
              </RequireAuth>
            }></Route>

            <Route path='dashboard' element={
              <RequireAuth>
                  <Dashboard />
              </RequireAuth>
            }>
              <Route index element={<Orders />} />
              <Route path='addReview' element={<AddReviews />} />
              <Route path='profile' element={<Profile />} />
            </Route>

      </Routes>
      <Footer />

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default App;
