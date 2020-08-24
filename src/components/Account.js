import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import resizebase64 from 'resize-base64';
import axios from 'axios';
export default class Account extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            testRender: false,
            testUri: '',
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
        let url = 'http://localhost:8000/account/profilepic';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                console.log(response)
                //window.location.reload();
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to send your message',
            })
        })
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
                <a href='/user'>Back</a>
                <form id='pictureMessageForm'>  
                    <p>Change your profile picture</p>
                    <button id='pictureMessageInput'>
                    <i className="fas fa-camera"></i>
                        <FileBase64
                        multiple={ false }
                        onDone={ this.profilePic.bind(this) }   
                    />
                    </button>
                </form>
                <button onClick={ this.logoutHandler }>Logout</button>
            </div>
        )
    }
}
