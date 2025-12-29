import { useNavigate } from 'react-router-dom';

function CategoryCard({ title, products, category }) {

  const navigate = useNavigate();

  const displayProducts = products.slice(0, 4);

  // Navigate to category page when "Explore all" is clicked
  const handleExploreAll = () => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-shadow">

      {/* card title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/*Shows 4 small product images */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {displayProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="cursor-pointer group"
          >
            {/* product image */}
            <div className="aspect-square overflow-hidden rounded bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/no-image.jpg';
                }}
              />
            </div>

            <p className="text-xs mt-2 text-gray-700 line-clamp-2">
              {product.name}
            </p>
          </div>
        ))}
      </div>

      {/* EXPLORE ALL LINK - Blue clickable text */}
      <button
        onClick={handleExploreAll}
        className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline font-medium"
      >
        Explore all
      </button>
    </div>
  );
}

export default CategoryCard;