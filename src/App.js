import './App.css';
import Index from "./pages/index"
import Pokemon from "./pages/pokemon"
import About from './pages/about';
import { Route, Routes } from 'react-router';
import Topbar from './pages/topbar/topbar';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <div style={{ margin: '20px' }}>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/pokemon" element={<Pokemon/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      </div>
     
    </div>
  );
}

export default App;
