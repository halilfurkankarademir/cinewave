import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import Vision from "./pages/Vision";
import ComingSoon from "./pages/soon/ComingSoon";
import SelectSeat from "./pages/SelectSeat"
import Payment from "./pages/payment/Payment";
import PaymentComplete from "./pages/payment/PaymentComplete";
import MovieDetail from "./pages/MovieDetail";
import Login from "./components/auth/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ManageMovies from "./pages/Admin/ManageMovies"
import AddMovie from "./pages/Admin/AddMovie";
import Upcoming from "./pages/Admin/Upcoming";
import { AuthProvider } from "./context/auth";
import { HashRouter, Route, Routes } from "react-router-dom";
import Contact from "./pages/contact/Contact";


const Wrapper = () => {
    return (
        <AuthProvider>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/vision" element={<Vision />} />
                        <Route path="/soon" element={<ComingSoon />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/select-seat/:id" element={<SelectSeat />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/paymentcomplete" element={<PaymentComplete />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/addmovie" element={<AddMovie />} />
                        <Route path="/admin/manage" element={<ManageMovies />} />
                        <Route path="/admin/upcoming" element={<Upcoming />} />
                    </Routes>
                </HashRouter>
        </AuthProvider>
    );
};

function App() {
    return (
        <div className="App">
            <Wrapper />
        </div>
    );
}

export default App;
