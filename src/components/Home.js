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
            <>
                <div id='homeHeader'>
                    <img id='lakeBkg' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/lake-bkg.jpg?raw=true' alt='lake background'/>
                    <img id='lakeOvr' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/lake-overlay-min.png?raw=true' alt='lake overlay'/>
                    <h1 id='homeTitle'>Teratext</h1>
                </div>
                <div id='homeDemoBox'>
                    <p>Sign in with a demo account here to try out all the features!</p>
                    <button id='demoButton' onClick={this.demoLogin}>Quick demo</button>
                </div>
                <div id='homeAbout'>
                    <img id='homeAboutPic' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/friend-campfire.jpg?raw=true' alt='friends campfire'/>
                    <p>
                        Teratext is a secure chat app with several key features.
                        You can add your friends, send and receive texts realtime including pictures, and customize your account.
                    </p>
                </div>
                <div id='homeButtonBox'>
                    <a href='/login'><button id='homeLoginButton'>Login</button></a>
                    <p>Let's go!</p>
                    <a href='/signup'><button id='homeSignupButton'>Sign Up</button></a>     
                </div>
                <footer id='homeFooter'></footer>
            </>
        )
    }
}
