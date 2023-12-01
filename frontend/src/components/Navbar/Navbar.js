import Logo from "./logoPollit.jpg"
import React, { Component } from 'react';
import Register from './Register';
import Login from './Login';
import "./Navbar.css";

class Navbar extends Component{
    state = { clicked: false, showLogin: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    constructor(props) {
        super(props);

        this.state = {
            loginModalShow: false,
            registerModalShow: false
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

    render(){
    return(
        <>
            <nav>
                <a href="index.html">
                    <img src={Logo} className="App-logo" alt="Logo" />
                </a>
                <div>
                    <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <li onClick={this.handleLoginModalShow}>Login</li>
                    <li onClick={this.handleRegisterModalShow}>Register</li>
                    </ul>
                </div>
                <div id="mobile" onClick={this.handleClick}>
                    <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            </nav>
            <Login show={this.state.loginModalShow} handleClose={this.handleLoginModalClose} />
            <Register show={this.state.registerModalShow} handleClose={this.handleRegisterModalClose} />
        </>
    )
}
}

export default Navbar