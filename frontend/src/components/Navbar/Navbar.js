import Logo from "./logoPollit.jpg"
import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import CreatePoll from './CreatePoll';
import "./Navbar.css";

class Navbar extends Component{
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    constructor(props) {
        super(props);

        this.state = {
            clicked: false,
            loginModalShow: false,
            registerModalShow: false,
            createPollModalShow: false,
            isLoggedIn: false
        };
    }

    handleLoginModalShow = () => {
        this.setState({ loginModalShow: true });
    };

    handleLoginModalClose = () => {
        this.setState({ loginModalShow: false });
    };

    handleRegisterModalShow = () => {
        this.setState({ registerModalShow: true });
    };

    handleRegisterModalClose = () => {
        this.setState({ registerModalShow: false });
    };

    handleCreatePollModalShow = () => {
      this.setState({ createPollModalShow: true });
    };

    handleCreatePollModalClose = () => {
      this.setState({ createPollModalShow: false });
    };

    handleLogout = () => {
        this.setState({ isLoggedIn: false });
    };

    handleLoginSuccess = () => {
        this.setState({ isLoggedIn: true });
    };

    render() {
        const { clicked, loginModalShow, registerModalShow, createPollModalShow, isLoggedIn } = this.state;
    
        return (
          <>
            <nav>
              <a href="index.html">
                <img src={Logo} className="App-logo" alt="Logo" />
              </a>
              <div>
                {isLoggedIn ? (
                  <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                    <li onClick={this.handleCreatePollModalShow}>Create Poll</li>
                    <li onClick={this.handleLogout}>Log out</li>
                  </ul>
                ) : (
                  <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
                    <li onClick={this.handleLoginModalShow}>Login</li>
                    <li onClick={this.handleRegisterModalShow}>Register</li>
                  </ul>
                )}
              </div>
              <div id="mobile" onClick={this.handleClick}>
                <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
              </div>
            </nav>
            <Login
              show={loginModalShow}
              handleClose={this.handleLoginModalClose}
              onLoginSuccess={this.handleLoginSuccess} 
            />
            <Register show={registerModalShow} handleClose={this.handleRegisterModalClose} />
            <CreatePoll show={createPollModalShow} handleClose={this.handleCreatePollModalClose} />
          </>
        );
      }
    }
    
    export default Navbar;