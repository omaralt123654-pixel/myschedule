import { useMemo, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function ResetButton({ onReset }: { onReset: () => void }) {
  const [open, setOpen] = useState(false);

  const resetLabel = useMemo(() => 'Reset All', []);




  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border border-[#444444] text-[#CFCFCF] text-[10px] uppercase tracking-wider px-3 py-2 hover:border-[#2F80FF] transition-colors"
      >
        {resetLabel}
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#111111] border-[#444444] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#CFCFCF]">
              This will reset your habits and all completions back to the initial state.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onReset();
                setOpen(false);
              }}
              className="bg-[#2F80FF] hover:bg-[#2F80FF]"
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

