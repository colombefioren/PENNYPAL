import { Dialog, Button } from "../../../ui";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import type { Income } from "../../../types/Income";

interface DeleteConfirmationModalProps {
  open: boolean;
  income: Income | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal = ({
  open,
  income,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Confirm Delete"
      footer={
        <>
          <Button
            onClick={onClose}
            className="border border-white/30 text-light/80 bg-transparent hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-light/90">
        Are you sure you want to delete this income?
      </p>
      {income && (
        <div className="mt-3 p-3 bg-white/5 rounded">
          <p>
            <strong>Amount: </strong>
            {formatCurrency(income.amount)}
          </p>
          <p>
            <strong>Source:</strong>{" "}
            {income.source.length > 0 ? income.source : "-"}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(income.date)}
          </p>
        </div>
      )}
    </Dialog>
  );
};
