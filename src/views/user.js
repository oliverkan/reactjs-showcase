import React, {Component} from "react";
import UserService from "../services/userService";
import AuthService from "../services/authService";



export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUsers().then(
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
            <div className="col-md-12">
                <div>User page</div>
                <p>{this.state.content}</p>
            </div>

        )
    }
}