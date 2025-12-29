import axios from "axios";
import { useCart } from '../contexts/CartContext';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


function Cart() {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();


  // state for extra products
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [browsingProducts, setBrowsingProducts] = useState([]);
  const [visibleBrowsingProducts, setVisibleBrowsingProducts] = useState([]);
  const browsingContainerRef = useRef(null);
  const currentBrowsingPage = useRef(0);


  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/products`);
      const allProducts = response.data.products;

      setRecentlyViewed(allProducts.slice(17, 21));

      setBrowsingProducts(allProducts.slice(4, 12));
    } catch (err) {
      console.error('Error fetching recommendations', err);
    }
  };

  //calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // update quantity
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { _id: productId, quantity: newQuantity }
    });
  };

  //delete item
  const handleDelete = (productId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { _id: productId }
    });
  };

  // Horizontal scroll for browsing products
  const scrollLeft = () => {
    if (browsingContainerRef.current && currentBrowsingPage.current > 0) {
      currentBrowsingPage.current -= 1;
      const startIndex = currentBrowsingPage.current * 4;
      setVisibleBrowsingProducts(browsingProducts.slice(startIndex, startIndex + 4));
    }
  };

  const scrollRight = () => {
    if (browsingContainerRef.current && browsingProducts.length > (currentBrowsingPage.current + 1) * 4) {
      currentBrowsingPage.current += 1;
      const startIndex = currentBrowsingPage.current * 4;
      setVisibleBrowsingProducts(browsingProducts.slice(startIndex, startIndex + 4));
    }
  };

  // Update visible products when browsingProducts changes
  useEffect(() => {
    setVisibleBrowsingProducts(browsingProducts.slice(0, 4));
  }, [browsingProducts]);



  //proceed to buy
  const handleProceedToBuy = () => {
    //check if user is logged in
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      alert('Please sign in to proceed to checkout');
      navigate('/signin');
      return;
    }
    navigate('/checkout');
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* empty cart state */}
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-medium mb-4">Your Amazon Cart is empty</h2>
            <button
              onClick={() => navigate('/home')}
              className="text-blue-600 hover:text-orange-600 hover:underline"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT COLUMN - cart items (Wider - 8 columns) */}
            <div className="lg:col-span-8">

              {/* HEADER: Shopping Cart and Price */}
              <div className="flex justify-between items-center mb-4 pb-3 border-b">
                <h1 className="text-2xl font-medium">Shopping Cart</h1>
                <span className="text-gray-700">Price</span>
              </div>

              {/* cart item lists */}
              {cart.map((item) => (
                <div key={item._id} className="border-b py-4">
                  <div className="flex gap-6">

                    {/* Product image */}
                    <div
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="w-40 h-40 flex-shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200?text=Product';
                        }}
                      />
                    </div>

                    {/* MIDDLE SECTION - product details */}
                    <div className="flex-1">
                      <h3
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="text-2xl font-normal text-gray-900 mb-2 hover:text-orange-600 cursor-pointer line-clamp-2"
                      >
                        {item.description}
                      </h3>



                      {/* shipping info */}
                      <p className="text-sm text-red-400 mb-2">
                        Usually ships within 4 to 5 days
                      </p>

                      {/* seller info */}
                      <p className="text-xs text-gray-600 mb-3">
                        Sold by <span className="text-blue-600">Monatik LLC</span>
                      </p>

                      <p className="text-xs text-gray-600 mb-3">
                        Color: <span className="font-semibold">Black</span>
                      </p>

                      {/* quantity selector */}
                      <div className="flex items-center gap-4 flex-wrap">

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center text-lg leading-none"
                            disabled={item.quantity <= 1}
                          >
                            –
                          </button>

                          <span className="px-2 text-sm font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center text-lg leading-none"
                          >
                            +
                          </button>
                        </div>

                        {/* action links*/}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-sm text-blue-600 hover:text-orange-600 hover:underline"
                        >
                          Delete
                        </button>
                        <button className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
                          Save for later
                        </button>
                        <button className="text-sm text-blue-600 hover:text-orange-600 hover:underline">
                          Share
                        </button>
                      </div>
                    </div>

                    {/* right section - price*/}
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* subtotal */}
              <div className="text-right py-4">
                <p className="text-lg">
                  Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}):
                  <span className="font-bold ml-2">₹{subtotal.toLocaleString()}</span>
                </p>
              </div>


              <div className="text-sm text-gray-600 leading-relaxed mt-2">
                The price and availability of items at Amazon.in are subject to change.
                The Cart is a temporary place to store a list of your items and reflects
                each item's most recent price.
                <br /><br />
                Do you have a gift card or promotional code? We'll ask you to enter your
                claim code when it's time to pay.
              </div>
            </div>

            {/* right column*/}
            <div className="lg:col-span-4">

              {/* sub total */}
              <div className="border border-gray-300 rounded p-4 bg-white sticky top-4 mb-6">
                <p className="text-lg mb-4">
                  Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''}):
                  <span className="font-bold ml-2">₹{subtotal.toLocaleString()}</span>
                </p>

                {/* proceed to buy */}
                <button
                  onClick={handleProceedToBuy}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded text-sm font-medium"
                >
                  Proceed to Buy
                </button>
              </div>

              {/* customer bought*/}
              <div className="border border-gray-300 rounded p-4 bg-white mb-6">
                <h3 className="font-bold text-base mb-4">
                  Customers Who Brought Items in Your Recent History Also Bought
                </h3>

                {browsingProducts.slice(0, 2).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex gap-3 mb-4 pb-4 border-b last:border-b-0 cursor-pointer"
                  >

                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* product info*/}
                    <div className="flex-1">
                      <h4 className="text-sm text-blue-600 hover:text-orange-600 line-clamp-2 mb-1">
                        {product.name}
                      </h4>

                      {/* rating */}
                      <div className="flex items-center mb-1">
                        <div className="flex text-orange-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">{product.reviewCount}</span>
                      </div>

                      {/* price */}
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        ₹{product.price.toLocaleString()}
                      </p>


                      <button className="text-xs text-blue-600 hover:underline">
                        See all buying options
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* recently viewed items */}

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Your recently viewed items</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentlyViewed.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className=" p-3 hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* product image*/}
                <div className="w-full h-48 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>


                <h3 className="text-sm text-blue-600 hover:text-orange-600 line-clamp-2 mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2">
                  <div className="flex text-orange-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">{product.reviewCount}</span>
                </div>


                <p className="text-lg font-bold mb-2">₹{product.price.toLocaleString()}</p>

                {/* delivery info*/}
                <p className="text-xs text-gray-600 mb-2">Get it Oct 6 - 12</p>
                <p className="text-xs text-gray-600 mb-3">FREE Shipping</p>

                {/* add to cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: 'ADD_ITEM',
                      payload: { ...product, quantity: 1 }
                    });
                    alert('Added to cart!');
                  }}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-1 rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* customer who viewed*/}

        {browsingProducts.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Customers who viewed items in your browsing history also viewed
              </h2>
              <span className="text-sm text-gray-600">Page 1 of 2</span>
            </div>

            <div className="relative group w-full">

              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* product container*/}
              <div className="flex gap-2 overflow-hidden  w-full justify-around" ref={browsingContainerRef}>
                {visibleBrowsingProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="min-w-[200px] flex-shrink-0 border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-full h-48 mb-3 rounded overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=Product'}
                      />
                    </div>
                    <h3 className="text-sm text-blue-600 hover:text-orange-600 line-clamp-2 mb-2 font-medium">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-orange-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>


              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Cart;