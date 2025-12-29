import { FaGlobe } from 'react-icons/fa';

function Footer() {

  return (

    <footer className="bg-[#232f3e] text-white mt-12">
      {/* Back to top */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-[#37475a] hover:bg-[#485769] text-center py-3 cursor-pointer text-sm"
      >
        Back to Top
      </div>

      {/* Main link columns */}
      <div className="max-w-[1200px] mx-auto px-8 py-10 border-b border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[16px]">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-2">Get to Know Us</h3>
            <ul className="space-y-1 text-[14px] text-gray-200">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
              <li><a href="#" className="hover:underline">Amazon Science</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-2">Connect with Us</h3>
            <ul className="space-y-1 text-[14px] text-gray-200">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-2">Make Money with Us</h3>
            <ul className="space-y-1 text-[14px] text-gray-200">
              <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-2">Let Us Help You</h3>
            <ul className="space-y-1 text-[14px] text-gray-200">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Returns Centre</a></li>
              <li><a href="#" className="hover:underline">Recalls and Product Safety Alerts</a></li>
              <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:underline">Amazon App Download</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logo + language + country row */}
      <div className="border border-gray-700">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex  md:flex-row  justify-center gap-10">
          <img
            src="/Amazon.png"
            alt="Amazon"
            className="w-20"
          />

          <div className="flex items-center gap-2 text-xs">
            <button className="border border-gray-500 px-3 py-1 rounded flex items-center gap-1">
              <FaGlobe /><span>English</span>
            </button>
            <button className="border border-gray-500 px-3 py-1 rounded flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="13" viewBox="0 0 24 24">
                <rect width="24" height="8" y="0" fill="#FF9933" />
                <rect width="24" height="8" y="8" fill="#FFFFFF" />
                <rect width="24" height="8" y="16" fill="#138808" />
                <circle cx="12" cy="12" r="2.5" stroke="#000080" stroke-width="0.5" fill="none" />
              </svg>
              <span>India</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom mini-links rows */}
      <div className="w-full mx-auto px-28 py-6 text-[11px] text-gray-300 bg-[#131921]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-4">
          <div>
            <p className="font-semibold text-gray-200">AbeBooks</p>
            <p>Books, art</p>
            <p>&amp; collectibles</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Amazon Web Services</p>
            <p>Scalable Cloud</p>
            <p>Computing Services</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Audible</p>
            <p>Download</p>
            <p>Audio Books</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">IMDb</p>
            <p>Movies, TV</p>
            <p>&amp; Celebrities</p>
          </div>

          <div>
            <p className="font-semibold text-gray-200">Shopbop</p>
            <p>Designer</p>
            <p>Fashion Brands</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Amazon Business</p>
            <p>Everything For</p>
            <p>Your Business</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Prime Now</p>
            <p>2-Hour Delivery</p>
            <p>on Everyday Items</p>
          </div>
          <div>
            <p className="font-semibold text-gray-200">Amazon Prime Music</p>
            <p>100 million songs, ad-free</p>
            <p>Over 15 million podcast episodes</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:underline">Conditions of Use &amp; Sale</a>
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Interest-Based Ads</a>
        </div>

        <p className="text-center text-[10px] text-gray-400">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  )
}

export default Footer;