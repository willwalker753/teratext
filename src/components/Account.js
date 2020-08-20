import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export default class Account extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            loggedIn: true
        }
    }  
    logoutHandler = e => {
        window.sessionStorage.clear();
        window.location.replace('/');
    }
    componentDidMount() {
        let loggedIn = window.sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.sessionStorage.getItem('username');
            this.setState({
                username: username
            });
        }
    }
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <a href='/user'>Back</a>
                <button onClick={ this.logoutHandler }>Logout</button>
                <form>
                    <label htmlFor='username'>Change username to</label>
                    <input type='text' name='username' placeholder='Demo'></input>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}
