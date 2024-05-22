import { Button, Typography } from '@material-tailwind/react';
import { saveBackup, loadBackup, deleteBackup } from '../../IPC/IPCMessages';
import { SaveState } from '../Context/SaveProvider';

export function SingleSaveScreen() {

  const { selectedBackup, setSelectedBackup, setBackupList } = SaveState();
  const handleSaveClick = () => {
    saveBackup(selectedBackup.name);
  };

  const handleLoadClick = () => {
    loadBackup(selectedBackup.name);
  };

  const handleDelete = async (name:string) => {
    await deleteBackup(name);
    setSelectedBackup({ name: '', date: '', path: '', isBackup: false });
    setBackupList((prevList) => prevList.filter((backup) => backup.name !== name));
  }

  return (
    <div className="flex flex-col w-full justify-center gap-10">

       <Typography variant="h1">{selectedBackup.name}</Typography>
   
       <div className="flex gap-4 justify-center mt-2 h-full max-h-20 w-full">
            <Button 
              className="bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none text-sm w-40" 
              onClick={handleSaveClick}
            >
                Save
            </Button>
            <Button 
              className="bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none text-sm w-40" 
              onClick={handleLoadClick}
            >
                Load
            </Button>
       </div>

       <Button 
       onClick={() => handleDelete(selectedBackup.name)}
       className='bg-red-900 hover:border-pink-900 hover:bg-pink-900 outline-none focus:outline-none max-w-60 w-full mx-auto mt-4'>
        Delete Save
       </Button>
    </div>
  );
}
