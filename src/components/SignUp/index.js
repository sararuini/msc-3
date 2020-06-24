import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1> Sign Up to Music Connector </h1>
        <SignUpForm />
    </div>
);

//State captures user info & resets state after a user manages to sign up successfully
const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    username: '',
    email: '', // make these fields grey
    passwordOne: '',
    passwordTwo: '', //insert password API here
    location: '', //insert API here
    DOB: '',
    error: null,
};

//Class that manages react local state
class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE}
    };
    // if request is resolved, local state of component empties.
    // if it's rejected, there's a catch block that set the block where the error is to the local state
   // 'onSubmit' uses firebase logic to sign a user in
    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            // user is created and stored in database
            return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email,
            });
        })
        .then(() => {
            this.setState({...INITIAL_STATE}); //state is changed to empty fields
            this.props.history.push(ROUTES.HOME); // User is re-directed to homepage
        })
        .catch(error => {
            this.setState({error}); // prints error if there's one
        });
        event.preventDefault(); //prevents browser from reloading after form is submitted
    };

    //onChange updates the local state of components below
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    
    // captures information input by the user
    render(){
        const {
            firstName,
            lastName,
            email,
            username,
            passwordOne,
            passwordTwo,
            DOB,
            location, 
            error,
        } = this.state;
        
        // checks for password validity --TO DO: FINISH
        // checks that fields are not null, and that passwordOne is the same as passwordTwo ...
        const isInvalid = 
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            username === '' ||
            email === '' ||
            firstName === '' || 
            lastName === '' ||
            DOB === '' ||
            location === '';

            // *** Input fields ***
        return  (
            <form onSubmit={this.onSubmit}>
                {/* first name input */}
                <input
                    name = "firstName"
                    value= {firstName}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="First Name"
                />

                {/* last name input */}
                    <input
                    name = "lastName"
                    value= {lastName}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="Last Name"
                />

                {/* first name input */}
                <input
                    name = "username"
                    value= {username}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="Username"
                />

                {/* email input -- TO DO: INSERT EMAIL CHECKER */}
                <input
                    name = "email"
                    value= {email}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="Email Address"
                />

                {/* password one  input -- TO DO: USE PSW CHECKER (min no. characters, etc*/}
                <input
                    name = "passwordOne"
                    value= {passwordOne}
                    onChange= {this.onChange}
                    type= "password"
                    placeholder="Password"
                />

                {/* password two input */}
                <input
                    name = "passwordTwo"
                    value= {passwordTwo}
                    onChange= {this.onChange}
                    type= "password"
                    placeholder="Insert Password Again"
                />

                {/* location input -- TO DO: USE LOCATION API */}
                <input
                    name = "location"
                    value= {location}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder= "Location"
                />

                {/* DOB input -- TO DO: USE DOB API TO CHECK >18 */}
                <input
                    name = "DOB"
                    value= {DOB}
                    onChange= {this.onChange}
                    type= "text"
                    placeholder="Date of Birth"
                />
                {/* button checks that no variable is invalid */}
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {/* Error handling -- TO DO: COMPLETE ERROR HANDLING*/}
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Register here if you don't have a Music Connector account already: <Link to = {ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

//components gain access to router props
const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };