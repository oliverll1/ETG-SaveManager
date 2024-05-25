import { Card, Checkbox, Typography } from '@material-tailwind/react';
import { SaveState } from '../Context/SaveProvider';
import { setAlwaysOnTop } from '../../IPC/IPCMessages';
export default function Settings() {

  const { windowOnTop, setWindowOnTop } = SaveState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        setWindowOnTop(!windowOnTop);
        setAlwaysOnTop(event.target.checked);
    }
  return (
    <div className="flex flex-col w-full justify-start gap-10">
     <Typography className="text-gray-100 text-left w-full p-8" variant="h1">Settings</Typography>
     <Card className="h-auto w-[90%] mx-auto flex gap-8 px-8 bg-gray-700 shadow-md shadow-custom-gray-darker">
       <Checkbox
        checked={windowOnTop}
        className="text-gray-100" 
        labelProps={{ className: 'text-gray-100 text-left text-lg font-semibold' }} 
        label="Always on top"
        onChange={handleChange}
        crossOrigin={null} />
     </Card>
    </div>
  )
}
