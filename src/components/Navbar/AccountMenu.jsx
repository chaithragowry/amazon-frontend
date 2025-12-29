

function AccountMenu({ user, isHover, setIsHover, onSignIn, onSignUp, onLogout }) {

  return (

    <div className="hidden md:flex flex-col border border-transparent hover:border-white p-2 cursor-pointer relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>

      <button
        onClick={user ? onLogout : onSignIn}
        className="flex flex-col text-left"
      >
        <span className="text-xs">Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</span>
        <span className="text-sm font-bold">Account & Lists
          <svg
            className="w-3 h-3 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.146l3.71-3.916a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </span>
      </button>


      {/* DROPDOWN PANEL */}
      {isHover && (
        <div className="absolute left-0 mt-16 w-[420px] bg-white text-black rounded-sm shadow-2xl  -translate-x-1/2 border border-gray-200 z-40 min-w-[300px] max-w-[420px]">
          {/* top: sign-in button */}

          {user ? (
            <div className="px-6 py-4 text-center border-b border-gray-200">
              <button
                onClick={() => { }}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium py-2 rounded-md"
              >
                Manage Your Account
              </button>
              <p className="mt-2 text-xs text-gray-600">
                Welcome back, {user.name.split(' ')[0]}!
              </p>
            </div>
          ) : (
            <div className="px-6 py-4 text-center border-b border-gray-200">
              <button
                onClick={onSignIn}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-sm font-medium py-2 rounded-md"
              >
                Sign in
              </button>
              <p className="mt-2 text-xs">
                New customer?{' '}
                <button onClick={onSignUp} className="text-blue-600 hover:text-orange-600">
                  Start here.
                </button>
              </p>
            </div>
          )}

          {/* bottom: two-column menu */}
          <div className="flex px-6 py-4 text-sm">
            {/* LEFT COLUMN – Your Lists */}
            <div className="w-1/2 pr-4 border-r border-gray-200">
              <h3 className="font-bold mb-2 text-gray-900 text-sm">Your Lists</h3>
              <ul className="space-y-1 text-xs text-gray-800">
                <li>Create a Wish List</li>
                <li>Wish from Any Website</li>
                <li>Baby Wishlist</li>
                <li>Discover Your Style</li>
                <li>Explore Showroom</li>
              </ul>
            </div>

            {/* RIGHT COLUMN – Your Account */}
            <div className="w-1/2 pl-4">
              <h3 className="font-bold mb-2 text-gray-900 text-sm">Your Account</h3>
              <ul className="space-y-1 text-xs text-gray-800">
                <li>Your Account</li>
                <li>Your Orders</li>
                <li>Your Wish List</li>
                <li>Recommendations</li>
                <li>Your Prime Membership</li>
                <li>Your Subscribe & Save</li>
                <li>Memberships & Subscriptions</li>
                <li>Your Seller Account</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;