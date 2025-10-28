import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth.schema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      toast.success("Login successful!");
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative flex items-center justify-center px-4 py-10 overflow-hidden">
      
      {/* BLUE WAVE SVG */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="#3b82f6"
            fillOpacity="0.12"
            d="M0,64L48,90.7C96,117,192,171,288,170.7C384,171,480,117,576,122.7C672,128,768,192,864,197.3C960,203,1056,149,1152,117.3C1248,85,1344,75,1392,69.3L1440,64V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
          />
        </svg>
      </div>

      {/* CARD */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-blue-600 mb-4 transition-all"
        >
          <span className="mr-2">←</span> Back
        </button>

        {/* LOGO */}
        <div className="flex items-center justify-center mb-6">
          <svg className="h-9 w-9 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-2 text-2xl font-bold text-gray-900">TicketApp</span>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sign in to continue managing your tickets
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all ${
                errors.email ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-all ${
                errors.password ? "border-red-300" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-400`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register("rememberMe")} className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700">Remember me</span>
            </label>

            <button type="button" className="text-blue-600 hover:text-blue-500">
              Forgot password?
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          {/* SIGN UP LINK */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-blue-600 font-medium hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

