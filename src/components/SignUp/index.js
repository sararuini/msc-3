import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1> Sign Up </h1>
        <SignUpForm />
    </div>
);

//State captures user info & resets state after a user manages to sign up successfully
const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '', // make these fields grey
    passwordOne: '',
    passwordTwo: '', //insert password API here
    location: '', //insert API here
    DOB: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE}
    };

    onSubmit = event => {

    };

    onChange = event => {

    };

    render(){
        const {
            firstName,
            lastName,
            email,
            passwordOne,
            passwordTwo,
            DOB,
            location, 
            error,
        } = this.state;

        return  (
            <form onSubmit={this.onSubmit}>
                {/* first name input */}
                <input
                    name = "First Name"
                    value= {firstName}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="John"
                />

                {/* last name input */}
                    <input
                    name = "Last Name"
                    value= {lastName}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="Doe"
                />

                {/* email input -- INSERT EMAIL CHECKER */}
                <input
                    name = "Email Address"
                    value= {email}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="email@musicconnector.com"
                />

                {/* password input -- USE PSW CHECKER */}
                <input
                    name = "Password (One)"
                    value= {passwordOne}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="******"
                />

                {/* password input -- USE PSW CHECKER */}
                <input
                    name = "Password (Two)"
                    value= {passwordTwo}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="******"
                />

                {/* location input -- USE LOCATION API */}
                <input
                    name = "Location"
                    value= {location}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "London, UK"
                />

                {/* DOB input -- USE DOB API TO CHECK >18 */}
                <input
                    name = "Date of Birth"
                    value= {DOB}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="01 July 2002"
                />
                <button type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to = {ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

export default SignUpPage;
export { SignUpForm, SignUpLink };