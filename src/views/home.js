import React, {Component} from "react";

import UserService from "../services/userService";
import AuthService from "../services/authService";
import StatisticService from "../services/statisticService";
import {Bar, Line} from "react-chartjs-2";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            statistics: [],
            year: "2016"
        };
    }

    fullName = () => this.state.user.name + ' ' + this.state.user.lastName;

    chartData = () => {
        return {
            labels: this.state.statistics.filter(s => s.date.startsWith(this.state.year)).map(s => s.date),
            datasets: [
                {
                    label: 'Monthly Data',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.statistics.filter(s => s.date.startsWith(this.state.year)).map(s => s.mean)
                }
            ]
        }
    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    }

    componentDidMount() {
        let loggedInUser = AuthService.getCurrentUser();
        UserService.getUsersDetail(loggedInUser._id).then(
            response => {
                this.setState({
                    user: response
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
        StatisticService.getStatistics().then(
            response => {
                this.setState({
                    statistics: response
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

                <div className="form-group row">
                    <label htmlFor="year" className="col-form-label col-form-label-lg col-sm-1">Year:</label>
                    <div className="col-sm-2">
                        <select name="year" className="form-control form-control-lg" onChange={this.handleChange}>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Bar
                            data={this.chartData}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Line
                            data={this.chartData}
                        />
                    </div>
                </div>
            </div>
        );
    }
}