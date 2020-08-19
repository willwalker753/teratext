import React, { Component } from 'react'

export default class Signup extends Component {
    formSubmit(e) {
        e.preventDefault();
        window.location.replace('/user');
    }
    render() {
        return (
            <div>
                <a href='/'><h2>Teratext</h2></a>
                <form onSubmit={ this.formSubmit }>
                    <label htmlFor='Username'>Username</label>
                    <input type='text' name='Username'></input>
                    <label htmlFor='Password'>Password</label>
                    <input type='password' name='Password'></input>
                    <label htmlFor='RepeatPassword'>Repeat Password</label>
                    <input type='password' name='Repeat Password'></input>
                    <input type='submit' value='Sign Up'></input>
                </form>
            </div>
        )
    }
}
