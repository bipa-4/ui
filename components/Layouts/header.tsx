import React from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <div className="fixed top-0 w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out shadow-md">
      <div className="flex flex-col max-w-7xl px-0 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-end justify-between p-4">
          <div className="px-3 py-1 mr-5">
            <FiMenu className="w-6 h-6" />
          </div>
          <a
            href="/"
            className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline"
          >
            <h1 className="text-4xl Avenir tracking-tighter text-gray-900 hover:text-gray-600  md:text-4x1 lg:text-3xl">
              StreamWave
            </h1>
          </a>
          <button
            className="cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none "
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FiChevronDown className="w-6 h-6" />
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <nav className="flex-col flex-grow ">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <a
                  href="/"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
