import "./Navbar.css";
import Logo from "./logoPollit.jpg"
import React from "react";

class Navbar extends React.Component{
    state = { clicked: false, showLogin: false };

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };

    handleLoginClick = () => {
        this.setState({ showLogin: true });
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
                        <li onClick={this.handleLoginClick}>Login</li>
                        <li>Sign Up</li>
                    </ul>
                </div>
                <div id="mobile" onClick={this.handleClick}>
                    <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            </nav>
        </>
    )
}
}

export default Navbar