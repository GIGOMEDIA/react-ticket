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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
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
              to="/user/tickets"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Manage Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="shrink-0 bg-blue-500 rounded-md p-3">
                    <svg
                      className="h-6 w-6 text-white"
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
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === "increase"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.changeType === "increase" ? (
                            <svg
                              className="self-center shrink-0 h-5 w-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="self-center shrink-0 h-5 w-5 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          <span className="sr-only">
                            {stat.changeType === "increase"
                              ? "Increased"
                              : "Decreased"}{" "}
                            by
                          </span>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h2>
            <Link
              to="/user/tickets"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all
            </Link>
          </div>
          <div className="bg-white overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {tickets.slice(0, 5).map((ticket) => (
                <li key={ticket.id} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
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
                  </div>
                </li>
              ))}
              {tickets.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No recent activity
                </li>
              )}
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
