
function PersonalizedRecommendations({ onSignIn, onSignUp, isLoggedIn }) {
  // Don't show if user is already logged in
  if (isLoggedIn) return null;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-12 text-center border-t border-gray-300">
      <div className="max-w-md mx-auto px-4">
        {/* Heading */}
        <h2 className="text-base text-gray-700 mb-4">
          See personalized recommendations
        </h2>

        {/* Sign In Button */}
        <button
          onClick={onSignIn}
          className="w-4/5 bg-yellow-400 text-black hover:bg-yellow-500 text-sm font-medium py-2 px-4 rounded border border-[#a88734] shadow-sm transition-colors mb-3"
        >
          Sign in
        </button>

        {/* New Customer Link */}
        <p className="text-xs text-gray-700">
          New customer?{' '}
          <button
            onClick={onSignUp}
            className="text-[#007185] hover:text-[#C7511F] hover:underline font-normal"
          >
            Start here.
          </button>
        </p>
      </div>
    </div>
  );
}

export default PersonalizedRecommendations;