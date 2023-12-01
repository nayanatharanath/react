import React, { useEffect, useState, Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import {
  FaDoorClosed,
  FaLockOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaShopify,
  FaUserCircle,
} from "react-icons/fa";
import logo from "./logo.svg";
import { ToastContainer } from "react-toastify";
import AuthService from "./services/auth.service";
import "./App.css";
// import Footer from "./Footer/Footer";
import EventBus from "./common/EventBus";
import Login from "./pages/login.component";
import Home from "./products/Home";
import Register from "./pages/register.component";
//import Profile from "./components/Profile";
import { useNavigate } from "react-router-dom";
import { AdminDashBoard } from "./pages/AdminDashBoard";
import ListMentorcomponent from "./components/ListMentorcomponent";
import HeaderComponent from "./components/HeaderComponent";
import Footercomponent from "./components/Footercomponent";
import AddMentorComponent from "./components/AddMentorComponent";
import UpdateMentorComponent from "./components/UpdateMentorComponent";
import ListCourseComponent from "./components/ListCourseComponent";
import AddCourseComponent from "./components/AddCourseComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showMentorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      // navigate: useNavigate,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showMentorBoard: user.roles.includes("mentor"),
        showAdminBoard: user.roles.includes("admin"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showMentorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showMentorBoard, showAdminBoard } = this.state;
    // const bgStyle = {
    //   backgroundImage: `url("https://i.pinimg.com/564x/92/15/b3/9215b37c5e0494c680aaeef279559510.jpg")`,
    //   backgroundPosition: "center",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "no-repeat",
    //   height: "100%",
    // };

    return (
      // <div>
      //   <nav className="navbar navbar-expand navbar-transparent bg-transparent">
      //     <img
      //       src="favicon.ico"
      //       alt=""
      //       width={30}
      //       height={30}
      //       style={{ marginLeft: "10px", marginRight: "10px" }}
      //     ></img>
      //     <Link
      //       to={"/About"}
      //       className="navbar-brand"
      //       style={{
      //         color: "White",
      //         fontSize: "30px",
      //         fontFamily: "Macchiato",
      //       }}
      //     >
      //       FlyHigh
      //     </Link>
      //     <div className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link
      //           to={"/home"}
      //           className="nav-link"
      //           style={{ color: "White" }}
      //         >
      //           Home
      //         </Link>
      //       </li>

      //       {showMentorBoard && (
      //         <li className="nav-item">
      //           <Link
      //             to={"/mod"}
      //             className="nav-link"
      //             style={{ color: "White" }}
      //           >
      //             Mentor Board
      //           </Link>
      //         </li>
      //       )}

      //       {showAdminBoard && (
      //         <li className="nav-item">
      //           <Link
      //             to={"/AdminPortal"}
      //             className="nav-link"
      //             style={{ color: "White" }}
      //           >
      //             Admin
      //           </Link>
      //         </li>
      //       )}

      //       {currentUser && (
      //         <li className="nav-item">
      //           <Link
      //             to={"/user"}
      //             className="nav-link"
      //             style={{ color: "White" }}
      //           >
      //             User
      //           </Link>
      //         </li>
      //       )}
      //     </div>

      //     {currentUser ? (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link
      //             to={"/profile"}
      //             className="nav-link"
      //             style={{ color: "White" }}
      //           >
      //             {currentUser.username}
      //           </Link>
      //         </li>
      //         <li
      //           className="nav-item"
      //           style={{ textAlign: "right", color: "white" }}
      //         >
      //           <a href="/login" className="nav-link" onClick={this.logOut}>
      //             LogOut
      //           </a>
      //         </li>
      //       </div>
      //     ) : (
      //       <div className="navbar-nav ml-auto">
      //         <li className="nav-item">
      //           <Link
      //             to={"/login"}
      //             className="nav-link"
      //             style={{ color: "White", textAlign: "left" }}
      //           >
      //             Login
      //           </Link>
      //         </li>

      //         <li className="nav-item">
      //           <Link
      //             to={"/signup"}
      //             className="nav-link"
      //             style={{ color: "White" }}
      //           >
      //             Sign Up
      //           </Link>
      //         </li>
      //       </div>
      //     )}
      //   </nav>

      <div className="container mt-3">
        <ToastContainer position="bottom-center" />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
          <Route path="/mentor" element={<ListMentorcomponent />} />
          <Route path="/add-mentor" element={<AddMentorComponent />} />
          <Route path="/edit-mentor/:id" element={<AddMentorComponent />} />
          <Route path="/course" element={<ListCourseComponent />} />
          <Route path="/add-course" element={<AddCourseComponent />} />
          <Route path="/edit-course/:id" element={<AddCourseComponent />} />
        </Routes>
      </div>
      // </div>
    );
  }
}

export default App;
