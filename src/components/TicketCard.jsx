import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const statusStyles = {
  open: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-gray-200 text-gray-700",
};

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-600",
  medium: "bg-blue-50 text-blue-600",
  high: "bg-rose-50 text-rose-600",
};

const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Delete this ticket?")) {
      try {
        await onDelete(ticket.id);
        toast.success("Ticket deleted");
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="px-5 py-5">
        <div className="flex items-start justify-between">
          <h3 className="text-[17px] font-semibold text-gray-800">
            {ticket.title}
          </h3>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(ticket)}
              className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
              title="Edit"
            >
              <FaPencilAlt className="h-4 w-4" />
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 rounded-md hover:bg-rose-50 text-gray-400 hover:text-rose-600 disabled:opacity-40 transition"
              title="Delete"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        </div>

        {ticket.description && (
          <p className="mt-2 text-[13px] text-gray-600 line-clamp-3">
            {ticket.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusStyles[ticket.status]}`}
          >
            {ticket.status.replace("_", " ")}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${priorityStyles[ticket.priority]}`}
          >
            {ticket.priority}
          </span>
        </div>

        <div className="mt-4 text-[11px] text-gray-500">
          Created {new Date(ticket.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
