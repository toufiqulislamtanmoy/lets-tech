// import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import { AuthContext } from "../Pages/Provider/AuthProviders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faHouseChimney, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/Logo/logo.png"
const Dashboard = () => {
    const location = useLocation();
    // const { user } = useContext(AuthContext);
    return (

        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <Link to="/" className="text-xl cursor-pointer text-orange-400">
                            <img className="w-20 h-20" src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {/* Navbar menu content here */}
                            <li>
                                <Link
                                    className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/' ? 'text-pink-400 bg-opacity-40' : ''}`}
                                    to="/"><FontAwesomeIcon icon={faHouseChimney} /> Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/dashboard/addModule' ? 'text-pink-400 bg-opacity-40' : ''}`}
                                    to="/dashboard/addLanguage"><FontAwesomeIcon icon={faListCheck} /> Add Module
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/dashboard/manageModule' ? 'text-pink-400 bg-opacity-40' : ''}`}
                                    to="/dashboard/manageModule"><FontAwesomeIcon icon={faFileCirclePlus} /> Manage Module
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <Outlet />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200">
                    <li>
                        <Link
                            className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/' ? 'text-pink-400 bg-opacity-40' : ''}`}
                            to="/"><FontAwesomeIcon icon={faHouseChimney} /> Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/dashboard/addModule' ? 'text-pink-400 bg-opacity-40' : ''}`}
                            to="/dashboard/addModule"><FontAwesomeIcon icon={faListCheck} /> Languages
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`hover:text-white hover:bg-pink-500 hover:transition-colors hover:duration-500 ${location.pathname === '/dashboard/manageModule' ? 'text-pink-400 bg-opacity-40' : ''}`}
                            to="/dashboard/manageModule"><FontAwesomeIcon icon={faFileCirclePlus} /> Manage Module
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Dashboard;