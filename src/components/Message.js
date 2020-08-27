import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import FileBase64 from 'react-file-base64';
import Nav from './Nav';
import axios from 'axios';
import resizebase64 from 'resize-base64';
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
            sendButton: <i className="fas fa-paper-plane"></i>,
            sendPicButton: <i className="fas fa-camera"></i>,
            messageArr: [],
            text: '',
            picture: [],
            numOfMessages: 0,
            loggedIn: true,
            testRender: false,
            testUri: '',
            friendProfilePic: ''
        }
    }  
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitHandler = e => {
        e.preventDefault();
        e.target.value = '';
        if(this.state.text === ''){return}
        this.setState({ sendButton: <i className="fas fa-spinner"></i> })
        console.log(this.state.text)
        let url = 'https://tera-text-api.herokuapp.com/message/send';
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
            let url = 'https://tera-text-api.herokuapp.com/message/profilepic';
            await axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response)
                    this.setState({
                        friendProfilePic: response.data.profilepic
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Unable to send your message',
                })
            })
        }
        this.getMessages();
        setInterval(this.getMessages, 2500);
    }
    getMessages = async () => {
        let url = 'https://tera-text-api.herokuapp.com/message/all';
        let body = {username: this.state.username, userId: this.state.userId, friendUsername: this.state.friendUsername, friendId: this.state.friendId, numOfMessages: this.state.numOfMessages}
        await axios.post(url , body)
        .then(response => {
            if(response.status === 200){
                this.setState({ sendButton: <i className="fas fa-spinner"></i> })
                response = response.data.rows;
                for(let i=0; i<response.length; i++){
                    this.setState({
                        numOfMessages: response.length
                    })
                    console.log(response)
                    if(response[i].sender !== username){response[i].sender = 'received'}
                    else if(response[i].sender === username){response[i].sender = 'sent'}
                    if(response[i].message === null) {
                        let tempMessage = <img src={response[i].picture} alt='message'/>;
                        response[i].message = tempMessage;
                    }
                    let ts = response[i].ts;
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
                        response[i].ts = month + day;
                    }
                    if(dayCur === day) {
                        response[i].ts = hour + ':' + minute + ' ' + meridiem;
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
        this.setState({ sendButton: <i className="fas fa-paper-plane"></i> })
    }
    async getFiles(picture){
        await this.setState({
            testRender: true,
            testUri: picture.base64,
            sendPicButton: <i className="fas fa-spinner"></i>
        })
        let testImageW = Math.floor(document.getElementById('testImage').width);
        let testImageH = Math.floor(document.getElementById('testImage').height);
        let targetW = 190;
        let divisor = Math.floor(testImageW / targetW);
        testImageW = testImageW / divisor;
        testImageH = testImageH / divisor;
        console.log(testImageW, testImageH)
        picture.base64 = resizebase64(picture.base64, testImageW, testImageH)
        this.setState({ 
            picture: picture,
            testRender: false,
            testUri: ''
        })
        let url = 'https://tera-text-api.herokuapp.com/message/send/pic';
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
        this.setState({ sendPicButton: <i className="fas fa-camera"></i> })
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
                <Nav page={'Message'} friendUsername={this.state.friendUsername} friendProfilePic={this.state.friendProfilePic}/>
                <div id='messages'>
                    <ul id='listOfMessages'>
                        {this.state.messageArr.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <li className={message.sender+'Ts'}>{message.ts}</li>
                                <li className={message.sender}>{message.message}</li>                  
                            </React.Fragment>
                        ))}
                    </ul>
                    
                </div>
                <div id='messageForm'>
                    <form id='textForm' onSubmit={ this.submitHandler }>
                        <input type="text" id='textFormText' name='text' value={this.state.text} onChange={this.changeHandler}></input>
                        <button type="submit">{this.state.sendButton}</button>
                    </form>
                    <form id='pictureMessageForm'>  
                        <button id='pictureMessageInput'>
                        {this.state.sendPicButton}
                            <FileBase64
                            multiple={ false }
                            onDone={ this.getFiles.bind(this) }   
                        />
                        </button>
                    </form>
                    
                </div>    
            </div>
        )
    }
}

export default withRouter(Message);