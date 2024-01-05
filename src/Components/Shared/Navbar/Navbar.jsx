import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Pages/Provider/AuthProviders";
import useUserRole from "../../../Hooks/useUserRole";
import useAllLanguge from "../../../Hooks/useAllLanguge";
import logo from "../../../assets/Logo/logo.png";
const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [role] = useUserRole();
    const { languages } = useAllLanguge();

    const handelLogOut = async () => {
        logout();
    }

    return (
        <div className="navbar w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 fixed z-10 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li>
                            <a >Tutorial</a>
                            <ul className="p-2">
                                {languages.map((language) => (
                                    <li key={language._id}>
                                        <Link to={`/tutorialdetails/${language._id}`}>{language.langName}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li><Link to="/askQuestion">Ask Question</Link></li>
                    </ul>
                </div>
                <Link to="/" className="text-xl cursor-pointer text-orange-400">
                    <img className="w-20 h-20" src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="font-extrabold text-slate-400">Home</Link></li>
                    <li>
                        <details>
                            <summary className=" font-extrabold text-slate-400">Tutorial</summary>
                            <ul className="p-2">
                                {languages.map((language) => (
                                    <li key={language._id}>
                                        <Link to={`/tutorialdetails/${language._id}`}>{language.langName}</Link>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                    <li><Link className=" font-extrabold text-slate-400" to="/questions">Ask Question</Link></li>
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user ?
                        <div className="flex space-x-3">

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            src={
                                                user && user.photoURL
                                                    ? user.photoURL
                                                    : `https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D`
                                            }
                                            alt="User's Profile"
                                        />

                                    </div>
                                </label>
                                <ul tabIndex={0} className="z-20 menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-base-100">

                                    {
                                        role?.role === 'admin' ?
                                            <>
                                                <li>
                                                    <Link to="/dashboard/addLanguage" className="justify-between">
                                                        Admin Panel
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/userdashboard/userCart" className="justify-between">
                                                        Profile
                                                        <span className="badge">New</span>
                                                    </Link>
                                                </li>
                                            </>
                                            :

                                            <li>
                                                <Link to="/userdashboard/userCart" className="justify-between">
                                                    Profile
                                                    <span className="badge">New</span>
                                                </Link>
                                            </li>
                                    }

                                    <li><button onClick={handelLogOut}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <Link to="/login" className={`hover:text-info hover:transition-colors text-xl font-extrabold hover:duration-500 ${location.pathname === '/signin' ? 'text-info' : ''}`}>Sign In</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;