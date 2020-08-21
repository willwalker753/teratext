import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Nav from './Nav';
import axios from 'axios';
import './User.css';

export default class User extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            userId: '',
            friendUsername: [],
            friendId: [],
            friendMessage: [],
            friendTs: [],
            loggedIn: true
        }
    }  
    async componentDidMount() {
        let loggedIn = window.sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.sessionStorage.getItem('username');
            let userId = window.sessionStorage.getItem('userID');
            await this.setState({
                username: username,
                userId: userId
            });
            let url = 'http://localhost:8000/user';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response)
                    response = response.data;
                    let tempFriendUsername = [];
                    let tempFriendId = [];
                    let tempFriendMessage = [];
                    let tempFriendTs = [];
                    for(let i=0;i<response.length;i++){
                        tempFriendUsername[i] = response[i].friendusername;
                        tempFriendId[i] = response[i].friendid;
                        tempFriendMessage[i] = response[i].friendmessage;
                        tempFriendTs[i] = response[i].friendts;
                    }
                    this.setState({
                        friendUsername: tempFriendUsername,
                        friendId: tempFriendId,
                        friendMessage: tempFriendMessage,
                        friendTs: tempFriendTs
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to retrieve friends list',
                })
            })
        }
    }
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Nav page={'User'} username={this.state.username}/>
                <div>
                    <a href='/user/message/1' className='contactMessageLink'>
                        <div className='contactUserBox'>
                            <div className='contactUserBoxLeft'>
                                <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' alt='placeholder'></img>
                            </div>
                            <div className='contactUserBoxRight'>
                                <p className='contactMessageName'>Barry</p>
                                <ul className='contactMessagePreview'>
                                    <li className='contactMessageText'>How are you</li>
                                    <li className='contactMessageTime'>1:48 PM</li>
                                </ul>
                            </div>
                        </div>
                    </a>
                    <a href='/user/message/2' className='contactMessageLink'>
                        <div className='contactUserBox'>
                            <div className='contactUserBoxLeft'>
                                <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' alt='placeholder'></img>
                            </div>
                            <div className='contactUserBoxRight'>
                                <p className='contactMessageName'>Perry</p>
                                <ul className='contactMessagePreview'>
                                    <li className='contactMessageText'>What are you doing tonight</li>
                                    <li className='contactMessageTime'>12:14 PM</li>
                                </ul>
                            </div>
                        </div>
                    </a>
                    <a href='/user/message/3' className='contactMessageLink'>
                        <div className='contactUserBox'>
                            <div className='contactUserBoxLeft'>
                                <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' alt='placeholder'></img>
                            </div>
                            <div className='contactUserBoxRight'>
                                <p className='contactMessageName'>Mary</p>
                                <ul className='contactMessagePreview'>
                                    <li className='contactMessageText'>How are you doing today?</li>
                                    <li className='contactMessageTime'>10:09 AM</li>
                                </ul>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}
