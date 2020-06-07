import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthService from "../services/authService";


export default class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            showAdminBoard: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    render() {
        const {showAdminBoard} = this.state;
        return (
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>

                {showAdminBoard && (
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                            User
                        </Link>
                    </li>
                )}
            </div>
        );
    }
}