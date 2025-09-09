import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Rutas
import Home from './routes/Home';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <Router>

      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>

      <Footer></Footer>
    </Router>
  );
}

export default App;
