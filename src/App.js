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
import Login from "./auth/Login";

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
            element={<Transaction auth_token={config} />}
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/blog" element={<Blog auth_token={config} />} />
          <Route path="/addfund" element={<AddFund />} />
          <Route path="/review" element={<Review auth_token={config} />} />
          <Route path="/profile" element={<Profile auth_token={config} />} />
          <Route path="/addblog" element={<AddBlog auth_token={config} />} />
          <Route path="/kyc" element={<KYC auth_token={config} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
