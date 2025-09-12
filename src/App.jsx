import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Rutas
import Home from './routes/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './routes/Login';
import Register from './routes/Register';
import Categoria from './routes/Categoria';
import Perfil from './routes/Perfil';
import EditProfile from './routes/EditProfile';
import Avatares from './routes/Avatares';
import ForgotPassword from './routes/ForgotPassword';
import ChangePassword from './routes/ChangePassword';


function App() {
  return (
    <Router>

      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/categoria/:categoria' element={<Categoria></Categoria>}></Route>
        <Route path='/profile' element={<Perfil></Perfil>}></Route>
        <Route path='/edit_profile' element={<EditProfile></EditProfile>}></Route>
        <Route path='/avatares' element={<Avatares></Avatares>}></Route>
        <Route path='/forgot_password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/change_password/:token' element={<ChangePassword></ChangePassword>}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
