import React from 'react'
import './Nav.css'


export default function Nav(props) {
    function logoutHandler() {
        window.sessionStorage.clear();
        window.location.replace('/');
    }
    function hamburgerMenu(e) {
        console.log(e)
        let hamburgerMenu = document.getElementById('hamburgerMenu');
        if(hamburgerMenu.style.display === "block") {
            hamburgerMenu.style.display = "none";
        } 
        else{
            hamburgerMenu.style.display = "block";
        }
    }
    if(props.page === 'User') {
        return(
        <>
            <div id='hamburgerMenu'>
                <ul className='navList'>
                    <button id='hamburgerButtonOnMenu' onClick={hamburgerMenu}><i class="fas fa-times"></i></button>
                    <p className='welcomeText'>Welcome {props.username}</p>
                    <li><a href='/user/friend'>Add a new friend</a></li>                
                    <li><a href='/user/account'>Account</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav className='navBox'>
                <button id='hamburgerButton' onClick={hamburgerMenu}><i class="fas fa-bars"></i></button>
            </nav>
        </>
        
    )}
    if(props.page === 'Message') {
        return(
        <>
            <div id='hamburgerMenu'>
                <ul className='navList'>
                    <button id='hamburgerButtonOnMenu' onClick={hamburgerMenu}><i class="fas fa-times"></i></button>
                    <li><a href='/user'>Back</a></li>
                    <li><a href='/user/friend'>Edit Contact</a></li>
                    <button onClick={logoutHandler}>Logout</button>
                </ul>
            </div>
            <nav className='navBox'>
                <button id='hamburgerButton' onClick={hamburgerMenu}><i class="fas fa-bars"></i></button>
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
                        <button id='hamburgerButtonOnMenu' onClick={hamburgerMenu}><i class="fas fa-times"></i></button>
                        <li><a href='/user'>Back</a></li>
                        <li><a href='/user/account'>Edit Account</a></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </ul>
                </div>
                <nav className='navBox'>
                    <button id='hamburgerButton' onClick={hamburgerMenu}><i class="fas fa-bars"></i></button>
                    <p className='welcomeText'>{props.username}'s Friends</p>
                </nav>
            </>
        )
    }
}
