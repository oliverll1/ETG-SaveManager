import fs from 'fs/promises';
import fsExtra from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';

export const createFile = async (filePath: string) => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        if (fileContent.trim() === '') {
            await fs.writeFile(filePath, '{}', 'utf-8');
        }

      } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          await fs.writeFile(filePath, '{}', 'utf-8');
        } else {
          throw error;
        }
      }
}

export const copyDirectory = async (sourceDir: string, destDir: string) => {

    try {
        await fsExtra.copy(sourceDir, destDir, { overwrite: true, errorOnExist: false });
        console.log('Folder copied successfully!');
        return true;
      } catch (error) {
        console.error('An error occurred while copying the folder:', error);
        return false;
      }
}


export const removeRegistryKey = async () => {
  const command = `powershell.exe -Command "Remove-Item -Path 'HKCU:\\SOFTWARE\\Dodge Roll\\Enter the Gungeon' -Force"`;
  const execAsync = promisify(exec);

  try {

    // Execute the PowerShell command asynchronously
    const { stdout, stderr } = await execAsync(command);
    console.log('Output:', stdout);
  } catch (error) {
      console.error('Error:', error);
  }
}
