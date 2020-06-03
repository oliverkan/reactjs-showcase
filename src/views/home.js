import React, {Component} from "react";

import UserService from "../services/userService";
import AuthService from "../services/authService";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    fullName = () => this.state.content.name + ' ' + this.state.content.lastName;

    componentDidMount() {
        let loggedInUser = AuthService.getCurrentUser();
        UserService.getUsersDetail(loggedInUser.id).then(
            response => {
                this.setState({
                    content: response
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Welcome {this.fullName()}</h3>
                    <p>This a demo project. you can update your details, create new user and delete an other user.</p>
                </header>
            </div>
        );
    }
}