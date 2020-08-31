import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            demoLogin: false,
            quickDemoText: 'Quick demo'
        };
        this.demoLogin = this.demoLogin.bind(this)
      }
    async demoLogin() {
        this.setState({
            quickDemoText: <i className="fas fa-spinner"></i>
        })
        const reqBody = {
            "username": "dog",
            "password": "d"
        }
        let url = 'https://tera-text-api.herokuapp.com/login';
        await axios.post(url, reqBody)
        .then(response => {
            if(response.status === 200){
                window.localStorage.clear();
                window.localStorage.setItem('loggedIn', true);
                window.localStorage.setItem('username', response.data[0].username);
                window.localStorage.setItem('userID', response.data[0].id);
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
    componentDidMount() {
        let loggedIn = window.localStorage.getItem('loggedIn');
        if(loggedIn) {
            this.setState({
                demoLogin: true
            })
        }       
    }
    render() {
        if(this.state.demoLogin){
            return <Redirect to='/user'/>
        }
        return (
            <>
            <div id='mobileView'>
                <div id='homeHeader'>
                    <img id='lakeBkg' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/lake-bkg.jpg?raw=true' alt='lake background'/>
                    <img id='lakeOvr' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/lake-overlay-min.png?raw=true' alt='lake overlay'/>
                    <h1 id='homeTitle'>Teratext</h1>
                </div>
                <div id='homeDemoBox'>
                    <p>Login with a demo account here to try out all our features!</p>
                    <button id='demoButton' onClick={this.demoLogin}>{this.state.quickDemoText}</button>
                </div>
                <div id='homeAbout'>
                    <img id='homeAboutPic' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/friend-campfire.jpg?raw=true' alt='friends campfire'/>
                    <p id='homeAbout1'>
                        Teratext is a secure new chat app for you and your friends. 
                    </p>
                    <img id='homeAboutPic2' src='https://github.com/willwalker753/organizing-your-react-code/blob/master/phone.jpg?raw=true' alt='phone'/>
                    <p id='homeAbout2'>
                    You can add your friends, send and receive texts realtime including pictures, customize your profile picture, and much more.
                    </p>
                    
                </div>
                <div id='homeButtonBox'>
                    <a href='/login'><button id='homeLoginButton'>Login</button></a>
                    <p>Let's go!</p>
                    <a href='/signup'><button id='homeSignupButton'>Sign Up</button></a>     
                </div>
                <footer id='homeFooter'>
                    <p>Any comments or questions about the site can be directed to <a href='mailto:willwalker@email.com'>willwalker@email.com</a></p>
                </footer>
            </div>
            <div id='desktopView'>
                <div id='deskHomeHeader'>
                    <h1 id='homeTitle'>Teratext</h1>
                </div>
                <div id='deskCardBox'>
                    <div id='card1'>
                        <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card1.jpg?raw=true' alt='card1'></img>
                        <p>Teratext is a new secure chat app for you and your friends</p>
                    </div>
                    <div id='card2'>
                        <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card2.jpg?raw=true' alt='card2'></img>
                        <p>You can add your friends by their username or by their friend code</p>
                    </div>
                    <div id='card3'>
                        <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card3.jpg?raw=true' alt='card3'></img>
                        <p>Texting is supported realtime including pictures to both parties</p>
                    </div>
                    <div id='card4'>
                        <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card4.jpg?raw=true' alt='card4'></img>
                        <p>You can change your profile picture and remove messages too</p>
                    </div>
                </div>
            </div>
            </>
        )
    }
}