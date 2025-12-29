import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        // Name validation: at least 3 letters (allowing spaces)
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        if (!name.trim() || !nameRegex.test(name)) {
            setError('Please enter a valid name (minimum 3 letters)');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Password validation: at least 6 characters
        if (!password.trim() || password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        // Password strength validation
        const passwordRegex = /^(?=.*[a-zA-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one letter');
            return false;
        }

        return true;
    };

    // Email,Password Sign Up
    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form before submitting
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password
            });

            //save token to localstorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('Account created successfully!');
            navigate('/home');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            console.error('Sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Google Sign Up
    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError('');


        try {

            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            //send google data to backend
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/auth/google`, {
                email: user.email,
                name: user.displayName,
                googleId: user.uid
            });

            //save token to localstorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('Signed up with Google!');
            navigate('/home');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            console.error('Google sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Real-time validation messages
    const getPasswordStrength = () => {
        if (!password) return '';
        if (password.length < 6) return 'Too short (minimum 6 characters)';
        if (!/[a-zA-Z]/.test(password)) return 'Add at least one letter';
        return;
    };

    const getNameValidation = () => {
        if (!name) return '';
        if (name.length < 3) return 'Name too short (minimum 3 letters)';
        return;
    };

    const getEmailValidation = () => {
        if (!email) return '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Invalid email format';
        return;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12">
            {/* Amazon Logo */}
            <div className="mb-8 flex">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                    alt="Amazon"
                    className="w-28"
                />
                <span className="text-[18px] font-semibold">.in</span>
            </div>

            {/* Sign Up Form */}
            <div className="w-full max-w-sm border border-gray-300 rounded p-6">
                <h2 className="text-2xl mb-4">Create Account</h2>

                {error && (
                    <p className="text-sm text-red-600 mb-2">
                        {error}
                    </p>

                )}

                <form onSubmit={handleEmailSignUp}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Your name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-orange-500"
                            placeholder="First and last name"
                            required
                        />
                        {getNameValidation() && (
                            <p className={`text-xs mt-1 ${getNameValidation().includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                {getNameValidation()}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                            Mobile number or Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-orange-500"
                            required
                        />
                        {getEmailValidation() && (
                            <p className={`text-xs mt-1 ${getEmailValidation().includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                {getEmailValidation()}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-orange-500"
                            placeholder="At least 6 characters"
                            required
                        />
                        {getPasswordStrength() && (
                            <p className={`text-xs mt-1 ${getPasswordStrength().includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                {getPasswordStrength()}
                            </p>
                        )}

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded mb-4"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>



                <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-sm font-semibold mb-1">Buying for work?</p>
                    <a href="#" className="text-sm text-blue-600 hover:text-yellow-500 hover:underline">
                        Create a free business account
                    </a>
                </div>



                {/* Sign In Link */}
                <div className="mt-6">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/')}
                            className="text-blue-600 hover:text-yellow-500"
                        >
                            Sign in
                        </button>
                    </p>
                </div>

                <p className="text-sm mb-4 mt-4">
                    By creating an account or logging-in, you agree to Amazon's{' '}
                    <a href="#" className="text-blue-600">Conditions of Use</a> and{' '}
                    <a href="#" className="text-blue-600">Privacy Notice</a>.
                </p>
            </div>
            <div className="w-full max-w-sm mt-6 mb-4 relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-xs text-gray-600">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign Up Button */}
            <button
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full max-w-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold text-sm py-2 rounded flex items-center justify-center gap-2"
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                />
                Login with Google
            </button>

            {/* Footer Links */}
            <div className="mt-8 text-center text-xs text-blue-600 space-x-4">
                <a href="#" className="hover:text-yellow-500 hover:underline">Conditions of Use</a>
                <a href="#" className="hover:text-yellow-500 hover:underline">Privacy Notice</a>
                <a href="#" className="hover:text-yellow-500 hover:underline">Help</a>
            </div>
            <p className="mt-3 text-center text-xs text-gray-600">
                © 1996-2024, Amazon.com, Inc. or its affiliates
            </p>
        </div>
    );
}

export default SignUp;