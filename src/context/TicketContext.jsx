import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const TicketContext = createContext();

const TICKETS_STORAGE_KEY = "ticket-dash-tickets";

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    } catch (error) {
      console.error("Failed to load tickets:", error);
      toast.error("Failed to load tickets. Please retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Save tickets to localStorage whenever they change
  useEffect(() => {
    if (tickets.length > 0 || localStorage.getItem(TICKETS_STORAGE_KEY)) {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets]);

  const createTicket = async (ticketData) => {
    try {
      const newTicket = {
        ...ticketData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setTickets((prev) => [...prev, newTicket]);
      return newTicket;
    } catch (error) {
      toast.error("Failed to create ticket. Please try again.");
      throw error;
    }
  };

  const updateTicket = async (updatedTicket) => {
    try {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === updatedTicket.id
            ? { ...ticket, ...updatedTicket }
            : ticket
        )
      );
      return updatedTicket;
    } catch (error) {
      toast.error("Failed to update ticket. Please try again.");
      throw error;
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    } catch (error) {
      toast.error("Failed to delete ticket. Please try again.");
      throw error;
    }
  };

  const getTicketById = (id) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const getFilteredTickets = (filter) => {
    if (filter === "all") return tickets;
    return tickets.filter((ticket) => ticket.status === filter);
  };

  const value = {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getFilteredTickets,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};

export default TicketContext;
