import React, {Component} from "react";

import UserService from "../services/userService";
import AuthService from "../services/authService";
import CountryService from "../services/countryService";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {...AuthService.getCurrentUser(), countryList: []};
    }

    imageSrc = () => "data:image/gif;base64," + this.state.image;

    fullName = () => this.state.name + ' ' + this.state.lastName;

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    componentDidMount() {
        /*this.setState({name:this.state.currentUser.name})
        this.setState({name:this.state.currentUser.name})
        this.setState({name:this.state.currentUser.name})*/
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
    }

    render() {
        const {currentUser} = this.state;
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        {this.state.userName}-{this.fullName()}
                    </h3>
                </header>
                <div className="row">
                    <div className="col-sm-4">
                        <img src={this.imageSrc()}/>
                    </div>
                    <div className="col-sm-8">
                        <p>
                            <strong>Token:</strong>{" "}
                            {this.state.accessToken.substring(0, 20)} ...{" "}
                            {this.state.accessToken.substr(this.state.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Id:</strong>{" "}
                            {this.state._id}
                        </p>
                        <div className="form-row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="nationality"><strong>Name:</strong></label>
                            </div>
                            <div className="form-group col-sm-6">
                                <input name="name" className="form-control" type="text" value={this.state.name}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="nationality"><strong>Last Name:</strong></label>
                            </div>
                            <div className="form-group col-sm-6">
                                <input name="lastName" className="form-control" type="text" value={this.state.lastName}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="nationality"><strong>Email:</strong></label>
                            </div>
                            <div className="form-group col-sm-6">
                                <input name="email" className="form-control" type="text" value={this.state.email}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-sm-2">
                                <label htmlFor="nationality"><strong>Nationality:</strong></label>
                            </div>
                            <div className="form-group col-sm-6">
                                <select className="form-control" name="nationality" value={this.state.nationality._id}
                                        onChange={this.handleChange}>
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
                        </div>
                        <strong>Authorities:</strong>
                        <ul>
                            {this.state.roles &&
                            this.state.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                        <div className="form-group col-sm-8">
                            <button className="btn btn-primary btn-block">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}