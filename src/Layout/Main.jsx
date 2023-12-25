import { Outlet, useLocation } from "react-router-dom";
import useLoading from "../Hooks/useLoadding";
import Navbar from "../Components/Shared/Navbar/Navbar";
import Footer from "../Components/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    console.log(location)
    const newLayout = location.pathname.includes('login') || location.pathname.includes('signup')
    const isLoading = useLoading(100);

    return (
        <div>
            {isLoading ? "🚀 Launching the experience, please wait.." : (
                <>
                    {newLayout || <Navbar />}
                    <div className="py-20">
                        <Outlet />
                    </div>
                    {newLayout || <Footer />}
                </>
            )}
        </div>
    );
};

export default Main;