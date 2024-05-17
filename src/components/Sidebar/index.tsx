import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  ListItemSuffix,
  Button,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  FolderIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
 
export function Sidebar() { 
 
  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bg-custom-gray-darker">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="/public/bullet.png" alt="brand" className="h-16 w-16" />
        <Typography variant="h5" className="text-gray-100">
          Enter the Gungeon Save Manager
        </Typography>
      </div> 
      <hr className="my-2 border-blue-gray-50" />
      <div className="p-2 ">
        <Typography variant="h6" className="text-gray-100 text-left mb-2">
           Create a new Save
        </Typography>
        <Input 
           className="text-gray-100 border-gray-100 focus:border-white focus:border-t-white"
           labelProps={{
            className:"!text-gray-100 peer-focus:text-xs focus:border-t-gray-100 peer-focus:w-[50px] peer-focus:h-auto peer-focus:bg-gray-900 peer-focus:ml-2",
          }}
          label="Name" />

          <Button className=" w-full bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none mt-2 transition-all">  
            Add Save
          </Button>

      </div>

    
      <List>
         <ListItem className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100">
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          Save 1
          <ListItemSuffix >
            <Button className=" hover:bg-custom-purple-darker  p-2 rounded-xl transition-all">  
              <TrashIcon className="h-5 w-5"/>
            </Button>
          </ListItemSuffix>
        </ListItem>

        
        <hr className="my-2 border-blue-gray-50" />
       
        <ListItem className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Exit
        </ListItem>
      </List>
    </Card>
  );
}