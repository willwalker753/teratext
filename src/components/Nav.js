import React from 'react'
import './Nav.css'


export default function Nav(props) {
    function logoutHandler() {
        window.sessionStorage.clear();
        window.location.replace('/');
    }
    function hamburgerMenuOut() {
        document.getElementById('navBox').className='fadeOutNav';
        document.getElementById('hamburgerMenu').className='hamburgerAnimateOut';
    }
    function hamburgerMenuIn() {
        document.getElementById('navBox').className='fadeInNav';
        document.getElementById('hamburgerMenu').className='hamburgerAnimateIn';
    }
    if(props.page === 'User') {
        return(
        <>
            <div id='hamburgerMenu'>
                <ul className='navList'>
                    <div id='navButtonAndHeader'>
                        <p id='navTeratext'><a href='/'>Teratext</a></p>
                        <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i className="fas fa-times"></i></button>
                    </div>
                    <p className='welcomeText'>Welcome {props.username}</p>
                    <li><a href='/user'>Messages</a></li>
                    <li><a href='/user/friend'>Contacts</a></li>              
                    <li><a href='/user/account'>Account</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav id='navBox'>
                <button id='hamburgerButton' onClick={hamburgerMenuOut}><i className="fas fa-bars"></i></button>
                <p className='friendNavText'>{props.username}'s Messages</p>
                <div></div>
            </nav>
        </>
        
    )}
    if(props.page === 'Message') {
        return(
        <>
            <div id='hamburgerMenu'>
                <ul className='navList'>
                    <div id='navButtonAndHeader'>
                        <p id='navTeratext'><a href='/'>Teratext</a></p>
                        <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i className="fas fa-times"></i></button>
                    </div>
                    <li><a href='/user'>Messages</a></li>
                    <li><a href='/user/friend'>Contacts</a></li>              
                    <li><a href='/user/account'>Account</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav id='navBox'>
                <button id='hamburgerButton' onClick={hamburgerMenuOut}><i className="fas fa-bars"></i></button>
                <div id='navFriendPicName'>
                    <p className='welcomeText'>{props.friendUsername}</p>
                    <img src={props.friendProfilePic} id='navFriendProfilePic' alt='friend profile'></img>  
                </div>
            </nav>
        </>
        
    )}
    if(props.page === 'Friend') {
        return(
            <>
                <div id='hamburgerMenu'>
                    <ul className='navList'>
                        <div id='navButtonAndHeader'>
                            <p id='navTeratext'><a href='/'>Teratext</a></p>
                            <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i className="fas fa-times"></i></button>
                        </div>
                        <li><a href='/user'>Messages</a></li>
                        <li><a href='/user/friend'>Contacts</a></li>              
                        <li><a href='/user/account'>Account</a></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </ul>
                </div>
                <nav id='navBox'>
                    <button id='hamburgerButton' onClick={hamburgerMenuOut}><i className="fas fa-bars"></i></button>
                    <p className='friendNavText'>{props.username}'s Friends</p>
                </nav>
            </>
        )
    }
    if(props.page === 'Account') {
        return(
            <>
                <div id='hamburgerMenu'>
                    <ul className='navList'>
                        <div id='navButtonAndHeader'>
                            <p id='navTeratext'><a href='/'>Teratext</a></p>
                            <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i className="fas fa-times"></i></button>
                        </div>
                        <li><a href='/user'>Messages</a></li>
                        <li><a href='/user/friend'>Contacts</a></li>              
                        <li><a href='/user/account'>Account</a></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </ul>
                </div>
                <nav id='navBox'>
                    <button id='hamburgerButton' onClick={hamburgerMenuOut}><i className="fas fa-bars"></i></button>
                    <p className='friendNavText'>{props.username}'s Account</p>
                </nav>
            </>
        )
    }
}
