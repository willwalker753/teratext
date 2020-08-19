import React, { Component } from 'react';
import Nav from './Nav';
import './Message.css';

export default class Message extends Component {
    render() {
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
