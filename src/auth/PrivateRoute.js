import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    var isAuth; if (localStorage.getItem('jwtToken')) { isAuth = true } else { isAuth = false }
    return isAuth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
