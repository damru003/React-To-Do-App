import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Index } from './components/Index';
import { Edit } from './components/edit/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='edit/:id' element={<Edit/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
