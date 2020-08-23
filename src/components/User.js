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
                    for(let i=0; i<response.length; i++){
                        let timeStamp = response[i].friendts;
                        let timeStampDay = timeStamp.substring(8, 10);
                        let timeStampHour = timeStamp.substring(11, 13);
                        let timeStampMin = timeStamp.substring(13, 16);
                        let curDay = new Date().toString();
                        curDay = curDay.substring(8,10);
                        if(timeStampDay === curDay){
                            let meridiem = 'AM';
                            if(timeStampHour > '12'){
                                meridiem = 'PM';
                                timeStampHour = (timeStampHour - 12).toString();
                            }
                            else if(timeStampHour === '12'){
                                meridiem = 'PM';
                            }
                            else if(timeStampHour === '00'){
                                timeStampHour = '12';
                            }
                            else if((timeStampHour < '10')&&(timeStampHour > '00')){
                                timeStampHour = timeStampHour.substring(1,2);
                            }
                            response[i].friendts = timeStampHour + timeStampMin + ' ' + meridiem;
                        }
                        else if(timeStampDay !== curDay){
                            let timeStampMonth = timeStamp.substring(5,7);
                            timeStampMonth = parseInt(timeStampMonth, 10);
                            switch(timeStampMonth){
                                case 1: 
                                    timeStampMonth = 'Jan';
                                    break;
                                case 2: 
                                    timeStampMonth = 'Feb';
                                    break;
                                case 3: 
                                    timeStampMonth = 'Mar';
                                    break;
                                case 4: 
                                    timeStampMonth = 'Apr';
                                    break;
                                case 5: 
                                    timeStampMonth = 'May';
                                    break;
                                case 6: 
                                    timeStampMonth = 'Jun';
                                    break;
                                case 7: 
                                    timeStampMonth = 'Jul';
                                    break;
                                case 8: 
                                    timeStampMonth = 'Aug';
                                    break;
                                case 9: 
                                    timeStampMonth = 'Sep';
                                    break;
                                case 10: 
                                    timeStampMonth = 'Oct';
                                    break;
                                case 11: 
                                    timeStampMonth = 'Nov';
                                    break;
                                case 12: 
                                    timeStampMonth = 'Dec';
                                    break;
                                default:
                                    break;
                            }
                            timeStampDay = parseInt(timeStampDay, 10);        
                            response[i].friendts = timeStampMonth + ' ' + timeStampDay;
                        }
                        if(response[i].friendts === 'NaN NaN'){
                            response[i].friendts = '';
                        }
                    }
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
