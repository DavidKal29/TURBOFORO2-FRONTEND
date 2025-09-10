import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Rutas
import Home from './routes/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './routes/Login';
import Register from './routes/Register';


function App() {
  return (
    <Router>

      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
