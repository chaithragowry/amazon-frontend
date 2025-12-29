import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useLocation } from 'react-router-dom';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';


function CategoryPage() {
  const { category } = useParams(); // Get category from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useCart();

  // state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  //filter state
  const [filters, setFilters] = useState({
    priceRange: 'all',
    minRating: 0,
    discount: 'all'
  });

  // get search quey from url
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // fetch products when page loads
  useEffect(() => {
    fetchCategoryProducts();
  }, [category]); // Re-fetch when category changes

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);

      // Get all products
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/products`);

      // FILTER by category (if not "All")
      let filteredProducts = response.data.products;
     if (category !== 'All') {
  filteredProducts = response.data.products.filter(
    p => p.category === category || 
      
      (category === 'Home Appliances' && (p.category === 'Home Appliances' || p.category === 'Home & Kitchen')) ||
      (category === 'Bags' && p.category === 'Fashion') ||
      (category === 'Sports' && ['Electronics', 'Fashion', 'Home Appliances'].includes(p.category))
  );
}


      setProducts(filteredProducts);
      console.log(`Found ${filteredProducts.length} products in ${category}`);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  //filter products based on user selection
  const getFilteredProducts = () => {
    return products.filter(product => {

      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      //price filter
      if (filters.priceRange === 'under1000' && product.price >= 1000) return false;
      if (filters.priceRange === '1000-5000' && (product.price < 1000 || product.price >= 5000)) return false;
      if (filters.priceRange === '5000-10000' && (product.price < 5000 || product.price >= 10000)) return false;
      if (filters.priceRange === '10000-20000' && (product.price < 10000 || product.price >= 20000)) return false;

      //rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) return false;

      //discount filter
      if (filters.discount !== 'all' && product.originalPrice > 0) {
        const discountPercent = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        const minDiscount = parseInt(filters.discount);
        if (discountPercent < minDiscount) return false;
      }

      return true;
    });
  };

  const filteredProducts = getFilteredProducts();

  // add to cart function
  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 }
    });
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Shows navigation path */}
      <div className="max-w-[1500px] mx-auto px-4 py-2 text-sm">
        <button onClick={() => navigate('/home')} className="text-blue-600 hover:text-orange-600 hover:underline">
          Amazon Home
        </button>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{category}</span>
      </div>


      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      )}


      {error && (
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* main content */}
      {!loading && !error && (
        <div className="max-w-[1500px] mx-auto px-4 pb-8">


          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {searchQuery ? `Search results for "${searchQuery}"` :
                category === 'All' ? 'All Products' : category}
            </h1>
            <p className="text-sm text-gray-600">
              {filteredProducts.length} results
              {filteredProducts.length !== products.length && ` (filtered from ${products.length} total)`}
            </p>
          </div>


          <div className="flex gap-6">

            {/* left sidebar- Filters */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="border border-gray-300 rounded p-4">



                {/* customer review filter */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Customer Reviews</h3>

                  {/* 4 star & up */}
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="mr-2"
                      checked={filters.minRating === 4}
                      onChange={() => setFilters({ ...filters, minRating: 4 })}
                    />
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4].map(i => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>

                      </div>
                      <span className="ml-2">& up</span>
                    </div>
                  </label>

                  {/* 3 stars & upm*/}
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="mr-2"
                      checked={filters.minRating === 3}
                      onChange={() => setFilters({ ...filters, minRating: 3 })}
                    />
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3].map(i => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        {[4, 5].map(i => (
                          <svg key={i} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2">& Up</span>
                    </div>
                  </label>


                  {/* 2 stars & up*/}

                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="mr-2"
                      checked={filters.minRating === 2}
                      onChange={() => setFilters({ ...filters, minRating: 2 })}
                    />
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2].map(i => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        {[3, 4, 5].map(i => (
                          <svg key={i} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2">& Up</span>
                    </div>
                  </label>

                  {/* All Ratings */}
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      className="mr-2"
                      checked={filters.minRating === 0}
                      onChange={() => setFilters({ ...filters, minRating: 0 })}
                    />
                    <span>All Ratings</span>
                  </label>
                </div>

                {/* PRICE FILTER */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Price</h3>
                  <label className="flex items-center text-sm mb-2 cursor cursor-pointer">
                    <input type="radio" name="price" className="mr-2"
                      checked={filters.priceRange === 'all'}
                      onChange={() => setFilters({ ...filters, priceRange: 'all' })}
                    />
                    <span>All prices</span>
                  </label>

                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="price" className="mr-2"
                      checked={filters.priceRange === 'under1000'}
                      onChange={() => setFilters({ ...filters, priceRange: 'under1000' })}
                    />
                    <span>Under ₹1000</span>
                  </label>

                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="price" className="mr-2"
                      checked={filters.priceRange === '1000-5000'}
                      onChange={() => setFilters({ ...filters, priceRange: '1000-5000' })}
                    />
                    <span>₹1000 - ₹5000</span>
                  </label>

                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === '5000-10000'}
                      onChange={() => setFilters({ ...filters, priceRange: '5000-10000' })}
                    />
                    <span>₹5,000 - ₹10,000</span>
                  </label>

                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      className="mr-2"
                      checked={filters.priceRange === '10000-20000'}
                      onChange={() => setFilters({ ...filters, priceRange: '10000-20000' })}
                    />
                    <span>₹10,000 - ₹20,000</span>
                  </label>
                </div>



                {/* Discount */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Discount</h3>
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="discount" className="mr-2"
                      checked={filters.discount === 'all'}
                      onChange={() => setFilters({ ...filters, discount: 'all' })}
                    />
                    <span>All discounts</span>
                  </label>
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="discount" className="mr-2"
                      checked={filters.discount === '10'}
                      onChange={() => setFilters({ ...filters, discount: '10' })}
                    />
                    <span>10% off or more</span>
                  </label>
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="discount" className="mr-2"
                      checked={filters.discount === '25'}
                      onChange={() => setFilters({ ...filters, discount: '25' })}
                    />
                    <span>25% off or more</span>
                  </label>
                  <label className="flex items-center text-sm mb-2 cursor-pointer">
                    <input type="radio" name="discount" className="mr-2"
                      checked={filters.discount === '50'}
                      onChange={() => setFilters({ ...filters, discount: '50' })} />
                    <span>50% off or more</span>
                  </label>

                </div>

              </div>
            </div>

            {/* right side*/}
            <div className="flex-1 ">

              {/* no products message*/}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600">No products match your filters</p>
                  <button
                    onClick={() => setFilters({ priceRange: 'all', minRating: 0, discount: 'all' })}
                    className="mr-4 text-blue-600 hover:underline"
                  >
                    Clear filters
                  </button>
                  <button
                    onClick={() => navigate('/home')}
                    className="text-blue-600 hover:underline"
                  >
                    Back to Home
                  </button>
                </div>
              )}

              {/* products grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt">

                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border border-gray-200 rounded p-4 hover:shadow-lg transition-shadow bg-white flex flex-col"
                  >

                    {/* product image - Left side */}
                    <div
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="w-full h-48 cursor-pointer rounded "
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300?text=Product';
                        }}
                      />
                    </div>

                    {/* product details  */}
                    <div className="flex-1 space-y-2">

                      {/* product name - Clickable */}
                      <h3
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="text-lg font-medium text-gray-900 mb-2 hover:text-orange-600 cursor-pointer line-clamp-2"
                      >
                        {product.name}
                      </h3>

                      {/* rating stars */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
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
                          {product.reviewCount?.toLocaleString()}
                        </span>
                      </div>

                      {/* bought text*/}
                      <p className="text-xs text-gray-600 mb-3">
                        {product.reviewCount > 100 ? `${Math.floor(product.reviewCount / 10)}+ bought in past month` : ''}
                      </p>

                      {/* price section */}
                      <div className="mb-3">
                        <div className="flex items-baseline gap-2">
                          {/* Discount percentage */}
                          {product.originalPrice > 0 && (
                            <span className="text-sm font-medium text-red-600">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </span>
                          )}

                          {/* Current price */}
                          <span className="text-2xl font-medium">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>

                        {/* Original price - strikethrough */}
                        {product.originalPrice > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>M.R.P.:</span>
                            <span className="line-through">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* free delivery text */}
                      <p className="text-sm mb-3">
                        <span className="font-medium">FREE delivery</span>
                        <span className="text-gray-600"> by </span>
                        <span className="font-bold">Sat, 14 Sept, 7:00 am - 9:00 pm</span>
                      </p>

                      {/* stock status */}
                      {product.inStock ? (
                        <p className="text-sm text-green-700 font-medium mb-4">In Stock</p>
                      ) : (
                        <p className="text-sm text-red-600 font-medium mb-4">Out of Stock</p>
                      )}


                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className={`px-6 py-2 rounded text-sm font-medium ${product.inStock
                            ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <PersonalizedRecommendations
        onSignIn={() => navigate('/signin')}
        onSignUp={() => navigate('/signup')}
        isLoggedIn={!!user}
      />

      <Footer />
    </div>
  );
}

export default CategoryPage;