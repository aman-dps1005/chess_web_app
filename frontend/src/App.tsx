import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Landing } from './pages/landing';
import { Game } from './pages/game';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<Landing/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
