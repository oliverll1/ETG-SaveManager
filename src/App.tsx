import { Typography } from '@material-tailwind/react';
import './App.css'
import { SaveState } from './components/Context/SaveProvider';
import { Sidebar } from './components/Sidebar';
import { SingleSaveScreen } from './components/SingleSaveScreen';

function App() {
  const { selectedBackup, setSelectedBackup } = SaveState();


  if (selectedBackup.name) {  
    return (
      <div className='flex bg-custom-gray'>
        <Sidebar />
        <SingleSaveScreen />
      </div>
    )
  }

  return (
    <div className='flex bg-custom-gray'>
      <Sidebar />
      <div className='w-full h-screen flex  justify-center items-center'>
        <div>
          <Typography variant="h2">Select a save to continue</Typography>
        </div>
      </div>
    </div>
  )
}

export default App
