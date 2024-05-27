import { Button, Card, Typography } from '@material-tailwind/react';
import { saveBackup, loadBackup, deleteBackup } from '../../IPC/IPCMessages';
import { ISaveState, SaveState } from '../Context/SaveProvider';
import { SaveStatus } from './SaveStatus';
import { Chip } from "@material-tailwind/react";
import toast from 'react-hot-toast';

export function SingleSaveScreen() {

  const { selectedBackup, setSelectedBackup, setBackupList } = SaveState() as ISaveState;
  const handleSaveClick = async () => {
    try {
      const backup = await saveBackup(selectedBackup.name);
      setSelectedBackup(backup);
      toast.success('Saved');
      
    } catch (error) {
        console.error('Error saving backup:', error); 
        toast.error('Error saving backup');
    }
  };

  const handleLoadClick = () => {
    loadBackup(selectedBackup.name);
    toast.success('Loaded');
  };

  const handleDelete = async (name:string) => {
    deleteBackup(name);
    setSelectedBackup({ name: '', date: '', path: '', isBackup: false });
    setBackupList((prevList) => prevList.filter((backup) => backup.name !== name));
  }

  if (!selectedBackup.name) {  
     return(
      <div className='w-full h-screen flex  justify-center items-center'>
        <div>
          <Typography variant="h2">Select a save to continue</Typography>
        </div>
      </div>
     )
  }
    
  return (
    <div className="flex flex-col w-full justify-start gap-10">

   <Typography className="text-gray-100 text-left w-full p-8" variant="h1">{selectedBackup.name}</Typography>

      <Card className="h-[350px] w-[420px] mx-auto flex items-center justify-center gap-8 px-8 bg-gray-700 shadow-md shadow-custom-gray-darker">
        <div className={selectedBackup.isBackup ? "flex justify-between w-full" : "flex justify-end w-full"}>
          {selectedBackup.date ?  <Chip className="text-gray-100 text-left text-xs w-fit" value={`${selectedBackup.date}`} /> : null}
          <SaveStatus className='w-fit' isBackup={selectedBackup.isBackup}/>
        </div>

        <div className="flex justify-between mt-2 h-full max-h-20 w-full">
              <Button 
                className="bg-custom-purple-2 hover:bg-custom-purple-darker hover:border-custom-purple-darker text-gray-100 outline-none focus:outline-none text-lg w-40" 
                onClick={handleSaveClick}
              >
                  Save
              </Button>
              <Button 
                className="bg-custom-purple-2 hover:bg-custom-purple-darker hover:border-custom-purple-darker text-gray-100 outline-none focus:outline-none text-lg w-40" 
                onClick={handleLoadClick}
              >
                  Load
              </Button>
              
        </div>

        <Button 
        onClick={() => handleDelete(selectedBackup.name)}
        className='bg-red-900 hover:border-custom-red-darker hover:bg-custom-red-darker outline-none focus:outline-none text-gray-100 text-sm max-w-60 w-full mx-auto mt-4'>
          Delete Save
        </Button>
      </Card> 
    </div>
  );
}
