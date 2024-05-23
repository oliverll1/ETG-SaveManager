import { Button, Card, Typography } from '@material-tailwind/react';
import { saveBackup, loadBackup, deleteBackup } from '../../IPC/IPCMessages';
import { SaveState } from '../Context/SaveProvider';
import { SaveStatus } from './SaveStatus';
import { Chip } from "@material-tailwind/react";

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

  console.log(selectedBackup);

  return (
    <div className="flex flex-col w-full justify-start gap-10">

   <Typography className="text-gray-100 text-left w-full p-8" variant="h1">{selectedBackup.name}</Typography>

      <Card className="h-[350px] w-[420px] mx-auto flex items-center justify-center gap-8 px-8 bg-gray-700 shadow-md shadow-custom-gray-darker">
        <div className="flex h-10 items-center justify-between w-full ">
          {!selectedBackup.date ?  <Chip className="text-gray-100 text-left text-xs" value={`Last Saved: ${selectedBackup.date}`} /> : null}
          <SaveStatus isBackup={selectedBackup.isBackup}/>
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
        className='bg-red-900 hover:border-pink-900 hover:bg-pink-900 outline-none focus:outline-none text-gray-100 text-sm max-w-60 w-full mx-auto mt-4'>
          Delete Save
        </Button>
      </Card> 
    </div>
  );
}
