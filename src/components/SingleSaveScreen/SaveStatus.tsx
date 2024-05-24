import { Chip } from "@material-tailwind/react";
 
interface SaveStatusProps {
    isBackup: boolean
    className?: string
}

export function SaveStatus({isBackup, className}: SaveStatusProps) {

    if(isBackup) {
        return (
            <Chip
            className={`${className} bg-green-200 text-green-900`}
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
        className= {`${className} bg-red-200 text-red-900`}
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