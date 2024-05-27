import { FolderIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, Input, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react';
import { getAllBackups, deleteBackup, createBackup, getBackup } from '../../IPC/IPCMessages';
import { useEffect, useState } from 'react';
import { SaveState, ISaveState } from '../Context/SaveProvider';
import { useNavigate } from 'react-router-dom';

export function SaveList() {
    const { setSelectedBackup, backupList, setBackupList } = SaveState() as ISaveState;
    const [saveNameInputText, setSaveNameInputText] = useState('');
    const navigate = useNavigate();

    const getBackupList = async () => {
        try {
            const data = await getAllBackups();
          
            if (JSON.stringify(backupList) !== JSON.stringify(data)) {
               setBackupList(data);
            }
            
        } catch (error) {
            console.error('Error fetching backup list:', error);
        }
    }

    const handleDelete = async (event:React.MouseEvent, name:string) => {
        event.stopPropagation();
        await deleteBackup(name);
        setSelectedBackup({ name: '', date: '', path: '', isBackup: false });
        setBackupList((prevList) => prevList.filter((backup) => backup.name !== name));
    }

    const handleCreate = async () => {
        if (saveNameInputText !== '') {
            const backupExists = backupList.some(backup => backup.name === saveNameInputText);
            if (!backupExists) {
                await createBackup(saveNameInputText);
                setBackupList((prevList) => [...prevList, { name: saveNameInputText, date: '', path: '', isBackup: false }]);
                setSaveNameInputText('');
            } else {
                console.warn('An item with the same name already exists.');
            }
        }
    }

    const handleSelect = async (name: string) => {
        navigate('/');
        try {
            const data = await getBackup(name);
          
            setSelectedBackup(data);
            
        } catch (error) {
            console.error('Error fetching backup list:', error); 
        }
       
    }

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSaveNameInputText(e.target.value);
    }

    useEffect(() => {
        getBackupList();
    }, []);

    return (
        <>
            <div className="p-2 ">
                <Typography variant="h6" className="text-gray-100 text-left mb-2">
                Create a new save:
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
                    onClick={handleCreate} 
                    disabled={saveNameInputText === ''}
                    className=" w-full bg-custom-purple hover:bg-custom-purple-darker hover:border-custom-purple-darker outline-none focus:outline-none mt-2 transition-all"
                    >  
                    Add Save
                </Button>
            </div>

            <List>
                {backupList.map((backup) => (
                    <ListItem 
                        key={backup.name}
                        onClick={() => handleSelect(backup.name)}
                        className="text-gray-100 hover:bg-custom-purple hover:text-gray-100 focus:bg-custom-purple focus:text-gray-100 active:bg-custom-purple active:text-gray-100"
                    >
                    <ListItemPrefix>
                        <FolderIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    
                    {backup.name}
                    <ListItemSuffix >
                        <Button 
                            className=" hover:bg-custom-purple-darker  p-2 rounded-xl transition-all"
                            onClick={(event) => handleDelete(event, backup.name)}
                        > 
                        <TrashIcon className="h-5 w-5"/>
                        </Button>
                    </ListItemSuffix>
                    </ListItem>
                ))}
            </List>   
        </>
    )
}
