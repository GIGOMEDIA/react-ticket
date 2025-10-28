import Button from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">
                TicketApp
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* BLUE WAVE SVG */}
      <div className="absolute top-0 left-0 w-full z-0">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO */}
        <header className="pt-12 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            TicketApp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionize your support workflow with our powerful, intuitive
            ticket management solution. Streamline operations and boost team
            productivity instantly.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              className="px-8 py-3 text-lg hover:bg-blue-300 hover:scale-105"
              onClick={() => navigate("/auth/signup")}
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              className="px-10 py-3 text-lg hover:scale-105 hover:bg-blue-500 hover:text-white"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          </div>
        </header>

        {/* FEATURES SECTION */}
        <section className="relative py-20 min-h-[70vh] flex items-center">

          {/* Animated Blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                 Ticket App for management {" "}
                <span className="text-blue-600">user friendly</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Modern ticket management built for speed, clarity, and team efficiency.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:bg-blue-300 hover:scale-105"
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-blue-500 hover:text-white hover:scale-105"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Feature Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-blue-50 p-4 rounded-xl inline-block mb-6">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Team Collaboration
              </h3>
              <p className="text-gray-600 mb-6">
                Work together seamlessly with your team on support tickets, with
                real-time updates and notifications.
              </p>

              <ul className="space-y-3">
                {[
                  "Real-time ticket updates",
                  "Team assignment & collaboration",
                  "Performance analytics",
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
