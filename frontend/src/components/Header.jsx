import React from "react";
import { IoWallet } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-slate-50  p-4 sm:p-2  w-full drop-shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-black text-lg flex items-center p-1">
          <IoWallet />
          Expense Tracker
        </div>
        <ul className="flex space-x-2 sm:space-x-10">
          {userInfo ? (
            <>
              {" "}
              <li
                className="text-sm sm:text-base  md:flex flex-grow justify-center space-x-4"
                onClick={logoutHandler}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="text-sm sm:text-base  md:flex flex-grow justify-center space-x-4">
                <Link to="/"> Login</Link>
              </li>
              <li className="text-sm sm:text-base  md:flex flex-grow justify-center space-x-4">
                <Link to="/signup"> Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
