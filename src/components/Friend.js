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

    // Runs when form change is detected 
    changeHandler = e => {
        // Save the current value of the form in state
        this.setState({ [e.target.name]: e.target.value });
    }

    // Runs when submitting friend code form 
    submitCodeHandler = e => {
        e.preventDefault();
        // Render a loading spinner
        this.setState({ 
            buttonMessageCode: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
            errorMessageCode: ''
        })
        // If no code entered show error
        if(this.state.friendCode === '') {
            this.setState({
                errorMessageCode: 'Please enter a code',
                buttonMessageCode: <i className="fas fa-user-plus"></i>
            })
        }
        // If friending yourself show error
        else if(this.state.friendCode === this.state.userId) {
            this.setState({
                errorMessageCode: "Nope you can't friend yourself",
                buttonMessageCode: <i className="fas fa-user-plus"></i>
            })
        }
        // Else send request to API to add friend
        else {
            let url = 'https://tera-text-api.herokuapp.com/friend/addcode';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    // If no account found show error
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageCode: 'Incorrect code',
                            buttonMessageCode: <i className="fas fa-user-plus"></i>
                        })
                    }
                    // If account found refresh
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

    // Runs when submitting username form
    submitUsernameHandler = e => {
        e.preventDefault();
        // Render a loading spinner
        this.setState({ 
            buttonMessageUsername: <i id='loadingSpinnerFriend' className="fas fa-spinner"></i>,
            errorMessageUsername: ''
        });
        // If nothing entered show error
        if((this.state.friendUsername === '')) {
            this.setState({
                errorMessageUsername: 'Please enter a username',
                buttonMessageUsername: <i className="fas fa-user-plus"></i>
            })
        }
        // If trying to friend self show error
        else if(this.state.friendUsername === this.state.username) {
            this.setState({
                errorMessageUsername: "Nope you can't friend yourself",
                buttonMessageUsername: <i className="fas fa-user-plus"></i>
            })
        }
        // Else send request to API to add friend
        else{
            let url = 'https://tera-text-api.herokuapp.com/friend/addusername';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    // If no account found show error
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageUsername: 'Incorrect friend username',
                            buttonMessageUsername: <i className="fas fa-user-plus"></i>
                        })
                    }
                    // If account found refresh page
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

    // Runs inside removeFriend and deleteConversation functions
    idToUsernameConverter = id => {
        // Shorten id taking off last characters
        return id.substring(0, id.length -7);
    }

    removeFriend = async e => {
        e.stopPropagation();
        // Shorten username getting usable first part
        let usernameToRemove = this.idToUsernameConverter(e.target.id)
        await this.setState({
            usernameToRemove: usernameToRemove
        });
        let url = 'https://tera-text-api.herokuapp.com/friend/removefriend';
        // Send request to API to remove friend and conversation
        await axios.post(url ,this.state)
        .then(response => {
            // If successful refresh page
            if(response.status === 200){
                window.location.reload();
            }
        })
        .catch(error => {
            this.setState({
                errorMessageCode: 'Trouble connecting to server',
            });
        })
    }

    deleteConversation = async e => {
        e.stopPropagation();
        // Shorten username getting usable first part
        let usernameToRemove = this.idToUsernameConverter(e.target.id)
        await this.setState({
            usernameToRemove: usernameToRemove
        })
        let url = 'https://tera-text-api.herokuapp.com/friend/deleteconversation';
        // Send request to API to remove conversation
        await axios.post(url ,this.state)
        .then(response => {
            // If successful refresh page
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
        // If not logged in redirect to home
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        // Else get all friends from the API
        else {
            let username = window.localStorage.getItem('username');
            // Pause here till username is ready to send
            await this.setState({
                username: username,
                userId: userId
            });
            let url = 'https://tera-text-api.herokuapp.com/friend/all';
            axios.post(url ,this.state)
            .then(response => {
                // If successful fill friendArr with the names and message links
                if(response.status === 200){                   
                    let res = response.data;
                    for(let i=0; i<res.length; i++){
                        friendArr[i] = res[i];
                        friendArr[i].messageLink = '/user/message/'+ res[i].friendid +'/'+ res[i].friendusername;
                    }
                    // Save finished array to state for rendering
                    this.setState({
                        friendArr: friendArr
                    });
                    // If no friends show error
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

    // Runs when click outer box of friend
    handleFriendClick = async e => {
        // Save the clicked friend's message link
        await this.setState({
            messageLink: e.target.id,
        })
        // Redirect to that message link
        this.setState({
            messageLinkClicked: true
        })
    }

    // Runs when cursor enters button
    buttonHoverOn = e => {
        // Add animation on class to button
        try {
            document.getElementById(e.target.id).className= 'buttonOn';            
        }
        // If moving too quickly and error return doing nothing
        catch {
            return;
        }
    }

    // Runs when cursor leaves button
    buttonHoverOff = e => {
        // Add animation off class to button
        try {
            document.getElementById(e.target.id).className='buttonOff';  
        }
        // If moving too quickly and error return doing nothing
        catch {
            return;
        }
    }

    render() {
        // If not logged in redirect to home
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        // If clicked on friend redirect to friend message page
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
                {/* map the friend array and list out each friend */}
                {this.state.friendArr.map((friend, index) => (              
                    <div key={index} onClick={this.handleFriendClick} className='contactUserBox'>
                        <div className='friendUserBoxLeft'>
                            <img id={'/user/message/'+friend.friendid+'/'+friend.friendusername} src={friend.friendProfilePic} alt='friend profile'></img>
                        </div>
                        <div className='friendUserBoxRight'>
                            <p className='friendMessageName'>{friend.friendusername}</p>
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
