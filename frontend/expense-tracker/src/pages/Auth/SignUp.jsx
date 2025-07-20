import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import {axiosInstance} from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import  uploadImage  from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext); // ✅ Fixed useContext usage
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !fullName) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    let profileImageUrl = ""; // ✅ Properly declared

    try {
      // ✅ Upload image if provided
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/login");
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-2xl px-8 py-10 rounded-xl shadow-lg bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-100 mb-1">Create an Account</h2>
          <p className="text-sm text-gray-400 mb-6">Join us today by entering your details below.</p>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Full Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-1 block">Password</label>
                <input
                  type="password"
                  placeholder="Min 8 Characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 bg-gray-900 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-700 placeholder-gray-400"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              SIGN UP
            </button>

            <p className="text-[13px] text-gray-400 mt-3">
              Already have an account?{" "}
              <Link className="font-medium text-violet-400 underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
