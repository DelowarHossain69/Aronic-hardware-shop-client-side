import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home/Home';
import Navbar from './components/shared/Navbar/Navbar';

function App() {
  return (
    <div className=" max-w-7xl mx-auto">
      <Navbar />

      <Routes>
            <Route path='/' element={<Home />}></Route>
      </Routes>

    </div>
  );
}

export default App;
