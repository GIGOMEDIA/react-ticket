import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const statusStyles = {
  open: "bg-green-100 text-green-800",
  in_progress: "bg-amber-100 text-amber-800",
  closed: "bg-gray-100 text-gray-800",
};

const priorityStyles = {
  low: "text-green-600 bg-green-50",
  medium: "text-blue-600 bg-blue-50",
  high: "text-red-600 bg-red-50",
};

const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await onDelete(ticket.id);
        toast.success("Ticket deleted successfully");
      } catch {
        toast.error("Failed to delete ticket");
      }
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {ticket.title}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(ticket)}
              className="text-gray-400 hover:text-blue-500"
              title="Edit ticket"
            >
              <FaPencilAlt className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 disabled:opacity-50"
              title="Delete ticket"
            >
              <FaTrash className="h-5 w-5" />
            </button>
          </div>
        </div>

        {ticket.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {ticket.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusStyles[ticket.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {ticket.status.replace("_", " ")}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              priorityStyles[ticket.priority] || "bg-gray-100 text-gray-800"
            }`}
          >
            {ticket.priority}
          </span>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
