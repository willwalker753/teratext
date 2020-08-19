import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Teratext</h1>
                <a href='/login'><button>Login</button></a>
                <a href='/signup'><button>Sign Up</button></a>
                <p>This is the static client of Teratext</p>
            </div>
        )
    }
}
