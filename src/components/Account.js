import React, { Component } from 'react';

export default class Account extends Component {
    render() {
        return (
            <div>
                <a href='/user'>Back</a>
                <button>Logout</button>
                <form>
                    <label htmlFor='username'>Change username to</label>
                    <input type='text' name='username' placeholder='Demo'></input>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}
