import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketContext";
import { useMemo } from "react";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tickets } = useTickets();

  const stats = useMemo(() => {
    const totalTickets = tickets.length;
    const openTickets = tickets.filter((t) => t.status === "open").length;
    const resolvedTickets = tickets.filter((t) => t.status === "closed").length;
    const avgResolutionTime = resolvedTickets > 0 ? "2.5h" : "N/A";

    return [
      {
        name: "Total Tickets",
        value: totalTickets.toString(),
        change: "+0%",
        changeType: "increase",
      },
      {
        name: "Open Tickets",
        value: openTickets.toString(),
        change: "+0%",
        changeType: "increase",
      },
      {
        name: "Resolved Tickets",
        value: resolvedTickets.toString(),
        change: "+0%",
        changeType: "increase",
      },
      {
        name: "Avg. Resolution Time",
        value: avgResolutionTime,
        change: "0h",
        changeType: "neutral",
      },
    ];
  }, [tickets]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
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
              to="/user/tickets"
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Manage Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md text-sm font-medium text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* WAVE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full z-0 opacity-70">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            fill="#3b82f6"
            fillOpacity="0.1"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Dashboard Overview
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-blue-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <Link
              to="/user/tickets"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>

          <ul className="divide-y divide-blue-50">
            {tickets.slice(0, 5).map((ticket) => (
              <li key={ticket.id} className="px-6 py-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        ticket.status === "closed"
                          ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          : "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      }
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Ticket #{ticket.id.slice(-4)}{" "}
                    {ticket.status === "closed"
                      ? "has been resolved"
                      : ticket.status === "in_progress"
                      ? "is in progress"
                      : "has been created"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}

            {tickets.length === 0 && (
              <li className="px-6 py-8 text-center text-gray-500">
                No recent activity
              </li>
            )}
          </ul>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
