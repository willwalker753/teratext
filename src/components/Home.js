import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import { Redirect } from 'react-router-dom';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {demoLogin: false};
        this.demoLogin = this.demoLogin.bind(this)
      }
    async demoLogin() {
        //console.log(e.target.id);
        const reqBody = {
            "username": "dog",
            "password": "d"
        }
        let url = 'https://tera-text-api.herokuapp.com/login';
        await axios.post(url, reqBody)
        .then(response => {
            if(response.status === 200){
                window.sessionStorage.clear();
                window.sessionStorage.setItem('loggedIn', true);
                window.sessionStorage.setItem('username', response.data[0].username);
                window.sessionStorage.setItem('userID', response.data[0].id);
                this.setState({
                    demoLogin: true
                });
            }
        })
        .catch(error => {
            this.setState({
                errorMessageCode: 'Trouble connecting to server',
            })
        })
    }
    render() {
        if(this.state.demoLogin){
            return <Redirect to='/user'/>
        }
        return (
            <div>
                <h1>Teratext</h1>
                <a href='/login'><button>Login</button></a>
                <a href='/signup'><button>Sign Up</button></a> 
                <button id='demoButton' onClick={this.demoLogin}>Quick demo</button>   
            </div>
        )
    }
}
