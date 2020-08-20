import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Nav from './Nav';
import './Message.css';

export default class Message extends Component {
    constructor(props) {
        super(props)  
        this.state = {
            username: '',
            loggedIn: true
        }
    }  
    componentDidMount() {
        let loggedIn = window.sessionStorage.getItem('loggedIn');
        if (!loggedIn) {
            this.setState({
                loggedIn: false
            });
        }
        else {
            let username = window.sessionStorage.getItem('username');
            this.setState({
                username: username
            });
        }
    }
    render() {
        if(!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Nav page={'Message'}/>
                <div id='messages'>
                    <ul id='listOfMessages'>
                        <li className='received'>hello</li><br/><br/>
                        <li className='sent'>hello to you too</li><br/><br/>
                        <li className='received'>hello</li><br/><br/>
                        <li className='sent'>hello to you too</li><br/><br/>
                    </ul>
                </div>
                <form id='messageForm'>
                    <input type="text"></input>
                    <input type="file" accept="image/*"></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
