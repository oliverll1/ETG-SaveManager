import './App.css'
import { Sidebar } from './components/Sidebar';
import { SingleSaveScreen } from './components/SingleSaveScreen';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Settings from './components/Settings';

function App() {
    return (
      <div className='flex bg-custom-gray'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<SingleSaveScreen />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
        <Toaster position='top-right'/>
      </div>
    )
  }

export default App
