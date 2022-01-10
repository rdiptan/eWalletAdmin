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

import Login from "./auth/Login";

function App() {
  const test=true;
  const authToken = localStorage.getItem("jwtToken");
  let config = {
    headers: {
      Authorization: `Bearer ${authToken}` 
    }
  }
  return (
    <>
      <Router>
        {test?
        <Header config={config} authToken={authToken}/>:null}
        <Routes>
           
          <Route path="/" element={test ?<Home /> :<Login/>} />
        
        
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/addfund" element={<AddFund />} />
          <Route path="/review" element={<Review />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
