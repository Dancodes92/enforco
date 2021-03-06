import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { useDispatch } from "react-redux";
import { clearState } from "../store/features/auth";
import logo from "../public/enforco.png";
import { HomeIcon } from "@heroicons/react/solid";

function Navbar(props) {
  const { isSuccess, refetch } = useAuthQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(clearState());
    refetch();
    navigate("/");
  };

  return (
    <div className="bg-[#444B48] sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-3 lg:mx-auto px-2 py-2">
        {!isSuccess ? (
          <>
            <div
              className="lg:inline-grid cursor-pointer "
              onClick={() => navigate("/")}
            >
              <img
                className="h-16 rounded-full"
                src={logo}
                alt="Enforco"
              />
            </div>
            <div className="flex items-center justify-end space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-gray-700 font-saira-condensed text-xl"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="text-[#444B48] hover:bg-[#444B48] hover:text-gray-700 font-saira-condensed text-lg bg-white px-1 py-1 rounded-sm"
              >
                Signup
              </Link>
            </div>
          </>
        ) : (
          <>
            <div
              className="lg:inline-grid cursor-pointer "
              onClick={() => navigate("/home")}
            >
              <img
                className="h-16 rounded-full hover:scale-98 transition-all duration-150 ease-out"
                src={logo}
                alt="Enforco"
              />
            </div>
            <div className="flex items-center justify-end space-x-4">
            <HomeIcon  onClick={() => navigate("/home")} className=" h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out"/>
              <Link
                to="/login"
                className="text-white hover:text-gray-700 font-saira-condensed text-xl"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
