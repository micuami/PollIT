import "./Navbar.css";
import Logo from "./logoPollit.jpg"
import {Component} from "react";


class Navbar extends Component{
    state={clicked: false};
    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render(){
    return(
        <>
            <nav>
                <a href="index.html">
                    <img src={Logo} className="App-logo" alt="Logo" />
                </a>
                <div>
                    <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                        <li><a className="active" href="index.html">Login</a></li>
                        <li><a href="index.html">Sign Up</a></li>
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