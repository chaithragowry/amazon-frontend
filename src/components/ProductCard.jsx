import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const navigate = useNavigate();

  // Calculate discount percentage for display
  const discountPercent = product.originalPrice > 0
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Add product to cart in localStorage
  const addToCart = (e) => {
    e.stopPropagation();

    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 }
    });
    alert("Added to cart!");
  };

  // Navigate to product detail page when card is clicked
  const viewProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={viewProduct}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full min-w-[250px]"
    >
      {/* product image - Fixed height for consistency */}
      <div className="relative mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />

        {/* Shows percentage off */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercent}% OFF
          </div>
        )}
      </div>


      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10">
        {product.name}
      </h3>

      {/*  rating stars */}
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400">
          {/* Generate 5 stars based on rating */}
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
        {/* Review count */}
        <span className="text-xs text-gray-600 ml-2">
          ({product.reviewCount?.toLocaleString()})
        </span>
      </div>

      {/* price section */}
      <div className="mb-3 flex-grow">
        <div className="flex items-baseline gap-2">
          {/* Current price - Large and bold */}
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>

          {/* Original price - Strikethrough if discount exists */}
          {product.originalPrice > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>


        <p className="text-xs text-gray-600 mt-1">FREE Delivery</p>
      </div>


      <div className="mb-3">
        {product.inStock ? (
          <p className="text-xs text-green-600 font-semibold">In Stock</p>
        ) : (
          <p className="text-xs text-red-600 font-semibold">Out of Stock</p>
        )}
      </div>

      {/* add to cart */}
      <button
        onClick={addToCart}
        disabled={!product.inStock}
        className={`w-full py-2 rounded text-sm font-medium transition-colors ${product.inStock
            ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

export default ProductCard;