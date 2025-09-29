import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Toaster, toast } from "sonner"; //Para notificaciones tipo toast


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
import CrearHilo from './routes/CrearHilo';
import Page404 from './routes/Page404';
import MostrarHilo from './routes/MostrarHilo';
import MisHilos from './routes/MisHilos';
import Usuario from './routes/Usuario';
import Usuarios from './routes/Usuarios';


function App() {
  return (
    <Router>

      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/categoria/:categoria/page/:page' element={<Categoria></Categoria>}></Route>
        <Route path='/profile' element={<Perfil></Perfil>}></Route>
        <Route path='/edit_profile' element={<EditProfile></EditProfile>}></Route>
        <Route path='/avatares' element={<Avatares></Avatares>}></Route>
        <Route path='/forgot_password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/change_password/:token' element={<ChangePassword></ChangePassword>}></Route>
        <Route path='/crear_hilo' element={<CrearHilo></CrearHilo>}></Route>
        <Route path='/display_thread/:id_hilo/page/:page' element={<MostrarHilo></MostrarHilo>}></Route>
        <Route path='/my_threads/page/:page' element={<MisHilos></MisHilos>}></Route>
        <Route path='/usuario/:id_usuario' element={<Usuario></Usuario>}></Route>
        <Route path='/usuarios' element={<Usuarios></Usuarios>}></Route>
        <Route path='*' element={<Page404></Page404>}></Route>
      </Routes>

      <Footer></Footer>

      <Toaster position="top-right" richColors duration={2000} /> {/* Notificaciones globales */}
    </Router>
  );
}

export default App;
