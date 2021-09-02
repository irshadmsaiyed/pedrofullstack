import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="h-16 bg-indigo-600 flex items-center">
      <div>
        <Link
          to="/"
          className="inline-block bg-indigo-500 hover:bg-indigo-400 rounded-lg text-center ml-2 px-2 py-2 font-bold text-white cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/createpost"
          className="inline-block bg-indigo-500 hover:bg-indigo-400 rounded-lg text-center ml-2 px-2 py-2 font-bold text-white cursor-pointer"
        >
          Create a Post
        </Link>
        <Link
          to="/login"
          className="inline-block bg-indigo-500 hover:bg-indigo-400 rounded-lg text-center ml-2 px-2 py-2 font-bold text-white cursor-pointer"
        >
          Login
        </Link>
        <Link
          to="/registration"
          className="inline-block bg-indigo-500 hover:bg-indigo-400 rounded-lg text-center ml-2 px-2 py-2 font-bold text-white cursor-pointer"
        >
          Registration
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
