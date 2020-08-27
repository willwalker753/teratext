import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './Login.css';
import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props)  
        this.state = {
             username: '',
             password: '',
             redirect: false,
             errorMessage: '',
             buttonMessage: 'Login'
        }
    }  
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = e => {
        this.setState({ 
            buttonMessage: 'Loading...',
            errorMessage: ''
        });
        e.preventDefault();
        if((this.state.username === '')||(this.state.password === '')||(this.state.repeatPassword === '')) {
            this.setState({
                errorMessage: 'Please enter a username and password',
                buttonMessage: 'Login'
            })
        }
        else{
            let url = 'https://tera-text-api.herokuapp.com/login';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessage: 'Incorrect username or password',
                        })
                    }
                    else{
                        window.sessionStorage.setItem('loggedIn', true)
                        window.sessionStorage.setItem('username', response.data[0].username)
                        window.sessionStorage.setItem('userID', response.data[0].id)
                        this.setState({ redirect: true })
                    }
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Incorrect username or password',
                })
            })
        }
    }
    render() {
        const { redirect } = this.state;
        if(redirect) {
            return <Redirect to='/user'/>;
        }
        return (
            <div>
                <a href='/'><h2>Teratext</h2></a>
                <form onSubmit={ this.submitHandler }>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' onChange={this.changeHandler}></input>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={this.changeHandler}></input>
                    <input type='submit' value={this.state.buttonMessage}></input>
                </form>
                <p>{ this.state.errorMessage }</p>
            </div>
        )
    }
}
