import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink} from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget'; 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div>
        <h1> Sign In to Music Connector </h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

//State captures user info & resets state after a user manages to sign up successfully
const INITIAL_STATE = {
    email: '', // make these fields grey
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE}
    };
    // if request is resolved, local state of component empties.
    // if it's rejected, there's a catch block that set the block where the error is to the local state
   
    onSubmit = event => {
        const {email, password } = this.state;

        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({...INITIAL_STATE}); //state is changed to empty fields
            this.props.history.push(ROUTES.HOME); // User is re-directed to homepage
        })
        .catch(error => {
            this.setState({error});
        });

        event.preventDefault(); //prevents browser from reloading after form is submitted
    };

    //onChange updates the local state of components below
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    
    render(){
        const {
            email,
            password,
            error,
        } = this.state;

        // checks for password validity --TO DO: FINISH
        // checks that fields are not null, and that passwordOne is the same as passwordTwo ...
        const isInvalid = 
            password === '' ||
            email === '' ;

        return  (
            <form onSubmit={this.onSubmit}>

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
                    name = "password"
                    value= {password}
                    onChange= {this.onChange}
                    type= "password"
                    placeholder="Password"
                />

                <button disabled={isInvalid} type="submit">Sign In</button>

                {/* Error handling -- TO DO: COMPLETE ERROR HANDLING*/}
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
//components gain access to router props
const SignInForm = compose(
    withRouter,
    withFirebase,)(SignInFormBase);

export default SignInPage;
export { SignInForm };