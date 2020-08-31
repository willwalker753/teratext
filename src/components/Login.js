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
        if(e.target.value !== ''){
            document.getElementById(e.target.id).className='filled';
        }
        else {
            document.getElementById(e.target.id).className='unfilled';
        }
    }
    submitHandler = e => {
        this.setState({ 
            buttonMessage: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
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
            let curUsername = this.state.username;
            curUsername = curUsername.toLowerCase();
            this.setState({username: curUsername});
            let url = 'https://tera-text-api.herokuapp.com/login';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response)
                    if((response.data === 'Account not found')||(response.data === '')){
                        this.setState({
                            errorMessage: 'Incorrect username or password',
                            buttonMessage: 'Login'
                        })
                    }
                    else{
                        window.localStorage.setItem('loggedIn', true)
                        window.localStorage.setItem('username', response.data[0].username)
                        window.localStorage.setItem('userID', response.data[0].id)
                        this.setState({ redirect: true })
                    }
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Incorrect username or password',
                    buttonMessage: 'Login'
                })
            })
        }
    }
    buttonHoverOn = e => {
        try {
            document.getElementById(e.target.id).className= 'loginButtonOn';            
        }
        catch {
            return;
        }
    }
    buttonHoverOff = e => {
        try {
            document.getElementById(e.target.id).className='loginButtonOff';  
        }
        catch {
            return;
        }
    }
    render() {
        const { redirect } = this.state;
        if(redirect) {
            return <Redirect to='/user'/>;
        }
        return (
            <div>
                <h2 id='loginTeratext'><a href='/'>Teratext</a></h2>
                <form id='loginForm' onSubmit={ this.submitHandler }>
                    <input type='text' name='username' id='loginUsername' placeholder='Username' onChange={this.changeHandler}></input>
                    <input type='password' name='password' id='loginPassword' placeholder='Password' onChange={this.changeHandler}></input>
                    <button type='submit' id='loginSubmit' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>{this.state.buttonMessage}</button>
                </form>
                <div id='loginText'>
                    <p id='loginErrorMsg'>{ this.state.errorMessage }</p>
                    <p>Need an account? Signup <a href='/signup'>here</a></p>
                </div> 
                <div id='hiddenStaging'><i className="fas fa-spinner"></i></div>
            </div>
        )
    }
}
