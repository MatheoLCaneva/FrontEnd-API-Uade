import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Item from './Components/Item/Item';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Item nombre={'Jorge'} apellido={'Lopez'} precio={'600/h'} logo={logo}/>
    </div>
  );
}

export default App;
