import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import UserService from "../services/userService";

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        //find all users
        UserService.getUsers().then(
            response => {
                //console.log(response)
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
        const {content} = this.state;

        return (
            <div className="col-md-12">
                <BootstrapTable data={content} pagination striped hover>
                    <TableHeaderColumn isKey dataField='userName'>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='createdAt'>Create Date</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}