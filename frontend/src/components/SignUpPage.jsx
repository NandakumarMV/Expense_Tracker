import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userApiSlice";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);
  const sumbmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-12 overflow-hidden">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Let's Create an Account
        </div>
        <form className="p-6  w-96 " onSubmit={sumbmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-blue-900- font-semibold"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              name="name"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-blue-900- font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-blue-900- font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600  px-3 py-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-4   hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <p className="ml-32">
          Already Have an Account?
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
