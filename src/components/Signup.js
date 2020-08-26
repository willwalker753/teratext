import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './Signup.css';
import axios from 'axios';
export default class Signup extends Component {
    constructor(props) {
        super(props)  
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
                buttonMessage: 'Sign Up'
            })
        }
        else if(this.state.password  !== this.state.repeatPassword) {
            this.setState({
                errorMessage: 'Passwords do not match',
                buttonMessage: 'Sign Up'
            })
        }
        else{
            let url = 'https://tera-text-api.herokuapp.com/register';
            axios.post(url ,this.state)
            .then(response => {
                console.log(response);
                if(response.data[0].username === undefined){
                    this.setState({
                        errorMessage: 'Username is already taken',
                        buttonMessage: 'Sign Up'
                    })
                }
                else if(response.status === 200){
                    window.sessionStorage.setItem('loggedIn', true)
                    window.sessionStorage.setItem('username', response.data[0].username)
                    window.sessionStorage.setItem('userID', response.data[0].id)
                    this.setState({ redirect: true })
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to connect to server',
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
                    <label htmlFor='repeatPassword'>Repeat Password</label>
                    <input type='password' name='repeatPassword' onChange={this.changeHandler}></input>
                    <input type='submit' value={ this.state.buttonMessage }></input>
                </form>
                <p>{ this.state.errorMessage }</p>
            </div>
        )
    }
}
