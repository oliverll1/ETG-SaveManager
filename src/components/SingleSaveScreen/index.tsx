import { Button, Typography } from '@material-tailwind/react';
import { saveBackup, loadBackup } from '../../IPC/IPCMessages';

export function SingleSaveScreen() {
  const handleSaveClick = () => {
    saveBackup('savename');
  };

  const handleLoadClick = () => {
    loadBackup('loadname');
  };

  return (
    <div className="flex flex-col w-full justify-center gap-10">

       <Typography variant="h1">Save Name</Typography>
   
       <div className="flex gap-4 justify-center mt-2 h-full max-h-20 w-full">
            <Button className="bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none text-sm w-40" onClick={handleSaveClick}>
                Save
            </Button>
            <Button className="bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none text-sm w-40" onClick={handleLoadClick}>
                Load
            </Button>
       </div>

       <Button className='bg-red-900 hover:border-pink-900 hover:bg-pink-900 outline-none focus:outline-none max-w-60 w-full mx-auto mt-4'>Delete Save</Button>
    </div>
  );
}
