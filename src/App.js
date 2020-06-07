import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import User from "./views/user";
import Profile from "./views/profile";

import AuthService from "./services/authService";
import MainMenu from "./components/mainMenu";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            AuthService.getCurrentUser() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }

    logOut = () => {
        AuthService.logout();
    }

    render() {
        const {currentUser} = this.state;
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            Etsoft Ltd
                        </Link>
                        <MainMenu/>
                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.userName}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route exact path="/register" component={Register} />
                            <PrivateRoute exact path={["/", "/home"]} component={Home} />
                            <PrivateRoute exact path={"/user"} component={User} />
                            <PrivateRoute exact path={"/profile"} component={Profile} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
