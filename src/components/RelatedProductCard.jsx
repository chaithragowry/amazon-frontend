
import { useNavigate } from 'react-router-dom';

function RelatedProductCard({ product }) {
  const navigate = useNavigate();

  const viewProduct = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={viewProduct}
      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer min-w-[200px] w-full h-48 mb-3"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover rounded"
        onError={(e) => {
          e.target.src = '/no-image.jpg';
        }}
      />
    </div>
  );
}

export default RelatedProductCard;
