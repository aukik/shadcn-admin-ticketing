import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => Promise<void>;
  actionType: 'accept' | 'reject' | null;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onProceed,
  actionType
}: ConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async () => {
    setIsLoading(true);
    try {
      await onProceed();
    } finally {
      setIsLoading(false);
    }
  };

  const actionMessage = actionType === 'accept'
    ? 'accept this ticket. A mail will be sent to the user containing the PDF file of the ticket'
    : 'reject this ticket';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            {`You are about to ${actionMessage}. This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleProceed}
            disabled={isLoading}
            variant={actionType === 'accept' ? 'default' : 'destructive'}
          >
            {isLoading ? 'Processing...' : 'Proceed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
