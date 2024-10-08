import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/auth";
import { doSignOut } from "../firebase/auth";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoTicketSharp } from "react-icons/io5";
import { PiSpinnerBallFill } from "react-icons/pi";


const Navbar = () => {
    useGSAP(() => {
        gsap.from(".Navmenu", {
            y: -100,
            ease: "power4.inOut",
            duration: 2,
        });
        gsap.from(".navbarAll", {
            y: -100,
            ease: "power4.inOut",
            duration: 2,
        });
    }, []);

    const [toggleSidebar, setToggleSidebar] = useState(false); //Show menu property for mobile devices.

    const { currentUser, userLoggedIn, isAdmin } = useAuth(); 

    const navigate = useNavigate();

    
    const showMenu = (e) => {
        e.preventDefault();
        setToggleSidebar((prev) => !prev);
    };

    const handleLinkClick = () => { // If user clicks the link hide sidebar.
        setToggleSidebar(false);
    };

    const handleLogOut = async () => {
        await doSignOut();
    };

    const redicertHomepage = () => {
        navigate("/");
    };

    return (
        <div>
            <div className="navbar bg-transparent navbarAll">
                <div className="brand" onClick={redicertHomepage}>
                    <h2>CineWave</h2>
                </div>
                <i className="bi bi-list" onClick={showMenu}></i>
            </div>
            <div className={`container-fluid Navmenu`}>
                <Link to="/">Homepage</Link>
                <Link to="/vision">Vision Movies</Link>
                <Link to="/soon">Coming Soon</Link>
                <Link to="/contact">Contact</Link>
                <Link>
                    {userLoggedIn && (
                        <>
                        <Link to="/tickets">
                            <IoTicketSharp
                                style={{ fontSize: "1.2rem" }}
                                className="ticket-icon"
                            />
                        </Link>
                        <Link to="/wheel">
                            <PiSpinnerBallFill
                                style={{ fontSize: "1.2rem" }}
                                className="spinner-icon"
                            />
                        </Link>
                        </>
                    )}
                </Link>
                <Link to="/profile">
                    <i className="bi bi-person-fill"></i>
                </Link>
            </div>
            <div
                className={`container-fluid menu ${
                    toggleSidebar ? "active" : ""
                }`}
                id="sidebarMenu"
            >
                <Link to="/" onClick={handleLinkClick}>
                    Homepage
                </Link>
                <Link to="/vision" onClick={handleLinkClick}>
                    Vision Movies
                </Link>
                <Link to="/soon" onClick={handleLinkClick}>
                    Coming Soon
                </Link>
                <Link to="/contact" onClick={handleLinkClick}>
                    Contact
                </Link>
                {
                    !userLoggedIn && (  
                        <Link to="/login" onClick={handleLinkClick}>
                        Login
                        </Link>
                    )
                }
              
                {
                    userLoggedIn && (
                        <>
                        <Link to="/tickets" onClick={handleLinkClick}>
                        My Tickets
                        </Link>
                        <Link to="/profile" onClick={handleLinkClick}>
                        Profile
                        </Link>
                        </>
                    )
                }
               
            </div>
        </div>
    );
};

export default Navbar;
