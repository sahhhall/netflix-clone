import React, { useState } from "react";
import img from "../assets/signup.jpg";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
const SignUp = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [validationErr, setValidationErr] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)

  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateChange(name, value);
  };

  const validateChange = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email is invalid";
      }
    } else if (name === "password") {
      if (value.length < 6 || !/\d/.test(value)) {
        error = "must be at least 6 characters long and contain a number";
      }
    }

    setValidationErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      setValidationErr((prev) => ({
        ...prev,
        email: formdata.email ? "" : "Email is required",
        password: formdata.password ? "" : "Password is required",
      }));
      return;
    }
    setLoading(true);
    try {
      await signUp(formdata.email, formdata.password);
      navigate("/");
    } catch (error) {
      toast.error("email already in use ")
      setLoading(false);
    }
    console.log("Formdata:", formdata);
  };

  const handlePassword = () => {
    setShowPassword(!showpassword);
  };

  return (
    <div className="w-full h-screen">
      <img
        src={img}
        className="sm:block absolute w-full h-full object-cover"
        alt="signup background"
      />
      <div className="bg-black/70 fixed top-0 w-full h-full" />
      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[480px] mx-auto bg-black/70 rounded-lg">
          <div className="max-w-[320px] mx-auto pt-16">
            <h1 className="font-nsans-bold text-2xl text-white">Sign Up</h1>
            <form className="w-full mt-8" onSubmit={handleSubmit}>
              <input
                className={`w-full ${
                  validationErr.email ? "mb-1" : "mb-4"
                } px-4 py-2 appearance-none border ${
                  validationErr.email ? "border-red-500" : "border-gray-300"
                } outline-none bg-transparent text-white placeholder-gray-400 rounded-lg`}
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formdata.email}
                autoComplete="off"
              />
              {validationErr.email && (
                <span className="text-red-500 text-xs">
                  {validationErr.email}
                </span>
              )}
              <div className="relative">
                <input
                  className={`w-full mb-4  ${
                    validationErr.password ? "mb-1" : "mb-4"
                  } px-4 py-2 appearance-none border ${
                    validationErr.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } outline-none bg-transparent text-white placeholder-gray-400 rounded-lg pr-10`}
                  placeholder="Password"
                  type={showpassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formdata.password}
                />
                <div
                  onClick={handlePassword}
                  className="absolute inset-y-0 right-0 bottom-3 pr-3 flex items-center cursor-pointer"
                >
                 {showpassword ?  <EyeOff size={17} /> : <Eye  size={17}/>  } 
                </div>
              </div>
              {validationErr.password && (
                <span className="text-red-500 text-xs">
                  {validationErr.password}
                </span>
              )}
              <button
                type="submit"
                className="w-full bg-red-700 font-nsans-bold py-3 rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
              <h1 className="w-full text-center mt-3 text-xs font-nsans-light">OR</h1>
              <div className="flex justify-center items-center text-center">
                <p className="text-xs text-gray-600 font-nsans-thin ">
                  already have an account?
                </p>
                <Link
                  to="/login"
                  className="  text-white-600 text-sm text-center ps-2"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
