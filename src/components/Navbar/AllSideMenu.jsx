

function AllSideMenu({ open, onClose, user, onSignIn, onLogout }) {
  if (!open) return null;

  return (

    <>
      {/* Dark overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      />

      {/* Slide-out panel */}
      <div className="fixed inset-y-0 left-0 bg-white text-black z-50 shadow-2xl flex flex-col max-w-2xl w-[350px]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#232f3e] text-white">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"
                />
              </svg>
            </div>

            {user ? (
              <button onClick={onClose}
                className="font-semibold text-xl hover:underline text-left">
                Hello, {user.name.split(" ")[0]}
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();  // Close menu first
                  onSignIn(); // Then go to signin
                }}
                className="font-semibold text-xl hover:underline text-left"
              >
                sign in
              </button>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className=" w-10 h-10 flex  justify-center rounded-md border border-gray-300 bg-gray-900 text-white text-3xl leading-none shadow-md
               translate-x-14 -translate-y-0"
          >×
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto text-sm  px-6">
          <div className="border-b px-4 py-4">
            <h3 className="font-bold mb-4 text-gray-900 text-sm">Trending</h3>
            <ul className="space-y-6 text-gray-800">
              <li className="cursor-pointer hover:text-orange-600">Best Sellers</li>
              <li className="cursor-pointer hover:text-orange-600">New Releases</li>
              <li className="cursor-pointer hover:text-orange-600">Movers and Shakers</li>
            </ul>
          </div>

          <div className="border-b px-4 py-3">
            <h3 className="font-bold mb-4 text-gray-900 text-sm">Digital Content and Devices</h3>
            <ul className="space-y-6 text-gray-800">
              <li className="cursor-pointer hover:text-orange-600">Echo &amp; Alexa</li>
              <li className="cursor-pointer hover:text-orange-600">Fire TV</li>
              <li className="cursor-pointer hover:text-orange-600">Kindle E‑Readers &amp; eBooks</li>
              <li className="cursor-pointer hover:text-orange-600">Audible Audiobooks</li>
              <li className="cursor-pointer hover:text-orange-600">Amazon Prime Video</li>
              <li className="cursor-pointer hover:text-orange-600">Amazon Prime Music</li>
            </ul>
          </div>

          <div className="px-4 py-3">
            <h3 className="font-bold mb-4 text-gray-900 text-sm">Shop by Category</h3>
            <ul className="space-y-6 text-gray-800">
              <li className="cursor-pointer hover:text-orange-600">Mobiles, Computers</li>
              <li className="cursor-pointer hover:text-orange-600">TV, Appliances, Electronics</li>
              <li className="cursor-pointer hover:text-orange-600">Men&apos;s Fashion</li>
              <li className="cursor-pointer hover:text-orange-600">Women&apos;s Fashion</li>
            </ul>
          </div>

          <div className="px-4 py-3">
            <h3 className="font-bold mb-4 text-gray-900 text-sm">Help & Settings</h3>
            <ul className="space-y-6 text-gray-800">
              <li className="cursor-pointer hover:text-orange-600">Your Account</li>
              <li className="cursor-pointer hover:text-orange-600">Customer Service</li>
              {user ? (
                <li className="cursor-pointer hover:text-orange-600" onClick={() => {
                  onClose();
                  onLogout();
                }}>Sign out</li>
              ) : (
                <li className="cursor-pointer hover:text-orange-600" onClick={() => { onClose(); onSignIn(); }}>Sign In</li>
              )}

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllSideMenu;