import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home/Home';
import Footer from './components/shared/Footer/Footer';
import Navbar from './components/shared/Navbar/Navbar';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Login/Register';
import ForgetPassword from './components/pages/Login/ForgetPassword';

function App() {
  return (
    <div className=" max-w-7xl mx-auto">
      <Navbar />

      <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/forget-password' element={<ForgetPassword />}></Route>
            <Route path='/register' element={<Register />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
