import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Nav from './Nav';
import FileBase64 from 'react-file-base64';
import resizebase64 from 'resize-base64';
import axios from 'axios';
import './Account.css'
export default class Account extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            userId: '',
            profilePic: '',
            testRender: false,
            testUri: '',
            loggedIn: true,
            deleteAccountMessage: 'Delete Account'
        }
        this.deleteAccount = this.deleteAccount.bind(this)
    }  
    logoutHandler = e => {
        window.localStorage.clear();
        window.location.replace('/');
    }
    async componentDidMount() {
        let loggedIn = window.localStorage.getItem('loggedIn');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.localStorage.getItem('username');
            let userId = window.localStorage.getItem('userID');
            await this.setState({
                username: username,
                userId: userId
            });
            let url = 'https://tera-text-api.herokuapp.com/account/profilepic/get';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        profilePic: response.data.rows[0].profilepic
                    })
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Incorrect username or password',
                })
            })
        }
    }
        
    async profilePic(picture){
        await this.setState({
            testRender: true,
            testUri: picture.base64
        })
        let testImageW = Math.floor((document.getElementById('testImage').width) / 4);
        let testImageH = Math.floor((document.getElementById('testImage').height) / 4);
        console.log(testImageW, testImageH)
        picture.base64 = resizebase64(picture.base64, testImageW, testImageH)
        this.setState({ 
            picture: picture,
            testRender: false,
            testUri: ''
        })
        let url = 'https://tera-text-api.herokuapp.com/account/profilepic/update';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                this.componentDidMount();
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to update your image',
            })
        })
    }
    async deleteAccount() {
        if(this.state.username === 'dog') {
            this.setState({
                deleteAccountMessage: "Can't delete a demo account"
            });
        }
        else if(this.state.deleteAccountMessage === 'Delete Account'){
            this.setState({
                deleteAccountMessage: 'Are you sure you want to delete everything?'
            });
        }
        else{
            let url = 'https://tera-text-api.herokuapp.com/account/delete';
            await axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        loggedIn: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to delete your account',
                })
            })
        }
    }
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        if(this.state.testRender) {
            return <img src={this.state.testUri}  id='testImage' alt='test'></img>
        }
        return (
            <div>
                <Nav page={'Account'} username={this.state.username}/>
                <img id='accountProfilePic' src={this.state.profilePic} alt='my profile'></img>
                <form id='pictureMessageForm'>  
                    <p>Change your profile picture</p>
                    <button id='pictureMessageInput'>
                    <i className="fas fa-images"></i>
                        <FileBase64
                        multiple={ false }
                        onDone={ this.profilePic.bind(this) }   
                    />
                    </button>
                </form>
                <button onClick={ this.logoutHandler }>Logout</button>
                <button onClick={ this.deleteAccount }>{this.state.deleteAccountMessage}</button>
            </div>
        )
    }
}
