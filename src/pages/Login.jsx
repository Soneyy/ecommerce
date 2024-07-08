import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice"; // Use the correct import
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BreadCrumb from "../Components/common/BreadCrumb";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        const accessToken = res.data.access_token;
        const refreshToken = res.data.refresh_token;

        // Store tokens in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Fetch user information
        return axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((userRes) => {
        const userData = userRes.data;

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Login Successful");
        dispatch(login(userData)); // Dispatch login action with user data

        // Check if user is admin
        if (userData.role === "admin") {
          navigate("/admin"); // Redirect to admin page
        } else {
          navigate("/profile"); // Redirect to profile page after login
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.response?.status === 400) {
          toast.error("Bad request");
        } else if (err.response?.status === 401) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong. Try again later.");
        }
      });
  }

  return (
    <>
      <BreadCrumb title="Login" />
      <div className="flex justify-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="flex justify-center text-2xl font-semibold mb-4">
            Login
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Please login using account detail below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <Link to="/forgetPassword" className="text-sm text-blue-500">
                Forget Your Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary-300 text-white rounded p-2 hover:bg-secondary-200"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Don’t have an Account?{" "}
            <Link to="/Signup" className="text-blue-500">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
