import { Chip } from "@material-tailwind/react";
 
export function SaveStatus({isBackup}: {isBackup: boolean}) {

    if(isBackup) {
        return (
            <Chip
            className="bg-green-200 text-green-900"
            variant="ghost"
            color="green"
            size="sm"
            value="Saved"
            icon={
              <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
            }
          />
        )
    }

  return (
    <div className="flex gap-2">
     
      <Chip
        className="bg-red-200 text-red-900"
        variant="ghost"
        color="red"
        size="sm"
        value="Not Saved"
        icon={
          <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
        }
      />
    </div>
  );
}