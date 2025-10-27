import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RequireAuth } from "./utils/Auth";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TicketsPage from "./pages/TicketsPage";

const App = () => {
  return (
    <AuthProvider>
      <TicketProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/user/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/user/tickets"
            element={
              <RequireAuth>
                <TicketsPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TicketProvider>
    </AuthProvider>
  );
};

export default App;
