import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Nav from './Nav';
import axios from 'axios';
import './Friend.css';

let friendArr = [];
export default class Friend extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            userId: '',
            friendArr: [],
            friendUsername: '',
            friendCode: '',
            buttonMessageCode: <i className="fas fa-user-plus"></i>,
            buttonMessageUsername: <i className="fas fa-user-plus"></i>,
            errorMessageCode: '',
            nofriends: '',
            usernameToRemove: '',
            messageLink: '',
            messageLinkClicked: false,
            loggedIn: true
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitCodeHandler = e => {
        e.preventDefault();
        this.setState({ 
            buttonMessageCode: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
            errorMessageCode: ''
        })
        if(this.state.friendCode === '') {
            this.setState({
                errorMessageCode: 'Please enter a code',
                buttonMessageCode: <i className="fas fa-user-plus"></i>
            })
        }
        else if(this.state.friendCode === this.state.userId) {
            this.setState({
                errorMessageCode: "Nope you can't friend yourself",
                buttonMessageCode: <i className="fas fa-user-plus"></i>
            })
        }
        else{
            let url = 'https://tera-text-api.herokuapp.com/friend/addcode';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response);
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageCode: 'Incorrect code',
                            buttonMessageCode: <i className="fas fa-user-plus"></i>
                        })
                    }
                    else if(response.data[0].id){
                        this.setState({
                            errorMessageCode: '',
                            buttonMessageCode: <i className="fas fa-user-plus"></i>
                        })
                        window.location.reload();
                    }
                }
            })
            .catch(error => {
                this.setState({
                    errorMessageCode: 'Incorrect friend code',
                })
            })
        }
    }  
    submitUsernameHandler = e => {
        e.preventDefault();
        this.setState({ 
            buttonMessageUsername: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
            errorMessageUsername: ''
        })
        if((this.state.friendUsername === '')) {
            this.setState({
                errorMessageUsername: 'Please enter a username',
                buttonMessageUsername: <i className="fas fa-user-plus"></i>
            })
        }
        else if(this.state.friendUsername === this.state.username) {
            this.setState({
                errorMessageUsername: "Nope you can't friend yourself",
                buttonMessageUsername: <i className="fas fa-user-plus"></i>
            })
        }
        else{
            let url = 'https://tera-text-api.herokuapp.com/friend/addusername';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response);
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageUsername: 'Incorrect friend username',
                            buttonMessageUsername: <i className="fas fa-user-plus"></i>
                        })
                    }
                    else if(response.data[0].id){
                        this.setState({
                            errorMessageUsername: '',
                            buttonMessageUsername: <i className="fas fa-user-plus"></i>
                        })
                        window.location.reload();
                    }
                }
            })
            .catch(error => {
                this.setState({
                    errorMessageUsername: 'Incorrect friend username',
                })
            })
        }
    }
    idToUsernameConverter = id => {
        return id.substring(0, id.length -7);
    }
    removeFriend = async e => {
        e.stopPropagation();
        let usernameToRemove = this.idToUsernameConverter(e.target.id)
        console.log(usernameToRemove)
        await this.setState({
            usernameToRemove: usernameToRemove
        })
        let url = 'https://tera-text-api.herokuapp.com/friend/removefriend';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                console.log(response)
            }
        })
        .catch(error => {
            this.setState({
                errorMessageCode: 'Trouble connecting to server',
            })
        })
        window.location.reload();
    }
    deleteConversation = async e => {
        e.stopPropagation();
        let usernameToRemove = this.idToUsernameConverter(e.target.id)
        await this.setState({
            usernameToRemove: usernameToRemove
        })
        let url = 'https://tera-text-api.herokuapp.com/friend/deleteconversation';
        await axios.post(url ,this.state)
        .then(response => {
            if(response.status === 200){
                window.location.reload();
            }
        })
        .catch(error => {
            this.setState({
                errorMessageCode: 'Trouble connecting to server',
            })
        })
    }
    
    async componentDidMount() {
        let loggedIn = window.localStorage.getItem('loggedIn');
        let userId = window.localStorage.getItem('userID');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.localStorage.getItem('username');
            //pause here till username is ready to send
            await this.setState({
                username: username,
                userId: userId
            });
            let url = 'https://tera-text-api.herokuapp.com/friend/all';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){                   
                    let res = response.data;
                    for(let i=0; i<res.length; i++){
                        friendArr[i] = res[i];
                        friendArr[i].messageLink = '/user/message/'+ res[i].friendid +'/'+ res[i].friendusername;
                    }
                    this.setState({
                        friendArr: friendArr
                    });
                    if(friendArr[0] === undefined) {
                        this.setState({
                            nofriends: "You don't have any friends yet"
                        })
                    }
                }
            })
            .catch(error => {
                this.setState({
                    errorMessageCode: 'Trouble connecting to server',
                })
            })
        }
    }
    handleFriendClick = async e => {
        await this.setState({
            messageLink: e.target.id,
        })
        this.setState({
            messageLinkClicked: true
        })
    }
    buttonHoverOn = e => {
        try {
            document.getElementById(e.target.id).className= 'buttonOn';            
        }
        catch {
            return;
        }
    }
    buttonHoverOff = e => {
        try {
            document.getElementById(e.target.id).className='buttonOff';  
        }
        catch {
            return;
        }
    }

    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        if(this.state.messageLinkClicked) {
            return <Redirect to={this.state.messageLink}/>
        }
        return (
            <div>
                <Nav page={'Friend'} username={ this.state.username }/>
                
                <p id='friendUsernameCodeInfo'>Your username and friend code are <strong>{ this.state.username }</strong> and <strong>{ this.state.userId }</strong></p>
                <div id='friendFormBox'>
                    <div>
                        <p id='addAFriendByUsername'>Add a friend by their username or code</p>
                    </div>
                    
                    <div>
                        <form id='friendUsernameForm' onSubmit={ this.submitUsernameHandler }>
                            <input name='friendUsername' placeholder='username' onChange={ this.changeHandler }/>
                            <button type='submit'>{this.state.buttonMessageUsername}</button>
                        </form>
                        <p id='friendUsernameErr'>{ this.state.errorMessageUsername }</p>

                        <form id='friendIdForm' onSubmit={ this.submitCodeHandler }>
                            <input type='number' name='friendCode' placeholder='code' onChange={ this.changeHandler }/>
                            <button type='submit'>{this.state.buttonMessageCode}</button>
                        </form>
                        <p id='friendCodeErr'>{ this.state.errorMessageCode }</p>
                    </div>
                </div>
                {this.state.friendArr.map((friend, index) => (
                    
                    <div key={index} onClick={this.handleFriendClick}className='contactUserBox'>
                        <div className='friendUserBoxLeft'>
                            <img id={'/user/message/'+friend.friendid+'/'+friend.friendusername} src={friend.friendProfilePic} alt='friend profile'></img>
                        </div>
                        <div className='friendUserBoxRight'>
                            <p className='contactMessageName'>{friend.friendusername}</p>
                            <ul className='deleteFriendBox'>
                                <li className='contactMessageText'><button id={friend.friendusername+'+friend'} className='' onClick={ this.removeFriend } onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>Remove Friend</button></li>
                                <li className='contactMessageText'><button id={friend.friendusername+'+conver'} className='' onClick={ this.deleteConversation } onMouseEnter={this.buttonHoverOn} onMouseLeave={this.buttonHoverOff}>Delete Conversation</button></li>
                            </ul>
                        </div>
                    </div>
                ))}    
                <p>{this.state.nofriends}</p>
            </div>
        )
    }
}
