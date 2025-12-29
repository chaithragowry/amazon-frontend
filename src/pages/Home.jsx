import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategoryCard from '../components/CategoryCard';
import RelatedProductCard from '../components/RelatedProductCard';
import Footer from '../components/Footer';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // REF for horizontal scrolling
  const scrollRefViewed = useRef(null);
  const scrollRefMore = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    // Check every 500ms-catches logout instantly
    const interval = setInterval(checkUser, 500);
    return () => clearInterval(interval);
  }, []);


  // Fetch products from backend when component loads
  useEffect(() => {
    fetchProducts();
  }, []); // Empty array = run once on mount

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // API call to backend

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/products`);

      console.log('Products fetched:', response.data.products.length);
      setProducts(response.data.products);
      setError('');
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    navigate('/category/All');
  };

  //  Horizontal scroll function for "Recently Viewed" section
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left'
        ? ref.current.scrollLeft - scrollAmount
        : ref.current.scrollLeft + scrollAmount;
      ref.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  // organize the products  by category for the 4-card grid
  const electronicsProducts = products.filter(p => p.category === 'Electronics');
  const fashionProducts = products.filter(p => p.category === 'Fashion');
  const homeProducts = products.filter(p => p.category === 'Home Appliances' || p.category === 'Home & Kitchen');
  const otherProducts = products.filter(p =>
    !['Electronics', 'Fashion', 'Home Appliances', 'Home & Kitchen'].includes(p.category)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR - Sticky at top */}
      <Navbar />

      {/* LOADING STATE - Shows while fetching products */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading amazing deals...</p>
        </div>
      )}

      {/* ERROR STATE - Shows if API call fails */}
      {error && (
        <div className="max-w-[1500px] mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button
              onClick={fetchProducts}
              className="ml-4 underline"
            >
              Try Again
            </button>
          </div>
        </div>
      )}


      {!loading && !error && (
        <>
          {/* HERO CAROUSEL - Big promotional slider */}
          <HeroCarousel />

          <div className="max-w-[1500px] mx-auto px-4 -mt-28 relative z-10">

            {/* 2 rows × 2 columns of category cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

              {/* CARD 1: Electronics */}
              {electronicsProducts.length >= 4 && (
                <CategoryCard
                  title="Electronics & Accessories"
                  products={electronicsProducts}
                  category="Electronics"
                />
              )}

              {/* CARD 2: Fashion */}
              {fashionProducts.length >= 4 && (
                <CategoryCard
                  title="Up to 60% off | Styles for women"
                  products={fashionProducts}
                  category="Fashion"
                />
              )}

              {/* CARD 3: Home Appliances */}
              {homeProducts.length >= 4 && (
                <CategoryCard
                  title="Appliances for your home | Up to 55% off"
                  products={homeProducts}
                  category="Home Appliances"
                />
              )}

              {/* CARD 4: Other Products */}
              {otherProducts.length >= 1 && (
                <CategoryCard
                  title="Starting ₹99 | Amazon Brands & more"
                  products={otherProducts}
                  category="All"
                />
              )}
            </div>

            {/* recently viewed - Horizontal scroll */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Related to items you've viewed
                </h2>
                <button onClick={handleSeeMore} className="text-blue-600 hover:text-blue-800 text-sm">
                  See more
                </button>
              </div>

              {/* horizontal scrolling  with arrow buttons */}
              <div className="relative group ">
                {/* LEFT ARROW - Appears on hover */}
                <button
                  onClick={() => scroll(scrollRefViewed, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* FRAME: decides if scrollbar is visible */}
                <div
                  ref={scrollRefViewed}
                  className="flex gap-4 overflow-x-auto  scrollbar-thin scrollbar-hide-hover scroll-smooth h-64"
                >
                  {products.slice(0, 12).map((product) => (
                    <RelatedProductCard key={product._id} product={product} />
                  ))}
                </div>


                {/* RIGHT ARROW - Appears on hover */}
                <button
                  onClick={() => scroll(scrollRefViewed, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>




            {/* more items- Horizontal scroll */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  More items to consider
                </h2>
                <button onClick={handleSeeMore} className="text-blue-600 hover:text-blue-800 text-sm">
                  See more
                </button>
              </div>

              <div className="relative group">
                {/* LEFT ARROW */}
                <button
                  onClick={() => scroll(scrollRefMore, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/*decides if scrollbar is visible */}
                <div
                  ref={scrollRefMore}
                  className="flex gap-4 overflow-x-auto  scrollbar-thin scrollbar-hide-hover scroll-smooth h-64"
                >
                  {products.slice(7, 14).map((product) => (
                    <RelatedProductCard key={product._id} product={product} />
                  ))}
                </div>


                {/* RIGHT ARROW */}
                <button
                  onClick={() => scroll(scrollRefMore, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* best sellers - Horizontal scroll */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 ">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Best Sellers in Computers & Accessories
                </h2>
                <button onClick={handleSeeMore} className="text-blue-600 hover:text-blue-800 text-sm">
                  See more
                </button>
              </div>

              {/* horizontal scrolling with arrow buttons */}
              <div className="relative group ">
                {/* LEFT ARROW - Appears on hover */}
                <button
                  onClick={() => scroll(scrollRefViewed, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/*  decides if scrollbar is visible */}
                <div
                  ref={scrollRefViewed}
                  className="flex gap-4 overflow-x-auto  scrollbar-thin scrollbar-hide-hover scroll-smooth h-64"
                >
                  {products.slice(13, 21).map((product) => (
                    <RelatedProductCard key={product._id} product={product} />
                  ))}
                </div>


                {/* RIGHT ARROW - Appears on hover */}
                <button
                  onClick={() => scroll(scrollRefViewed, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>


            {/* message if no product */}
            {products.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <p className="text-gray-600 text-lg">No products available</p>
                <button
                  onClick={fetchProducts}
                  className="mt-4 bg-[#ffd814] hover:bg-[#f7ca00] px-6 py-2 rounded"
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        </>
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

export default Home;