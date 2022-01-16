import React from 'react'
import { NavLink } from "react-router-dom";
import '../style/header.css'


function Header(props) {
    const [click, setClick] = React.useState(false);
    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("customerData");
        window.location.href = "/";
    }

    return (
        <div>
            <div className={click ? "main-container" : ""} onClick={() => Close()} />
            <nav className="navbar" onClick={e => e.stopPropagation()}>
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        eWallet
                    </NavLink>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/transaction"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Transaction
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/addfund"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Add Fund
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/blog"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Blog
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/review"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Review
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/profile"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/registration"
                                activeclassname="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Add Admin
                            </NavLink>
                        </li>
                        <li>
                        <button onClick={handleLogout} className="btn btn-outline-danger text-uppercase mb-2 rounded-pill shadow-sm">Logout</button>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </ div>
    );
}


export default Header