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
        let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if(loggedIn) {
            this.setState({
                demoLogin: true
            })
        }  
        else if(viewportWidth > 599){
            try {
                document.getElementById('card1').className = 'homeCard card1OnLoad';
                document.getElementById('card2').className = 'homeCard card2OnLoad';
                document.getElementById('card3').className = 'homeCard card3OnLoad';
                document.getElementById('card4').className = 'homeCard card4OnLoad';
                setTimeout(function() {
                    document.getElementById('card1').className = 'homeCard cardLeave';
                },1000);
                setTimeout(function() {
                    document.getElementById('card3').className = 'homeCard cardLeave';
                },1400);
                setTimeout(function() {
                    document.getElementById('card2').className = 'homeCard cardLeave';
                },1800);
                setTimeout(function() {
                    document.getElementById('card4').className = 'homeCard cardLeave';
                },2200);
            }
            catch{
                return;
            }
        } 
        else if(viewportWidth < 600){
            try {
                setTimeout(function() {
                    document.getElementById('card1mob').className = 'showCard';
                },1000);
                setTimeout(function() {
                    document.getElementById('card2mob').className = 'showCard';
                },1400);
                setTimeout(function() {
                    document.getElementById('card3mob').className = 'showCard';
                },1800);
                setTimeout(function() {
                    document.getElementById('card4mob').className = 'showCard';
                },2200);
            }
            catch{
                return;
            }
        } 
        
    }
    cardLeave = e => {
        try {
            document.getElementById(e.target.id).className = 'homeCard cardLeave';
        }
        catch{
            return;
        }
        
    }
    render() {
        if(this.state.demoLogin){
            return <Redirect to='/user'/>
        }
        return (
            <div>
                <div id='mobileView'>
                    <h1 id='homeMobileTitle'>Teratext</h1>
                    <div id='mobileHomeAccount'>
                        <button id='demoButton' onClick={this.demoLogin}>{this.state.quickDemoText}</button>
                        <a href='/login'><button id='homeLoginButton'>Login</button></a>
                        <a href='/signup'><button id='homeSignupButton'>Sign Up</button></a>
                    </div>
                    <div id='mobileCardBox'>
                        <div id='card1mob' className=''>
                            <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card1.jpg?raw=true' alt='card1'></img>
                            <p>Teratext is a new secure chat app for you and your friends</p>
                        </div>
                        <div id='card2mob' className=''>
                            <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card2.jpg?raw=true' alt='card2'></img>
                            <p>You can add your friends by their username or by their friend code</p>
                        </div>
                        <div id='card3mob' className=''>
                            <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card3.jpg?raw=true' alt='card3'></img>
                            <p>Text your friends realtime even with pictures</p>
                        </div>
                        <div id='card4mob' className=''>
                            <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card4.jpg?raw=true' alt='card4'></img>
                            <p>You can change your profile picture and remove messages too</p>
                        </div>
                    </div>
                </div>
                
                <div id='desktopView'>
                    <div id='deskHomeHeader'>
                        <h1 id='homeTitle'>Teratext</h1>
                        <div>
                            <button id='demoButton' onClick={this.demoLogin}>{this.state.quickDemoText}</button>
                            <a href='/login'><button id='homeLoginButton'>Login</button></a>
                            <a href='/signup'><button id='homeSignupButton'>Sign Up</button></a>
                        </div>
                        
                    </div>
                    <div id='deskCardBox'>
                        <div id='card1' onMouseLeave={this.cardLeave}>
                            <div id='card1Inner' className='homeCard'>
                                <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card1.jpg?raw=true' alt='card1'></img>
                                <p>Teratext is a new secure chat app for you and your friends</p>
                            </div>
                        </div>
                        <div id='card2' onMouseLeave={this.cardLeave}>
                            <div id='card2Inner' className='homeCard'>
                                <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card2.jpg?raw=true' alt='card2'></img>
                                <p>You can add your friends by their username or by their friend code</p>
                            </div>
                        </div>
                        <div id='card3' onMouseLeave={this.cardLeave}>
                            <div id='card3Inner' className='homeCard'>
                                <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card3.jpg?raw=true' alt='card3'></img>
                                <p>Text your friends realtime even with pictures</p>
                            </div>
                        </div>
                        <div id='card4' onMouseLeave={this.cardLeave}>
                            <div id='card4Inner' className='homeCard'>
                                <img src='https://github.com/willwalker753/organizing-your-react-code/blob/master/card4.jpg?raw=true' alt='card4'></img>
                                <p>You can change your profile picture and remove messages too</p>
                            </div>
                        </div>
                    </div>
                    <div id='deskHomeFooter'></div>
                </div>
            </div>
        )
    }
}