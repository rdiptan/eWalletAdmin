import React from 'react'
import { Link } from "react-router-dom";
import '../style/header.css'

const Header = (props) => {
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("adminData");
        window.location.href = "/";
    }
    return (
        <>
            <nav className="nav">
                <div className="container">
                    <div className="logo">
                        <Link to='/home'>Your Logo</Link>
                    </div>
                    <div id="mainListDiv" className="main_list">
                        <ul className="navlinks">
                            <li><Link to='/transaction'>Transaction</Link></li>
                            <li><Link to='/addfund'>Add Fund</Link></li>
                            <li><Link to='/review'>Review</Link></li>
                            <li><Link to='/blog'>Blog</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/registration'>Add Account</Link></li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                    <span className="navTrigger">
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Header 