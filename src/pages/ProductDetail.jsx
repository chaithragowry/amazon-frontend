import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { dispatch } = useCart();


  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // fetch product when page loads
  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(response.data.product);
      console.log('Product loaded:', response.data.product.name);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  // add to cart function
  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity }
    });
    alert(`Added ${quantity} items to cart!`);
  };

  // buy now - Add to cart then go to cart page
  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  // Calculate discount percentage
  const discountPercent = product?.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
          <p className="text-xl text-gray-600">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/home')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* breadcrumb */}
      <div className="max-w-[1500px] mx-auto px-4 py-3 text-sm">
        <button onClick={() => navigate('/home')} className="text-blue-600 hover:underline">
          Home
        </button>
        <span className="mx-2">›</span>
        <button onClick={() => navigate(`/category/${product.category}`)} className="text-blue-600 hover:underline">
          {product.category}
        </button>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* main content */}
      <div className="max-w-[1500px] mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* left column */}
          <div className="lg:col-span-5">
            <div className="sticky top-4">
              {/* main page */}
              <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[600px]"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500?text=Product+Image';
                  }}
                />
              </div>
            </div>
          </div>

          {/* middle column */}
          <div className="lg:col-span-4">


            <p className="text-sm text-blue-600 hover:underline cursor-pointer mb-1">
              Visit the Amazon Brand Store
            </p>


            <h1 className="text-2xl font-normal text-gray-900 mb-3">
              {product.name}
            </h1>


            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-orange-500 mr-1">{product.rating}</span>
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-blue-600">
                  {product.reviewCount?.toLocaleString()} ratings
                </span>
              </div>
            </div>

            <hr className="my-4" />

            {/* price section*/}
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                {discountPercent > 0 && (
                  <span className="text-red-600 text-sm font-medium">
                    -{discountPercent}%
                  </span>
                )}
                <span className="text-3xl font-normal text-red-600">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              {product.originalPrice > 0 && (
                <p className="text-sm text-gray-600">
                  M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
                </p>
              )}

              <p className="text-xs text-gray-600 mt-1">All prices include VAT.</p>
            </div>

            {/* promo banner */}
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-sm font-semibold text-red-700 mb-1">
                Sign in to redeem
              </p>
              <p className="text-sm">
                <span className="font-bold">Extra 20% off</span> with meem credit cards
              </p>
              <p className="text-xs text-gray-600">
                Enter code <span className="font-mono font-bold">MEEM20</span> at checkout. Discount by Amazon.
              </p>
            </div>

            <hr className="my-4" />

            {/* product details */}
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-3">Product details</h2>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-semibold w-1/3">Material composition</td>
                    <td className="py-2">95% Polyester, 1% Elastane</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Colour style</td>
                    <td className="py-2">Pull On</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Neck style</td>
                    <td className="py-2">Scoop Neck</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">Sleeve type</td>
                    <td className="py-2">Short Sleeve</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* about the item*/}
            <div className="mb-6">
              <h2 className="font-bold text-lg mb-3">About this item</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>{product.description}</li>
                <li>High-quality materials for durability</li>
                <li>Perfect for everyday use</li>
                <li>Easy to clean and maintain</li>
              </ul>
            </div>

            <hr className="my-6" />


          </div>

          {/* right column */}
          <div className="lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 sticky top-4">

              {/* price*/}
              <div className="mb-4">
                <span className="text-2xl font-normal text-red-600">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              {/* free delivery */}
              <div className="mb-4 text-sm">
                <p className="text-green-700 font-semibold mb-1">FREE delivery</p>
                <p className="font-bold">6-9 October</p>
                <p className="text-blue-600 cursor-pointer hover:underline mt-1">
                  Deliver to India
                </p>
              </div>

              {/* stock status */}
              <p className="text-green-700 font-semibold text-sm mb-4">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>

              {product.inStock && (
                <p className="text-sm text-gray-600 mb-4">
                  Usually ships within 4 to 5 days
                </p>
              )}

              {/* quantity selector */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-400 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* add to cart*/}
              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className={`w-full py-2 rounded-full mb-3 font-medium ${product.inStock
                    ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Add to Cart
              </button>

              {/* buy now */}
              <button
                onClick={buyNow}
                disabled={!product.inStock}
                className={`w-full py-2 rounded-full mb-4 font-medium ${product.inStock
                    ? 'bg-[#ffa724] hover:bg-[#fa8900] text-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Buy Now
              </button>

              <hr className="my-4" />

              {/* seller info*/}
              <div className="text-xs space-y-2 text-gray-700">
                <p><span className="font-semibold">Ships from</span> Monatik LLC</p>
                <p><span className="font-semibold">Sold by</span> Monatik LLC</p>
                <p className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-semibold">Payment</span> Secure transaction
                </p>
              </div>

              <hr className="my-4" />


              <button className="w-full py-2 border border-gray-400 rounded hover:bg-gray-50 text-sm">
                Add to List
              </button>

            </div>
          </div>
        </div>


        {/* product decription */}
        <div className='max-w-3xl  mt-8'>
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Product description</h2>
            <p className="text-[14px] leading-relaxed">
              {product.description}.Product Measurements: X-Small: Bicep Length: 20.7", Bust: 34.6", Cuff: 8.5", Hip Size: 48.8", Length: 32.1", Sleeve Length: 12.4", Waist Size: 25.2-37.8"Small: Bicep Length: 21.3", Bust: 36.2", Cuff: 9.1", Hip Size: 50.4", Length: 32.5", Sleeve Length: 12.6", Waist Size: 26.8-39.4"Medium: Bicep Length: 21.8", Bust: 37.8", Cuff: 9.6", Hip Size: 52.0", Length: 32.9", Sleeve Length: 12.8", Waist Size: 28.3-40.9"Large: Bicep Length: 22.7", Bust: 40.2", Cuff: 10.5", Hip Size: 54.4", Length: 33.5", Sleeve Length: 13.1", Waist Size: 30.7-43.3"
            </p>
          </div>

          {/* looking for specific info */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-3">Looking for specific info?</h2>
            <input
              type="text"
              placeholder="Search in reviews, Q&A..."
              className="w-full h-8 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* customer reviews */}
          <div className="mb-6 ">
            <h2 className="font-bold text-lg mb-3">Customer reviews</h2>
            <div className="flex items-center mb-4">
              <div className="flex text-orange-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-3 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-bold">{product.rating} out of 5</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {product.reviewCount?.toLocaleString()} global ratings
            </p>

            {/* review bar */}
            <div className="space-y-2 text-sm">
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-12">{stars} star</span>
                  <div className="flex-1 bg-gray-200  h-5 max-w-60">
                    <div
                      className="bg-orange-400 h-5"
                      style={{ width: `${stars === 5 ? 70 : stars * 10}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-blue-600">{stars === 5 ? '70%' : `${stars * 10}%`}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>

  );
}

export default ProductDetail;