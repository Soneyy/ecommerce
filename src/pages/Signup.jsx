import React, { useState } from "react";
import BreadCrumb from "../Components/common/BreadCrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../Components/common/ErrorMessage";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setFormError({}); // Reset form errors

    axios
      .post("https://api.escuelajs.co/api/v1/users", {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        avatar: e.target.avatar.value,
      })
      .then((res) => {
        toast.success("Success");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          const errorMessages = err.response.data.message;
          let errorsObj = {};

          errorMessages.forEach((error) => {
            if (error.includes("email")) {
              errorsObj.email = error;
            } else if (error.includes("name")) {
              errorsObj.name = error;
            } else if (error.includes("password")) {
              errorsObj.password = error;
            } else if (error.includes("avatar")) {
              errorsObj.avatar = error;
            }
          });

          setFormError(errorsObj);
        } else {
          toast.error("Something went wrong. Try again later.");
        }

        setIsLoading(false);
      });
  }

  return (
    <>
      <BreadCrumb title="Signup" />
      <div className="mx-auto mt-20 flex items-center justify-center p-8 shadow-lg max-w-lg">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Signup</h1>
            <p className="text-sm text-gray-600">
              Please sign up using the details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="Name"
              />
              {formError.name && <ErrorMessage msg={formError.name} />}
            </div>
            <div>
              <input
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                type="email"
                placeholder="Email Address"
              />
              {formError.email && <ErrorMessage msg={formError.email} />}
            </div>
            <div>
              <input
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                type="password"
                placeholder="Password"
              />
              {formError.password && <ErrorMessage msg={formError.password} />}
            </div>
            <div className="mb-4">
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                name="avatar"
                placeholder="Avatar URL (optional)"
              />
              {formError.avatar && <ErrorMessage msg={formError.avatar} />}
            </div>
            <div>
              <Link
                to="/forgetPassword"
                className="block text-sm text-blue-500 hover:underline"
              >
                Forgot Your Password?
              </Link>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-secondary-300 text-white px-4 py-2 rounded hover:bg-secondary-200"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an Account?{" "}
            <Link to="/login" className="text-secondary-200 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer theme="colored" />
    </>
  );
}
