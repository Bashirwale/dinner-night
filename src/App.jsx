import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Reservation from "./pages/Reservation";

const App = () => {
 
  return (
    <div className="h-full bg-gray-300" >
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/edit-profile/:uid" element={<EditProfile />} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/sign-in" element={<SignIn/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
