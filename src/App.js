import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Registration from "./pages/Registration";
import Blog from "./pages/Blog";
import AddFund from "./pages/AddFund";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import AddBlog from "./pages/NewBlog";
import KYC from "./pages/KYC";
import UpdateBlog from "./pages/UpdateBlog";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  const authToken = localStorage.getItem("jwtToken");
  let config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  };
  return (
    <>
      <Router>
        {authToken ? <Header config={config} authToken={authToken} /> : null}
        <Routes>
          <Route path="/" element={authToken ? <Home /> : <Login />} />
          <Route
            path="/transaction"
            element={
              <PrivateRoute>
                <Transaction auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PrivateRoute>
                <Registration auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <PrivateRoute>
                <Blog auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/addfund"
            element={
              <PrivateRoute>
                {" "}
                <AddFund auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/review"
            element={
              <PrivateRoute>
                <Review auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="blog/blog/addblog"
            element={
              <PrivateRoute>
                <AddBlog auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="blog/updateblog/:id"
            element={
              <PrivateRoute>
                <UpdateBlog auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route
            path="/kyc"
            element={
              <PrivateRoute>
                <KYC auth_token={config} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
