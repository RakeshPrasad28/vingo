import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(res);
      setError("");
      setLoading(false);
      setStep(2);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/verify-otp`,
        {
          email,
          Otp,
        },
        { withCredentials: true }
      );
      console.log(res);
      setError("");
      setLoading(false);
      setStep(3);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    if (password != confirmPassword) return null;
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/reset-password`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setError("");
      setLoading(false);
      console.log(res);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center w-full min-h-screen justify-center p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
            size={30}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              onClick={handleSendOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Send OTP"}
            </button>
            {error && (
              <p className="text-red-500 text-center my-[10px]">*{error}</p>
            )}
          </div>
        )}

        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="email"
                onChange={(e) => setOtp(e.target.value)}
                value={Otp}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter  OTP"
                required
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Verify OTP"}
            </button>
            {error && (
              <p className="text-red-500 text-center my-[10px]">*{error}</p>
            )}
          </div>
        )}

        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="text"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Confirm password"
                required
              />
            </div>
            <button
              onClick={handleResetPassword}
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : " Reset Password"}
            </button>
            {error && (
              <p className="text-red-500 text-center my-[10px]">*{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
