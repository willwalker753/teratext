import React, { Component } from 'react';
import Nav from './Nav';
import './Friend.css';

export default class Friend extends Component {
    render() {
        return (
            <div>
                <Nav page={'Friend'}/>
                <p>Your friend code is <strong>5485</strong></p>
                <form>
                    <label htmlFor='friendCode'>Add friend by their code</label>
                    <input name='friendCode' placeholder='1234'/>
                    <input type='submit' value='+'></input>
                </form>
                <div className='contactUserBox'>
                    <div className='contactUserBoxLeft'>
                        <img src='https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png' alt='placeholder'></img>
                    </div>
                    <div className='contactUserBoxRight'>
                        <p className='contactMessageName'>Barry</p>
                        <ul className='contactMessagePreview'>
                            <li className='contactMessageText'><button>Remove Friend</button></li>
                            
                        </ul>
                    </div>
                </div>
                
            </div>
        )
    }
}
