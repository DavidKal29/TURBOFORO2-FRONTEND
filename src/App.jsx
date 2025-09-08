import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


//Rutas
import Home from './routes/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
