import { Expense } from "../types";

interface EditModalProps {
  expenseData: Expense;
  initialData?: Expense; // Added initial data for comparison
  onSave: (updatedData: Expense) => void;
  onCancel: () => void;
  onChange: (field: string, value: string | number) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  expenseData,
  onSave,
  onCancel,
  onChange,
}) => {
  const formatDate = (date: string | Date): string => {
    if (typeof date === "string") return date; // Already in string format
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-DarkIndigo p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Edit Expense</h3>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Expense Name</label>
            <input
              type="text"
              value={expenseData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full border rounded-lg p-2 mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Amount</label>
            <input
              type="number"
              value={expenseData.amount}
              onChange={(e) => onChange("amount", parseFloat(e.target.value))}
              className="w-full border rounded-lg p-2 mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={formatDate(expenseData.date)}
              onChange={(e) => onChange("date", e.target.value)}
              className="w-full border rounded-lg p-2 mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              type="text"
              value={expenseData.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full border rounded-lg p-2 mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Reference</label>
            <input
              type="text"
              // value={expenseData.description}
              onChange={(e) => onChange("reference", e.target.value)}
              className="w-full border rounded-lg p-2 mt-2"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-5">
            <button
              type="button"
              onClick={onCancel}
              className="bg-Linen text-Darkgrayishviolet p-3 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(expenseData)}
              className="p-3 rounded-lg font-semibold bg-green-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
