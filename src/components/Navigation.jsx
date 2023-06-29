import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.ico";
import { FiLogOut } from "react-icons/fi";

function Navigation({ authUser, signOut }) {
  const { avatar, name } = authUser;
  const location = useLocation();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center order-2 gap-10">
            <div className="flex text-sm rounded-full mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
              <img className="w-8 h-8 rounded-full" src={avatar} alt="user photo" />
              <span className="hidden ml-3 text-gray-700 dark:text-gray-300 md:flex md:items-center">{name}</span>
            </div>
            <button className="flex items-center" onClick={signOut}>
              <FiLogOut />
              <span className="hidden ml-3 text-gray-700 dark:text-gray-300 md:flex md:items-center">logout</span>
            </button>
          </div>
          <div className="items-center justify-between flex w-auto order-1 gap-10">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-base md:text-xl lg:text-2xl font-semibold whitespace-nowrap dark:text-white">Open Discuss</span>
            </Link>
            <ul className="font-medium rounded-lg flex-row space-x-8 mt-0 border-0 bg-white dark:bg-gray-900 dark:border-gray-700 flex">
              <li>
                <Link to="/" className={`py-2 pl-3 pr-4 bg-blue-700 rounded bg-transparent p-0 dark:text-blue-500 text-base md:text-xl ${location.pathname === "/" && "text-blue-700"}`} aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/leaderboards" className={`py-2 pl-3 pr-4 bg-blue-700 rounded bg-transparent p-0 dark:text-blue-500 text-base md:text-xl ${location.pathname === "/leaderboards" && "text-blue-700"}`}>
                  Leaderboards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
