import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
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
        setInterval(this.getMessages, 1500);
    }
    getMessages = async () => {
        let url = 'http://localhost:8000/message/all';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                let res = response.data.rows;
                
                for(let i=0; i<res.length; i++){
                    if(res[i].sender !== username){res[i].sender = 'received'}
                    else if(res[i].sender === username){res[i].sender = 'sent'}
                }
                console.log(res);
                this.setState({
                    messageArr: res
                })
            }
        })
        .catch(error => {
            this.setState({
                errorMessage: 'Unable to find your messages',
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
                            <li key={message.id} className={message.sender}>{message.message}</li>
                        ))}
                    </ul>
                    
                </div>
                <form id='messageForm' onSubmit={ this.submitHandler }>
                    <input type="text" name='text' value={this.state.text} onChange={ this.changeHandler }></input>
                    <input type="submit" value='Send'></input>
                </form>
                <form id='picForm'>
                    <input type="file" accept="image/*"></input>
                </form>
            </div>
        )
    }
}
export default withRouter(Message);