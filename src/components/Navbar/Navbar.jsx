
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import AccountMenu from './AccountMenu';
import AllSideMenu from './AllSideMenu';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [isAccountHover, setIsAccountHover] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { cart, dispatch } = useCart();


  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  //handle search 
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert('Please enter a search term');
      return;
    }

    const params = new URLSearchParams({
      search: searchQuery.trim()
    });

    const categoryPath = searchCategory === 'All' ? 'All' : searchCategory;
    navigate(`/category/${categoryPath}?${params.toString()}`);

  };

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleAccountClick = () => {
    navigate('/signin');
  };


  return (
    <nav className='bg-[#131921] text-white relative'>
      {/* dark overlay when hover over account & list*/}
      {isAccountHover && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20"
        />
      )}
      <div className='flex items-center justify-between px-4 py-2 relative z-30'>

        {/* logo- amazon*/}
        <div onClick={() => navigate('/home')}
          className='flex items-center cursor-pointer border border-transparent hover:border-white p-1'>
          <img
            src="/Amazon.png"
            alt="Amazon"
            className="w-24 mt-2"
          />
        </div>

        {/* deliver to location */}
        <div className='hidden md:flex items-center border border-transparent hover:border-white  p-2 cursor-pointer'>
          <div className='text-sm'>
            <p className='text-gray-300'>Deliver to India</p>
            <div className='flex gap-1'><FaMapMarkerAlt /><span className='font-semibold'>Update location</span></div>
          </div>
        </div>

        {/* search bar */}
        <form onSubmit={handleSearch} className='flex-1 max-w-2xl'>
          <div className='flex'>
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className='bg-gray-200 text-black px-2 py-3 rounded-l-md text-sm  w-20 border-r-0  border-gray-300 focus:outline-none'>
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home Appliances</option>
              <option>Home & Kitchen</option>
              <option>Bags</option>
              <option>Sports</option>
            </select>

            <input type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search Amazon.in'
              className='flex-1 px-2 py-1 text-black outline-none' />

            {/* search button with icon */}
            <button type='submit' className='bg-yellow-400 hover:bg-yellow-500 px-2 py-2 rounded-r'>
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* language selector */}
        <div className="hidden md:flex items-center border border-transparent hover:border-white p-2 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/32px-Flag_of_India.svg.png"
            alt="IN"
            className="w-6 h-4 mr-1"
          />
          <span className="text-sm">EN</span>
        </div>

        <AccountMenu
          user={user}
          isHover={isAccountHover}
          setIsHover={setIsAccountHover}
          onSignIn={handleAccountClick}
          onSignUp={() => navigate("/signup")}
          onLogout={handleLogout} />



        {/*  returns and orders  */}
        <div
          onClick={() => navigate('/orders')}
          className="hidden md:flex flex-col border border-transparent hover:border-white p-2 cursor-pointer"
        >
          <span className="text-xs">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </div>

        {/*  cart icon  */}
        <div onClick={() => navigate('/cart')}
          className='flex items-center border border-transparent hover:border-white p-2 cursor-pointer relative'>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className='absolute top-0 right-0 bg-[#febd69] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>{cartCount}</span>
          )}
          <span className='text-sm font-bold ml-1'>Cart</span>
        </div>


        {/*  cart icon  */}
        {user && (
          <button
            onClick={handleLogout}
            className="ml-2 text-xs bg-yellow-400 text-black px-3 py-2 rounded hover:bg-yellow-500"
          >
            Logout
          </button>
        )}
      </div>
      {/*  second row of navbar */}
      <div className="bg-[#232f3e] px-4 py-2 flex items-center space-x-2 text-sm overflow-x-auto font-semibold">
        <button
          onClick={() => setIsSideMenuOpen(true)}
          className="border border-transparent hover:border-white px-2 py-1 whitespace-nowrap flex items-center">

          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          All
        </button>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Amazon mini TV</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Sell</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Best Sellers</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Today's Sellers</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Mobiles</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Customer Service</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Price</span>
        <span onClick={() => navigate('/category/Electronics')} className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Electronics</span>
        <span onClick={() => navigate('/category/Fashion')} className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Fashion</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">New Releases</span>
        <span onClick={() => navigate('/category/Home Appliances')} className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Home & Kitchen</span>
        <span className="border border-transparent hover:border-white px-2 py-1 cursor-pointer whitespace-nowrap">Amazon Pay</span>
      </div>
      <AllSideMenu
        open={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        user={user}
        onSignIn={handleAccountClick}
        onLogout={handleLogout}
      />

    </nav>
  );
}

export default Navbar;