import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Landing } from './pages/landing';
import { Game } from './pages/game';

function App() {

  return (
    <div className='grid grid-cols-10 h-screen w-screen'>
      <div id="sidebar" className='flex flex-col col-span-1 bg-gray-800'>
        <h2 className='text-white font-bold m-3 text-xl'>MyChess.com</h2>
        <ul className='text-white font-bold'>
          <li className='p-3'><a href="#">Home</a></li>
          <li className='p-3'><a href="#">Play</a></li>
          <li className='p-3'><a href="#">Puzzles</a></li>
          <li className='p-3'><a href="#">Lessons</a></li>
          <li className='p-3'><a href="#">Community</a></li>
          <li className='p-3'><a href="#">Profile</a></li>
        </ul>
        <hr/>
        <div className='p-3'><button className="bg-slate-500 p-2 rounded-md text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 font-bold">Sign Up</button></div>
        <div className="p-3"><button className='bg-green-500 p-2 rounded-md text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 font-bold'>Log In</button></div>

        <footer className='p-3 mt-auto'>
          <div className='text-gray-300 mb-2'>english</div>
          <div className="text-gray-300 mb-2">help</div>
        </footer>
      </div>
      <div className='col-span-9'>
        <BrowserRouter>
          <Routes>
            <Route path='/landing' element={<Landing/>}/>
            <Route path="/game" element={<Game/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      
    </div>
    
  );
}

export default App
