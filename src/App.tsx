import './App.css'
import { Sidebar } from './components/Sidebar';
import { SingleSaveScreen } from './components/SingleSaveScreen';

function App() {
  return (
    <div className='flex bg-custom-gray'>
      <Sidebar />
      <SingleSaveScreen />
    </div>
  )
}

export default App
