import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleContinueEmail = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Enter your email or mobile number');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setStep(2);
  };


  // Email Sign In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');


    if (!password.trim()) {
      setError('Enter your password');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      //save token to localstorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('Signed in successfully!');
      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {

      //sign in with firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      //send google user data to backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        email: user.email,
        name: user.displayName,
        googleId: user.uid
      });

      //save token to localstorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));


      console.log('Signed in with Google!');
      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      console.error('Google sign in error:', err);
    } finally {
      setLoading(false);
    }
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

      {/* Card */}
      {step === 1 && (
        <>
          <div className="w-full max-w-sm border border-gray-300 rounded p-6">
            <h2 className="text-2xl mb-4 font-semibold">Sign in</h2>

            {error && (
              <p className="text-sm text-red-600 mb-2">
                {error}
              </p>
            )}

            {/* 1: email only */}

            <form onSubmit={handleContinueEmail}>
              <div className="mb-3">
                <label className="block text-[16px] font-semibold mb-2">
                  Email or mobile phone number
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded mb-4"
              >
                {loading ? 'Loading...' : 'Continue'}
              </button>
            </form>

            {/* common bottom text */}
            <p className="text-sm mb-4">
              By continuing, you agree to Amazon's{' '}
              <a href="#" className="text-blue-600">Conditions of Use</a> and{' '}
              <a href="#" className="text-blue-600">Privacy Notice</a>.
            </p>

            {/* Need Help with Video Icon */}
            <div className="mt-4 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src="/videoicon.png"
                  alt="video help"
                  className="h-2 w-2"
                />
              </div>
              <span className="text-sm text-blue-600 cursor-pointer">
                Need help?
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold mb-1">Buying for work?</p>
              <a href="#" className="text-sm text-blue-600 hover:text-yellow-500 hover:underline">
                Shop on Amazon Business
              </a>
            </div>
          </div>

          {/* "New to Amazon?" */}
          <div className="w-full max-w-sm mt-6 mb-6 relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-xs text-gray-600">New to Amazon?</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="w-full max-w-sm bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-400 text-sm py-2 rounded-lg shadow-sm"
          >
            Create your Amazon account
          </button>

          <div className="w-full max-w-sm mt-6 mb-4 relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-xs text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full max-w-sm bg-white hover:bg-gray-50 border border-gray-400 py-2 rounded-lg shadow-sm flex items-center justify-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-600">Login with Google</span>
          </button>

          <div className="mt-8 text-center text-xs text-blue-600 space-x-4">
            <a href="#" className="hover:text-yellow-500 hover:underline">Conditions of Use</a>
            <a href="#" className="hover:text-yellow-500 hover:underline">Privacy Notice</a>
            <a href="#" className="hover:text-yellow-500 hover:underline">Help</a>
          </div>
          <p className="mt-3 text-center text-xs text-gray-600">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </p>
        </>
      )}

      {/* password screen */}

      {step === 2 && (
        <>
          <div className="w-full max-w-sm border border-gray-300 rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Sign in</h2>

            {/* Show email with change option */}
            <div className="mb-4 pb-3">
              <div className="text-sm">
                <span className="font-semibold">{email}</span>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setPassword('');
                    setError('');
                  }}
                  className="ml-3 text-sm text-blue-600 hover:text-yellow-500"
                >
                  Change
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 mb-2">
                {error}
              </p>

            )}

            <form onSubmit={handleEmailSignIn}>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[15px] font-semibold">Password</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-yellow-500 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded mb-4 text-sm  shadow-sm"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-sm mt-4 leading-relaxed">
              By continuing, you agree to Amazon's{' '}
              <a href="#" className="text-blue-600 hover:text-yellow-500 hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-yellow-500 hover:underline">
                Privacy Notice
              </a>.
            </p>

            <div className="mt-4 flex items-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <img
                  src="/videoicon.png"
                  alt="video help"
                  className="h-2 w-2"
                />
              </div>
              <span className="text-sm text-blue-600 cursor-pointer">
                Need help?
              </span>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="w-full max-w-sm mt-6 mb-4 relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-xs text-gray-600">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full max-w-sm bg-white hover:bg-gray-50 border  border-gray-400 py-2 rounded shadow-sm flex items-center justify-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm text-gray-600">Login with Google</span>
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
        </>
      )}
    </div>
  );


}

export default SignIn;