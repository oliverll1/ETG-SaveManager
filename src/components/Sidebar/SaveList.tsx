import { FolderIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react';
import { getAllBackups, deleteBackup, createBackup } from '../../IPC/IPCMessages';
import { useState } from 'react';

export function SaveList() {

    const [backupList, setBackupList] = useState<object[]>([]);
    const [ saveNameInputText, setSaveNameInputText] = useState('');

    const handleDelete = async (name:string) => {
        await deleteBackup(name);
    }

    const handleBackup = async () => {
        const data = await getAllBackups();

        setBackupList(data);
    }


    const handleCreate = async (name:string) => {
        await createBackup(name);
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSaveNameInputText(e.target.value);
    }
    
    return (
        <>
            <div className="p-2 ">
                <Typography variant="h6" className="text-gray-100 text-left mb-2">
                Create a new Save
                </Typography>
                <Input 
                className="text-gray-100 border-gray-100 focus:border-white focus:border-t-white"
                labelProps={{
                    className:"!text-gray-100 peer-focus:text-xs focus:border-t-gray-100 peer-focus:w-[50px] peer-focus:h-auto peer-focus:bg-gray-900 peer-focus:ml-2",
                }}
                onChange={handleInputChange}
                value={saveNameInputText}
                label="Name" />

                <Button 
                    onClick={() => handleCreate(saveNameInputText)} 
                    className=" w-full bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none mt-2 transition-all"
                    >  
                    Add Save
                </Button>
            </div>

            <List>
                {backupList.map((item) => (
                    <ListItem className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100">
                    <ListItemPrefix>
                        <FolderIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    
                    {item.name}
                    <ListItemSuffix >
                        <Button 
                            className=" hover:bg-custom-purple-darker  p-2 rounded-xl transition-all"
                            onClick={() => handleDelete(item.name)}
                        > 
                        <TrashIcon className="h-5 w-5"/>
                        </Button>
                    </ListItemSuffix>
                    </ListItem>
                ))}

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
            </List>   
        </>
    )
}