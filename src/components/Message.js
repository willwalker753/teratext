import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Nav from './Nav';
import axios from 'axios';
import './Message.css';

let username = window.sessionStorage.getItem('username');
class Message extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            userId: '',
            friendId: null,
            friendUsername: '',
            messageArr: [],
            text: '',
            picture: [],
            loggedIn: true
        }
    }  
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = e => {
        e.preventDefault();
        e.target.value = '';
        if(this.state.text === ''){return}
        console.log(this.state.text)
        let url = 'http://localhost:8000/message/send';
        axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                this.setState({
                    text: ''
                })
                this.getMessages();
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to send your message',
            })
        })
    }
    async componentDidMount() {
        let loggedIn = window.sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let userId = window.sessionStorage.getItem('userID');
            let friendId = this.props.match.params.friendId;
            let friendUsername = this.props.match.params.friendUsername; 
            await this.setState({
                username: username,
                userId: userId,
                friendId: friendId,
                friendUsername: friendUsername
            });
        }
        this.getMessages();
        setInterval(this.getMessages, 2500);
    }
    getMessages = async () => {
        let url = 'http://localhost:8000/message/all';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                response = response.data.rows;
                for(let i=0; i<response.length; i++){
                    if(response[i].sender !== username){response[i].sender = 'received'}
                    else if(response[i].sender === username){response[i].sender = 'sent'}
                    let timeStamp = response[i].ts;
                    let timeStampDay = timeStamp.substring(8, 10);
                    let timeStampHour = timeStamp.substring(11, 13);
                    let timeStampMin = timeStamp.substring(13, 16);
                    let curDay = new Date().toString();
                    curDay = curDay.substring(8,10);
                    if(response[i].message === null) {
                        let tempMessage = <img src={response[i].picture} alt='message'/>;
                        response[i].message = tempMessage;
                    }
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
                        response[i].ts = timeStampHour + timeStampMin + ' ' + meridiem;
                    }
                    else if(timeStampDay !== curDay){
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
                        response[i].ts = timeStampHour + timeStampMin + ' ' + meridiem + ' ' + timeStampMonth + ' ' + timeStampDay;
                    }
                    if(response[i].ts === 'NaN NaN'){
                        response[i].ts = '';
                    }
                }
                this.setState({
                    messageArr: response
                })
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to find your messages',
            })
        })
    }
    async getFiles(picture){
        this.setState({ picture: picture })
        let url = 'http://localhost:8000/message/send/pic';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                window.location.reload();
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
        return (
            <div>
                <Nav page={'Message'} friendUsername={this.state.friendUsername}/>
                <div id='messages'>
                    <ul id='listOfMessages'>
                        {this.state.messageArr.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <li className={message.sender}>{message.message}</li>
                                <li className={message.sender+'Ts'}>{message.ts}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                    
                </div>
                <div id='messageForm'>
                    <form id='textForm' onSubmit={ this.submitHandler }>
                        <input type="text" id='textFormText' name='text' value={this.state.text} onChange={ this.changeHandler }></input>
                        <input type="submit" value='Send'></input>
                    </form>
                    <FileBase64
                        multiple={ false }
                        onDone={ this.getFiles.bind(this) } 
                    />
                </div>    
            </div>
        )
    }
}

//<form id='picForm'>
//                        <label htmlFor='picture'><i className="fas fa-camera"></i></label>
  //                      <input type="file" name='picture' accept="image/*" id="messageFileInput"></input>
    //                </form>
export default withRouter(Message);