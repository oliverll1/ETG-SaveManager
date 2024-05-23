import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { SaveList } from "./SaveList";
import { closeWindow } from '../../IPC/IPCMessages';

export function Sidebar() { 

  const handleClose = () => {
    closeWindow();
  };
 
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bg-custom-gray-darker">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="/bullet.png" alt="brand" className="h-16 w-16" />
        <Typography variant="h5" className="text-gray-100 text-left">
          Enter the Gungeon Save Manager
        </Typography>
      </div> 
      <hr className="my-2 border-blue-gray-50" />
  
      <SaveList />
  
        <hr className="my-2 border-blue-gray-50" />
     <List>
        <ListItem className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem 
        className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100"
        onClick={handleClose}
        >
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Exit
        </ListItem>
      </List>
    </Card>
  );
}