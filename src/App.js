import * as React from 'react'
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './Container/ItemListContainer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';
import RegistroProfesores from './Components/Registro/RegistroProfesores';
import RegistroAlumnos from './Components/Registro/RegistroAlumnos';
import RecuperoContraseña from './Components/RecuperoContraseña/RecuperoContraseña';
import Login from './Components/Login/Login';
import ClasesProfesor from './Components/Clases/ClasesProfesor';
import Notificaciones from './Components/Notificaciones/Notificaciones';
import Perfil from './Components/Perfil/Perfil';
import { Auth } from './Context/AuthContext'
import Comentario from './Components/Comentario/Comentario';
import Reservas from './Components/Reservas/Reservas';
import ReservasProfesor from './Components/Reservas/ReservasProfesor';

function App() {
  
  return (
    <Auth>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/clase/:_id' element={<ItemDetailContainer />} />
          <Route path='/RegistroProfesor' element={<RegistroProfesores />} />
          <Route path='/Perfil' element={<Perfil />} />
          <Route path='/RegistroAlumno' element={<RegistroAlumnos />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/RecuperarContrasena' element={<RecuperoContraseña />} />
          <Route path='/Clases' element={<ClasesProfesor />} />
          <Route path='/Comentarios' element={<Comentario />} />
          <Route path='/Reservas' element={<Reservas/>} />
          <Route path='/ReservasProfesor' element={<ReservasProfesor/>} />
          <Route path='/' element={<ItemListContainer mensaje={"Listado de Profesores"} />} />
        </Routes>
      </Router>
    </Auth>
  );
}

export default App;
