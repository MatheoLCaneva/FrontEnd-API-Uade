import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Item from './Components/Item/Item';
import ItemListContainer from './Container/ItemListContainer';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ItemDetailContainer from './Components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/clase/:id' element={<ItemDetailContainer />}/>
        <Route path='/' element={<ItemListContainer mensaje={"Listado de Profesores"} />} />
      </Routes>
    </Router>
  );
}

export default App;
