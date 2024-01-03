import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-400 text-gray-700">
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="mb-4 md:mb-0">
                        <img src="/path/to/logo.png" alt="Not Found" className="h-12 w-12 mb-2" />
                        <span className="text-xl font-bold">Tech Learn</span>
                    </div>
                    <div className="space-y-4">
                        <Link to="/home" className="block hover:text-gray-800">Home</Link>
                        <Link to="/about" className="block hover:text-gray-800">About</Link>
                        <Link to="/services" className="block hover:text-gray-800">Services</Link>
                        <Link to="/contact" className="block hover:text-gray-800">Contact</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-500">Follow us:</span>
                        <Link to="/" className="hover:text-gray-800">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <Link to="/" className="hover:text-gray-800">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="/" className="hover:text-gray-800">
                            <FontAwesomeIcon icon={faTiktok} />
                        </Link>

                    </div>
                </div>
            </div>
            <div className="bg-gray-300">
                <div className="container mx-auto p-4">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
