import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";
import TicketForm from "../components/TicketForm";
import TicketCard from "../components/TicketCard";
import Footer from "../components/Footer";

const TicketsPage = () => {
  const { user, logout } = useAuth();
  const {
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getFilteredTickets,
  } = useTickets();
  const [filter, setFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const filteredTickets = getFilteredTickets(filter);

  const handleCreateTicket = async (ticketData) => {
    await createTicket(ticketData);
    setIsFormOpen(false);
  };

  const handleUpdateTicket = async (ticketData) => {
    const updatedTicket = { ...editingTicket, ...ticketData };
    await updateTicket(updatedTicket);
    setEditingTicket(null);
    setIsFormOpen(false);
  };

  const handleDeleteTicket = async (ticketId) => {
    await deleteTicket(ticketId);
  };

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0 px-0">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900">
              TicketDash
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {user?.name || "User"}!
            </span>
            <Link
              to="/user/dashboard"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Dashboard
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Ticket Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all your support tickets in one place
            </p>
          </div>
          <button
            onClick={() => {
              setEditingTicket(null);
              setIsFormOpen(true);
            }}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" />
            New Ticket
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="status-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-1 block w-full md:w-70 border  pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500/50  flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editingTicket ? "Edit Ticket" : "Create New Ticket"}
              </h2>
              <TicketForm
                ticket={editingTicket}
                onSubmit={
                  editingTicket ? handleUpdateTicket : handleCreateTicket
                }
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingTicket(null);
                }}
              />
            </div>
          </div>
        )}

        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleEditClick}
                onDelete={handleDeleteTicket}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No tickets
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === "all"
                ? "Get started by creating a new ticket."
                : `No ${filter.replace("_", " ")} tickets found.`}
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setEditingTicket(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPlus className="-ml-1 mr-2 h-5 w-5" />
                New Ticket
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TicketsPage;
