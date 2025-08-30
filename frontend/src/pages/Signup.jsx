import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setshowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/signup`,
        {
          fullName,
          email,
          password,
          role,
          mobile,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log("failed to signup", error);
    }
  };

  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setError("Mobile Number is Required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverURL}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log("error during google signup", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            required
          />
        </div>

        <div className="mb-4">
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
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            placeholder="Enter your Mobile Number"
            style={{ border: `1px solid ${borderColor}` }}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              placeholder="Enter password"
              style={{ border: `1px solid ${borderColor}` }}
              required
            />
            <button
              onClick={() => setshowPassword((prev) => !prev)}
              className="absolute cursor-pointer right-3 top-[14px] text-gray-500"
            >
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r, index) => (
              <button
                key={index}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "#fff" }
                    : { border: `1px solid ${primaryColor}`, color: "#333" }
                }
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full font-semibold py-2 rounded-lg transition duration-200 text-white bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer`}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} /> : "Sign Up"}
        </button>
        {error && (
          <p className="text-red-500 text-center my-[10px]">*{error}</p>
        )}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span>signup with google</span>
        </button>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#ff4d2d] cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
