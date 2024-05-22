import fs from 'fs/promises';
import fsExtra from 'fs-extra';

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
      } catch (err) {
        console.error('An error occurred while copying the folder:', err);
      }
}