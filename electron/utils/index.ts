import fs from 'fs/promises';

export const createFile = async (filePath: string) => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        if (fileContent.trim() === '') {
            fs.writeFile(filePath, '{}', 'utf-8');
        }

      } catch (error) {
        if (error.code === 'ENOENT') {
          await fs.writeFile(filePath, '{}', 'utf-8');
        } else {
          throw error;
        }
      }
}

