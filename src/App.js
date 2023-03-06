import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokemons from './components/Pokemons';
import { Container } from '@mui/system';

function App() {
  return (
    <div className='App'>
      <Container >
      <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Pokemons />} />
        </Routes>
      </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
