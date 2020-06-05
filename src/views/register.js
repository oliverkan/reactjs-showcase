import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import CountryService from "../services/countryService"
import AuthService from "../services/authService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            email: "",
            name: "",
            lastName: "",
            password: "",
            selectedRole:"",
            successful: false,
            message: "",
            countryList: [],
            roleList:[]
        };
    }

    componentDidMount() {
        CountryService.getCountryList().then(
            response => {
                this.setState({
                    countryList: response
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

        AuthService.getRoles().then(
            response => {
                this.setState({
                    roleList: response
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

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    handleRegister = (e) => {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.userName,
                this.state.email,
                this.state.password,
                this.state.name,
                this.state.lastName,
                this.state.nationality,
                this.state.roles
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="userName">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="userName"
                                        value={this.state.userName}
                                        onChange={this.handleChange}
                                        validations={[required, vusername]}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={this.state.Name}
                                            onChange={this.handleChange}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleChange}
                                            validations={[required, vusername]}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        validations={[required, email]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nationality">Nationality</label>
                                    <select className="form-control" name="nationality" onChange={this.handleChange}>
                                        <option>Select Item</option>
                                        {
                                            this.state.countryList.map((data) =>
                                            <option key={data._id} value={data._id}>
                                                {data.name}
                                            </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="roles">Role</label>
                                    <select className="form-control" name="roles" onChange={this.handleChange}>
                                        <option>Select Item</option>
                                        {
                                            this.state.roleList.map((data) =>
                                                <option key={data._id} value={data._id}>
                                                    {data.name}
                                                </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}