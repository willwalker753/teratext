import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './Login.css';
import axios from 'axios';
export default class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
             username: '',
             password: '',
             redirect: false,
             errorMessage: '',
             buttonMessage: 'Login'
        }
    }  

    // Runs when login form is changed
    changeHandler = e => {
        // Save the current value of changed input to state
        this.setState({ [e.target.name]: e.target.value });
        // If the input is not empty add animation class
        if(e.target.value !== ''){
            document.getElementById(e.target.id).className='filled';
        }
        // If the input is empty add empty animation class
        else {
            document.getElementById(e.target.id).className='unfilled';
        }
    }

    // Runs when the form is submitted
    submitHandler = e => {
        // Render a loading spinner
        this.setState({ 
            buttonMessage: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
            errorMessage: ''
        });
        e.preventDefault();
        // If an input is empty show an error
        if((this.state.username === '')||(this.state.password === '')||(this.state.repeatPassword === '')) {
            this.setState({
                errorMessage: 'Please enter a username and password',
                buttonMessage: 'Login'
            })
        }
        else {
            let curUsername = this.state.username;
            curUsername = curUsername.toLowerCase();
            this.setState({username: curUsername});
            let url = 'https://tera-text-api.herokuapp.com/login';
            // Send request to server to attempt login
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    // If no account found show error
                    if((response.data === 'Account not found')||(response.data === '')){
                        this.setState({
                            errorMessage: 'Incorrect username or password',
                            buttonMessage: 'Login'
                        })
                    }
                    // Else save account info and redirect to user page
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

    // Runs when cursor enters button
    buttonHoverOn = e => {
        // Add animate on class to button
        try {
            document.getElementById(e.target.id).className= 'loginButtonOn';            
        }
        catch {
            return;
        }
    }

    // Runs when cursor leaves button
    buttonHoverOff = e => {
        // Add animate off class to button
        try {
            document.getElementById(e.target.id).className='loginButtonOff';  
        }
        catch {
            return;
        }
    }

    render() {
        const { redirect } = this.state;
        // If logged in successfully redirect to user page
        if(redirect) {
            return <Redirect to='/user'/>;
        }
        return (
            <div>
                <h2 id='loginTeratext'><a href='/'>Teratext</a></h2>
                <form id='loginForm' onSubmit={ this.submitHandler }>
                    <label class='hidden' for='loginUsername'>username</label>
                    <input type='text' name='username' id='loginUsername' placeholder='Username' onChange={this.changeHandler}></input>
                    <label class='hidden' for='loginPassword'>password</label>
                    <input type='password' name='password' id='loginPassword' placeholder='Password' onChange={this.changeHandler}></input>
                    <button type='submit' id='loginSubmit' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>{this.state.buttonMessage}</button>
                </form>
                <div id='loginText'>
                    <p id='loginErrorMsg'>{ this.state.errorMessage }</p>
                    <p>Need an account? Signup <a href='/signup'>here</a><br/><br/>The demo account credentials are<br/>username: <strong>dog</strong> and password: <strong>d</strong></p>
                </div> 
                {/* prep spinner in cache to get ready for use */}
                <div id='hiddenStaging'><i className="fas fa-spinner"></i></div>
            </div>
        )
    }
}
