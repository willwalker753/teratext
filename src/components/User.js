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
            friendArr: [],
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
                    response = response.data;
                    this.setState({
                        friendArr: response
                    })
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
                    {this.state.friendArr.map((friend, index) => (
                        <a key={index} href={'/user/message/'+friend.friendid+'/'+friend.friendusername} className='contactMessageLink'>
                            <div className='contactUserBox'>
                                <div className='contactUserBoxLeft'>
                                    <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' alt='placeholder'></img>
                                </div>
                                <div className='contactUserBoxRight'>
                                    <p className='contactMessageName'>{friend.friendusername}</p>
                                    <ul className='contactMessagePreview'>
                                        <li className='contactMessageText'>{friend.friendmessage}</li>
                                        <li className='contactMessageTime'>{friend.friendts}</li>
                                    </ul>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}
