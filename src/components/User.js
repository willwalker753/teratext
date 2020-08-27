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
            let url = 'https://tera-text-api.herokuapp.com/user';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    response = response.data;
                    for(let i=0; i<response.length; i++){
                        if(response[i].friendmessage === null){
                            if(response[i].sender !== username){
                                response[i].friendmessage =  response[i].friendusername + ' sent a picture';
                            }
                            else{
                                response[i].friendmessage =  'You sent a picture';
                            }                           
                        }
                        let ts = response[i].friendts.toString();
                        let tsCharArr = Array.from(ts);
                        let month = null;
                        let day = null;
                        let hour= null;
                        let minute = null;
                        let meridiem = null;
                        let temp = '';
                        for(let i=0; i<tsCharArr.length; i++){
                            if(tsCharArr[i] === '/'){
                                if(month === null){
                                    month = temp;
                                    temp = '';
                                }
                                else if(day === null){
                                    day = temp;
                                    temp = '';
                                }
                            }
                            else if((tsCharArr[i] === ' ')||(tsCharArr[i] === ',')){
                                temp = '';
                            }
                            else if(tsCharArr[i] === ':'){
                                if(hour === null){
                                    hour = temp;
                                    temp = '';
                                }
                                else if(minute === null){
                                    minute = temp;
                                    temp = '';
                                }
                            }
                            else if(tsCharArr[i] === 'P'){
                                meridiem = 'PM'
                            }
                            else if(tsCharArr[i] === 'A'){
                                meridiem = 'AM'
                            }
                            else {
                                temp = temp + tsCharArr[i];
                            }
                        }
                        let tsCur = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
                        let tsCurCharArr = Array.from(tsCur);
                        let dayCur = '';
                        let met = false;
                        for(let i=0; i<6; i++){
                            if(tsCurCharArr[i] === '/'){
                                if(met === false){
                                    met = true;
                                }
                                else if(met === true){
                                    i = 6;
                                }
                            }
                            else if(met === true){
                                dayCur = dayCur + tsCurCharArr[i];
                            }
                        }

                        if(dayCur !== day) {
                            switch(month){
                                        case 1: 
                                            month = 'Jan';
                                            break;
                                        case 2: 
                                            month = 'Feb';
                                            break;
                                        case 3: 
                                            month = 'Mar';
                                            break;
                                        case 4: 
                                            month = 'Apr';
                                            break;
                                        case 5: 
                                            month = 'May';
                                            break;
                                        case 6: 
                                            month = 'Jun';
                                            break;
                                        case 7: 
                                            month = 'Jul';
                                            break;
                                        case 8: 
                                            month = 'Aug';
                                            break;
                                        case 9: 
                                            month = 'Sep';
                                            break;
                                        case 10: 
                                            month = 'Oct';
                                            break;
                                        case 11: 
                                            month = 'Nov';
                                            break;
                                        case 12: 
                                            month = 'Dec';
                                            break;
                                        default:
                                            break;
                            }
                            response[i].friendts = month + day;
                        }
                        if(dayCur === day) {
                            response[i].friendts = hour + ':' + minute + ' ' + meridiem;
                        }
                        if(response[i].friendmessage === 'No messages yet'){
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
                    <div id='userSpaceTop'></div>
                    {this.state.friendArr.map((friend, index) => (
                        <a key={index} href={'/user/message/'+friend.friendid+'/'+friend.friendusername} className='contactMessageLink'>
                            <div className='contactUserBox'>
                                <div className='contactUserBoxLeft'>
                                    <img src={friend.friendProfilePic} alt='friend profile'></img>
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
                    <p><a href='/user/friend'>Add a new friend here</a></p>
                </div>
            </div>
        )
    }
}
