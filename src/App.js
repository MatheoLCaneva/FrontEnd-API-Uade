import logo from './logo.svg';
import * as React from 'react'
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Item from './Components/Item/Item';
import ItemListContainer from './Container/ItemListContainer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import RegistroProfesores from './Components/Registro/RegistroProfesores';
import RegistroAlumnos from './Components/Registro/RegistroAlumnos';
import RecuperoContraseña from './Components/RecuperoContraseña/RecuperoContraseña';
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/clase/:id' element={<ItemDetailContainer />}/>
        <Route path='/RegistroProfesor' element={<RegistroProfesores />}/>
        <Route path='/RegistroAlumno' element={<RegistroAlumnos />}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/RecuperarContrasena' element={<RecuperoContraseña/>}/>
        <Route path='/' element={<ItemListContainer mensaje={"Listado de Profesores"} />} />
      </Routes>
    </Router>
  );
}

export default App;
