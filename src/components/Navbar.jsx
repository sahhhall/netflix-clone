import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { UserAuth } from "../context/AuthContext";
import { Languages, LanguagesIcon } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;
  console.log(hash, pathname, search);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute  w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <img className="ms-8 w-40 object-contain" src={logo} alt="logo" />
      </Link>
      {pathname !== "/login" &&
        pathname !== "/signup" &&
        (user?.email ? (
          <div className="me-11">
            <Link className="capitalize" to="/profile">
              <button className="capitalize pr-4 font-nsans-bold text-gray-200">Profile</button>
            </Link>
            <button
              onClick={handleLogout}
              className="hover:bg-red-800 text-sm capitalize font-bold tracking-wider bg-red-700 px-4 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="me-11 relative justify-center items-center align-middle">
            {/* <Link className="capitalize" to="/login">
              <button className="hover:text-gray-300 font-nsans-bold capitalize pr-4">
                Login
              </button>
            </Link> */}
            
             
              <select className="  border ps-9 py-1 font-nsans-light text-xs outline-none px-3 rounded-md bg-transparent cursor-pointer me-3 custom-arrow">  
                <option className="text-xs  bg-transparent   text-black font-medium tracking-wider">
                  English
                </option>
                <option className="text-xs  bg-transparent text-black font-medium tracking-wider">
                  हिंदी
                </option>
              </select>
              <LanguagesIcon className=" absolute top-2 left-4 " size={18} />
          

            <Link to="/login">
              <button className="hover:bg-red-800 text-sm capitalize font-bold tracking-wider bg-red-700 px-4 py-1 rounded cursor-pointer">
                Sign in
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
