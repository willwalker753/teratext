import React from 'react'
import './Nav.css'

export default function Nav(props) {
    if(props.page === 'User') {
        return(
        <nav className='navBox'>
            <ul className='navList'>
                <li><a href='/'>Teratext</a></li>
                <p className='welcomeText'>Welcome {props.username}</p>
                <li><a href='/user/account'>Account</a></li>
            </ul>
        </nav>
    )}
    if(props.page === 'Message') {
        return(
        <nav className='navBox'>
            <ul className='navList'>
                <li><a href='/user'>Back</a></li>
                <p className='welcomeText'>Barry</p>
                <li><a href='/user/friend'>Edit Contact</a></li>
            </ul>
        </nav>
    )}
    if(props.page === 'Friend') {
        return(
        <nav className='navBox'>
            <ul className='navList'>
                <li><a href='/user'>Back</a></li>
                <p className='welcomeText'>{props.username}'s Friends</p>
                <li><a href='/user/account'>Edit Account</a></li>
            </ul>
        </nav>
    )}
}
