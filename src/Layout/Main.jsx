import { Outlet, useLocation } from "react-router-dom";
import useLoading from "../Hooks/useLoadding";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";
import Hold from "../Components/Hold/Hold";
import { ToastContainer, toast } from 'react-toastify';

const Main = () => {
    const location = useLocation();
    console.log(location)
    const newLayout = location.pathname.includes('login') || location.pathname.includes('signup')
    const isLoading = useLoading(3000);

    return (
        <div>
            {isLoading ? <Hold/>: (
                <>
                    {newLayout || <Navbar />}
                    <div className="py-20">
                        <Outlet />
                    </div>
                    {newLayout || <Footer />}
                    <ToastContainer></ToastContainer>
                </>
            )}
        </div>
    );
};

export default Main;