import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../context/auth";
import Navbar from "../Navbar";
import './Login.css';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    document.title = "CineWave | Login"
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password).catch(err => {
                setErrorMessage(err.message);
                setIsSigningIn(false);
            });
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
            <Navbar></Navbar>
            <main className="login-container">
                <div className="login-wrapper">
                    <div className="login-header">
                        <h3 style={{color:'#55c1ff'}}>Login</h3>
                    </div>
                    <form onSubmit={onSubmit} className="login-form">
                        <div>
                            <input
                                type="email"
                                autoComplete='email'
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); }}
                                className="login-form-input bg-dark text-white border-0"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                autoComplete='current-password'
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); }}
                                className="login-form-input bg-dark text-white border-0"
                            />
                        </div>
                        {errorMessage && (
                            <span className='login-error-message'>{errorMessage}</span>
                        )}
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`login-submit-button btn btn-dark ${isSigningIn ? 'disabled' : ''}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                        <div className="register-signup-link" style={{fontSize:'0.8rem'}}>
                            Don't you have an account? {' '}
                            <Link to={'/register'} className="register-signup-link">Register</Link>
                        </div>
                        <div className="register-signup-link" style={{fontSize:'0.8rem'}}>
                            <Link to={'/forgot'} className="register-signup-link text-white">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Login;
