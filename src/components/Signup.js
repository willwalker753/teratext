import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './Signup.css';
import axios from 'axios';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
             username: '',
             password: '',
             repeatPassword: '',
             profilePic: 'https://github.com/willwalker753/organizing-your-react-code/blob/master/defaultProfilePic.png?raw=true',
             redirect: false,
             errorMessage: '',
             buttonMessage: 'Sign Up'
        }
    }  

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
        // If input is filled add animation class
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
                buttonMessage: 'Sign Up'
            })
        }
        else if(this.state.password  !== this.state.repeatPassword) {
            this.setState({
                errorMessage: 'Passwords do not match',
                buttonMessage: 'Sign Up'
            })
        }
        else if (/\s/.test(this.state.username)) {
            this.setState({
                errorMessage: 'Cannot have spaces in username',
                buttonMessage: 'Sign Up'
            })
        }
        else{
            let curUsername = this.state.username;
            curUsername = curUsername.toLowerCase();
            this.setState({username: curUsername});
            let url = 'https://tera-text-api.herokuapp.com/register';
            axios.post(url ,this.state)
            .then(response => {
                // If username is taken show error
                if((response.data[0].username === undefined)||(response.data === 'Account creation unsuccessful')){
                    this.setState({
                        errorMessage: 'Username is already taken',
                        buttonMessage: 'Sign Up'
                    })
                }
                // Else login and redirect to user page
                else if(response.status === 200){
                    window.localStorage.setItem('loggedIn', true)
                    window.localStorage.setItem('username', response.data[0].username)
                    window.localStorage.setItem('userID', response.data[0].id)
                    this.setState({ redirect: true })
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to connect to server',
                    buttonMessage: 'Sign Up'
                })
            })
        }
    }

    buttonHoverOn = e => {
        try {
            document.getElementById(e.target.id).className= 'signupButtonOn';            
        }
        catch {
            return;
        }
    }

    buttonHoverOff = e => {
        try {
            document.getElementById(e.target.id).className='signupButtonOff';  
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
                <h2 id='signupTeratext'><a href='/'>Teratext</a></h2>
                <form id='signupForm' onSubmit={ this.submitHandler }>
                    <input type='text' name='username' id='signupUsername' placeholder='Username' onChange={this.changeHandler}></input>
                    <input type='password' name='password' id='signupPassword' placeholder='Password' onChange={this.changeHandler}></input>
                    <input type='password' name='repeatPassword' id='signupRepPassword' placeholder='Repeat Password' onChange={this.changeHandler}></input>
                    <button type='submit' id='signupSubmit' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>{ this.state.buttonMessage }</button>
                </form>
                <div id='signupText'>
                    <p id='signupErrorMsg'>{ this.state.errorMessage }</p>
                    <p>Already have an account? Login <a href='/login'>here</a></p>
                </div>
                <div id='hiddenStaging'><i className="fas fa-spinner"></i></div>
            </div>
        )
    }
}
