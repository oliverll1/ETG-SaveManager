import fs from 'fs/promises';

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
