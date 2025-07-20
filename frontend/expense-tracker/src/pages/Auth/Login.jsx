import React, { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import {axiosInstance} from '../../utils/axiosInstance.js';
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from '../../context/UserContext'; // ✅ use your actual path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { updateUser } = useContext(UserContext); // no longer needed
  // const navigate = useNavigate(); // no longer needed
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // console.log("📤 Sending login request to:", API_PATHS.AUTH.LOGIN);

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        // Force a reload to ensure all state and axios see the new token
        window.location.href = "/dashboard";
        return;
        // Do not fetch user info or call updateUser here
      } else {
        setError("Invalid response from server.");
      }

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-gray-100'>Welcome Back</h3>
        <p className='text-xs text-gray-400 mt-[5px] mb-6'>Please enter your details to log in</p>

        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ravi@gmail.com"
            type="email"
            className="border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded w-full placeholder-gray-400"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            type="password"
            className="border border-gray-700 bg-gray-800 text-gray-100 p-2 rounded w-full placeholder-gray-400"
          />

          {error && <p className='text-red-400 text-xs pb-2.5'>{error}</p>}

          <button
            type="submit"
            className='btn-primary disabled:opacity-50'
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p className="text-[13px] text-gray-400 mt-3">
            Don't have an account?{" "}
            <Link className='font-medium text-violet-400 underline' to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
