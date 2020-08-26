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
            buttonMessageCode: '+',
            buttonMessageUsername: '+',
            errorMessageCode: '',
            nofriends: '',
            usernameToRemove: '',
            loggedIn: true
        }
    }
    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitCodeHandler = e => {
        e.preventDefault();
        this.setState({ 
            buttonMessageCode: 'Loading...',
            errorMessageCode: ''
        })
        if(this.state.friendCode === '') {
            this.setState({
                errorMessageCode: 'Please enter a code',
                buttonMessageCode: '+'
            })
        }
        else if(this.state.friendCode === this.state.userId) {
            this.setState({
                errorMessageCode: "Nope you can't friend yourself",
                buttonMessageCode: '+'
            })
        }
        else{
            let url = 'http://localhost:8000/friend/addcode';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response);
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageCode: 'Incorrect code',
                            buttonMessageCode: '+'
                        })
                    }
                    else if(response.data[0].id){
                        this.setState({
                            errorMessageCode: '',
                            buttonMessageCode: '+'
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
            buttonMessageUsername: 'Loading...',
            errorMessageUsername: ''
        })
        if((this.state.friendUsername === '')) {
            this.setState({
                errorMessageUsername: 'Please enter a username',
                buttonMessageUsername: '+'
            })
        }
        else if(this.state.friendUsername === this.state.username) {
            this.setState({
                errorMessageUsername: "Nope you can't friend yourself",
                buttonMessageUsername: '+'
            })
        }
        else{
            let url = 'http://localhost:8000/friend/addusername';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){
                    console.log(response);
                    if(response.data === 'Account not found'){
                        this.setState({
                            errorMessageUsername: 'Incorrect friend username',
                            buttonMessageUsername: '+'
                        })
                    }
                    else if(response.data[0].id){
                        this.setState({
                            errorMessageUsername: '',
                            buttonMessageUsername: '+'
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
    removeFriend = async e => {
        console.log(e.target.id);
        await this.setState({
            usernameToRemove: e.target.id
        })
        let url = 'http://localhost:8000/friend/removefriend';
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
        console.log(e.target.id);
        await this.setState({
            usernameToRemove: e.target.id
        })
        let url = 'http://localhost:8000/friend/deleteconversation';
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
        let loggedIn = window.sessionStorage.getItem('loggedIn');
        let userId = window.sessionStorage.getItem('userID');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.sessionStorage.getItem('username');
            //pause here till username is ready to send
            await this.setState({
                username: username,
                userId: userId
            });
            let url = 'http://localhost:8000/friend/all';
            axios.post(url ,this.state)
            .then(response => {
                if(response.status === 200){                   
                    let res = response.data;
                    for(let i=0; i<res.length; i++){
                        friendArr[i] = res[i];
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
    
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Nav page={'Friend'} username={ this.state.username }/>
                <p id='friendUsernameCodeInfo'>Your username and friend code are <strong>{ this.state.username }</strong> and <strong>{ this.state.userId }</strong></p>
                
                <form onSubmit={ this.submitUsernameHandler }>
                    <label htmlFor='friendUsername'>Add friend by their username</label>
                    <input name='friendUsername' placeholder='Jonathan27' onChange={ this.changeHandler }/>
                    <input type='submit' value={ this.state.buttonMessageUsername }></input>
                </form>
                <p id='friendUsernameErr'>{ this.state.errorMessageUsername }</p>
                <form onSubmit={ this.submitCodeHandler }>
                    <label htmlFor='friendCode'>or by their code</label>
                    <input type='number' name='friendCode' placeholder='123' onChange={ this.changeHandler }/>
                    <input type='submit' value={ this.state.buttonMessageCode }></input>
                </form>
                <p id='friendCodeErr'>{ this.state.errorMessageCode }</p>
                
                {this.state.friendArr.map((friend, index) => (    
                    <div key={index} className='contactUserBox'>
                        <div className='contactUserBoxLeft'>
                            <img src={friend.friendProfilePic} alt='friend profile'></img>
                        </div>
                        <div className='contactUserBoxRight'>
                            <p className='contactMessageName'>{friend.friendusername}</p>
                            <ul className='deleteFriendBox'>
                                <li className='contactMessageText'><button id={friend.friendusername} onClick={ this.removeFriend }>Remove Friend</button></li>
                                <li className='contactMessageText'><button id={friend.friendusername} onClick={ this.deleteConversation }>Delete Conversation</button></li>
                            </ul>
                        </div>
                    </div>
                ))}    
                <p>{this.state.nofriends}</p>
            </div>
        )
    }
}
