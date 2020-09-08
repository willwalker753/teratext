import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Nav from './Nav';
import FileBase64 from 'react-file-base64';
import resizebase64 from 'resize-base64';
import axios from 'axios';
import './Account.css';
export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userId: '',
            profilePic: '',
            testRender: false,
            testUri: '',
            loggedIn: true,
            deleteAccountMessage: 'Delete Account'
        }
        this.deleteAccount = this.deleteAccount.bind(this);
    }  
    // Runs when logout button clicked
    logoutHandler = e => {
        // Remove the loggedin true variable from localstorage then redirect to home page
        window.localStorage.clear();
        window.location.replace('/');
    }

    async componentDidMount() {
        let loggedIn = window.localStorage.getItem('loggedIn');
        // If not logged in then redirect to home page 
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        // Else send request to API for user profile pic
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
                    // If successful save response picture to state
                    this.setState({
                        profilePic: response.data.rows[0].profilepic
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Incorrect username or password',
                });
            });
        }
    }
        
    // Runs when button clicked to change profile pic
    async profilePic(picture) {
        // Temporarily renders the chosen picture
        await this.setState({
            testRender: true,
            testUri: picture.base64
        });
        // Get the chosen pictures dimensions
        let testImageW = Math.floor((document.getElementById('testImage').width) / 4);
        let testImageH = Math.floor((document.getElementById('testImage').height) / 4);
        // Resize the profile pic to save space and convert to base64
        picture.base64 = resizebase64(picture.base64, testImageW, testImageH);
        this.setState({ 
            picture: picture,
            testRender: false,
            testUri: ''
        });
        let url = 'https://tera-text-api.herokuapp.com/account/profilepic/update';
        // Send the picture to the API to save to account
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                // If successful then refresh the profile through componentDidMount
                this.componentDidMount();
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to update your image',
            });
        });
    }

    // Runs when button clicked to delete account
    async deleteAccount() {
        // If logged in as demo account dont allow delete
        if(this.state.username === 'dog') {
            this.setState({
                deleteAccountMessage: "Can't delete a demo account"
            });
        }
        // If first time clicking ask to confirm
        else if(this.state.deleteAccountMessage === 'Delete Account') {
            this.setState({
                deleteAccountMessage: 'Are you sure you want to delete everything?'
            });
        }
        // Else send request to API to delete account
        else{
            let url = 'https://tera-text-api.herokuapp.com/account/delete';
            await axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200) {
                    // If successful then go to home screen
                    this.setState({
                        loggedIn: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to delete your account',
                });
            });
        }
    }

    // Runs hen cursor enters button
    buttonHoverOn = e => {
        // Add animation on class to button
        try {
            document.getElementById(e.target.id).className= 'buttonOn';            
        }
        // If moving too quickly and error return doing nothing
        catch {
            return;
        }
    }

    // Runs when cursor leaves button
    buttonHoverOff = e => {
        // Add animation off class to button
        try {
            document.getElementById(e.target.id).className='buttonOff';  
        }
        // If moving too quickly and error return doing nothing
        catch {
            return;
        }
    }

    render() {
        // If not logged in return to home
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        // If checking dimensions of new profile pic render the new picture
        if(this.state.testRender) {
            return <img src={this.state.testUri}  id='testImage' alt='test'></img>
        }
        return (
            <div>
                <Nav page={'Account'} username={this.state.username}/>
                <div id='accountFlexboxTop'>
                    <img id='accountProfilePic' src={this.state.profilePic} alt='my profile'></img>
                    <form id='pictureMessageForm'>  
                        <button id='pictureMessageInput' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>
                        <i title='image input' className="fas fa-images"></i>
                            <FileBase64
                            multiple={ false }
                            onDone={ this.profilePic.bind(this) }   
                        />
                        </button>
                    </form>
                </div>   
                <div id='accountFlexboxBottom'>      
                    <button onClick={ this.logoutHandler } id='accountLogOut' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>Logout</button>             
                    <button onClick={ this.deleteAccount } id='accountDelete' onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>{this.state.deleteAccountMessage}</button>                    
                </div>
            </div>
        )
    }
}
