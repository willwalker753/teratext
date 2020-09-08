import React from 'react';
import './Nav.css';

export default function Nav(props) {
    function logoutHandler() {
        window.localStorage.clear();
        window.location.replace('/');
    }

    // Adds menu animate out class
    function hamburgerMenuOut() {
        document.getElementById('navBox').className='fadeOutNav';
        document.getElementById('hamburgerMenu').className='hamburgerAnimateOut';
    }

    // Adds menu animate in class
    function hamburgerMenuIn() {
        document.getElementById('navBox').className='fadeInNav';
        document.getElementById('hamburgerMenu').className='hamburgerAnimateIn';
    }

    // Returns different hamburger menu and nav bar depending on page 
    if(props.page === 'User') {
        return(
        <>
            <div id='hamburgerMenu'>
                <ul className='navList'>
                    <div id='navButtonAndHeader'>
                        <p id='navTeratext'><a href='/'>Teratext</a></p>
                        <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i title='close menu' className="fas fa-times"></i></button>
                    </div>
                    <p className='welcomeText'>Welcome {props.username}</p>
                    <li><a href='/user'>Messages</a></li>
                    <li><a href='/user/friend'>Contacts</a></li>              
                    <li><a href='/user/account'>Account</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav id='navBox'>
                <button id='hamburgerButton'  onClick={hamburgerMenuOut}><i title='open menu' className="fas fa-bars"></i></button>
                <p className='friendNavText'>{props.username}'s Messages</p>
                <div id='spacerNav'></div>
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
                        <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i title='close menu' className="fas fa-times"></i></button>
                    </div>
                    <li><a href='/user'>Messages</a></li>
                    <li><a href='/user/friend'>Contacts</a></li>              
                    <li><a href='/user/account'>Account</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav id='navBox'>
                <button id='hamburgerButton' onClick={hamburgerMenuOut}><i title='open menu' className="fas fa-bars"></i></button>
                <div id='navFriendPicName'>
                    <p className='welcomeText'>{props.friendUsername}</p>
                    <img src={props.friendProfilePic} id='navFriendProfilePic' alt='friend profile'></img>  
                </div>
                <div id='spacerNav'></div>
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
                            <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i title='close menu' className="fas fa-times"></i></button>
                        </div>
                        <li><a href='/user'>Messages</a></li>
                        <li><a href='/user/friend'>Contacts</a></li>              
                        <li><a href='/user/account'>Account</a></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </ul>
                </div>
                <nav id='navBox'>
                    <button id='hamburgerButton' onClick={hamburgerMenuOut}><i title='open menu' className="fas fa-bars"></i></button>
                    <p className='friendNavText'>{props.username}'s Friends</p>
                    <div id='spacerNav'></div>
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
                            <button id='hamburgerButtonOnMenu' onClick={hamburgerMenuIn}><i title='close menu' className="fas fa-times"></i></button>
                        </div>
                        <li><a href='/user'>Messages</a></li>
                        <li><a href='/user/friend'>Contacts</a></li>              
                        <li><a href='/user/account'>Account</a></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </ul>
                </div>
                <nav id='navBox'>
                    <button id='hamburgerButton' onClick={hamburgerMenuOut}><i title='open menu' className="fas fa-bars"></i></button>
                    <p className='friendNavText'>{props.username}'s Account</p>
                    <div id='spacerNav'></div>
                </nav>
            </>
        )
    }
}
