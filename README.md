# Enter the Gungeon Save Manager

A Save Manager for the game "Enter the Gungeon." It allows you to bypass the developer restrictions on backing up previous saves, meaning you can reset floors if you died or experienced bad RNG. 

# Requirements

- Node.js v18.20.3
- The 'Game Enter the Gungeon' with an active save file (Save location: "AppData\LocalLow\Dodge Roll\Enter the Gungeon")
- Windows 10 or 11


# Run from source

```bash
git clone git@github.com:oliverll1/ETG-SaveManager.git
cd ETG-SaveManager
npm install
npm run dev
```


# How to use 

#### 1. Create a new save:

- Enter a name for your new save file in the input box below the text "Create a new save:"
- Click the "ADD SAVE" button.
- A new save should have been created and is displayed in the sidebar list.


#### 2. Backup your save:

- Click the newly generated save in the sidebar list, and you should see a panel with 'Save' and 'Load' buttons.

- In the upper right corner of the buttons container, there is a badge saying "Not Saved," meaning you have not backed up your current game save yet. Click the 'Save' button, and now you should see the badge turn green with the text 'Saved' and the date of the last time you saved in the upper left corner of the buttons container. You should also see a notification in the upper right corner of the screen if the process failed or was successful.

#### 3. Load the save 

- With the game closed, click the 'Load' button and start the game again. You should start from the last floor you saved; however, this will regenerate the whole level (use it to bypass bad RNG).


#### Important Notes


- Save backups are stored in "Documents\ETGBackups" (There is no option to change this at the moment unless you change it in the code).

- The only way to save in-game is to freeze elevators and use them when finishing a floor (which will take you out of the game). The game was not meant to be saved at will; this is a mechanic to allow players to take a rest that normally can be used once per run. It is here, after the frozen elevator takes you out of the game that you should click the save button.

- If you do the backup process manually (instead of using this app), you should also remove the following registry key: HKCU:\\SOFTWARE\\Dodge Roll\\Enter the Gungeon. If this registry key is not removed, you won't be able to load previous saves.


[![Screenshot-7.png](https://i.postimg.cc/zGmnqgYT/Screenshot-7.png)](https://postimg.cc/F7ZfZ1RK)