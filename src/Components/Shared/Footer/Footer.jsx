import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from "../../../assets/Logo/logo.png";
const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="mb-4 md:mb-0">
                        <img src={logo} alt="Not Found" className="h-24 w-24 mb-2" />
                    </div>
                    <div className="space-y-4">
                        <Link to="/home" className="block hover:text-pink-400">Home</Link>
                        <Link to="/about" className="block hover:text-pink-400">About</Link>
                        <Link to="/services" className="block hover:text-pink-400">Services</Link>
                        <Link to="/contact" className="block hover:text-pink-400">Contact</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-white">Follow us:</span>
                        <Link to="/" className="hover:text-pink-400">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link to="/" className="hover:text-pink-400">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="/" className="hover:text-pink-400">
                            <FontAwesomeIcon icon={faTiktok} />
                        </Link>

                    </div>
                </div>
            </div>
            <div className="divider text-orange-500"></div>
            <div className="bg-gray-900">
                <div className="text-center mx-auto p-4">
                    <p className="text-sm text-white">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
