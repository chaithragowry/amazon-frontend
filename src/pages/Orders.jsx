import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch orders and user from localstorage when page loads
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');


      if (!user || !user.id) {
        setOrders([]);
        return;
      }
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

      const userOrders = savedOrders.filter(order => order.userId === user.id);
      const sortedOrders = userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
    } catch (err) {
      console.error('Error in loading orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  //format date for display 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  //calculating the delivery date
  const getDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1500px] mx-auto px-4 py-6">


        <div className="mb-6">
          <h1 className="text-3xl font-medium mb-2">Your Orders</h1>
          <p className="text-sm text-gray-600">
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed
          </p>
        </div>

        {/* loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        )}

        {/* if no order */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-medium text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium rounded"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* orders list */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-300 rounded-lg bg-white overflow-hidden">


                <div className="bg-gray-100 border-b px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">


                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">Order Placed</p>
                      <p className="font-medium">{formatDate(order.date)}</p>
                    </div>


                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">Total</p>
                      <p className="font-medium">₹{order.total.toLocaleString()}</p>
                    </div>


                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">Ship To</p>
                      <p className="font-medium text-blue-600 cursor-pointer hover:text-orange-600 hover:underline">
                        {order.address.name}
                      </p>
                    </div>


                    <div className="text-right">
                      <p className="text-xs text-gray-600 mb-1">
                        ORDER # {order.id}
                      </p>
                      <div className="flex gap-3 justify-end text-xs">
                        <button className="text-blue-600 hover:text-orange-600 hover:underline">
                          View order details
                        </button>
                        <span className="text-gray-400">|</span>
                        <button className="text-blue-600 hover:text-orange-600 hover:underline">
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* order items */}
                <div className="px-6 py-6">


                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-green-700 mb-1">
                      {order.status}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Expected delivery: <span className="font-medium">{getDeliveryDate(order.date)}</span>
                    </p>
                  </div>

                  {/* item list */}
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">


                        <div
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="w-32 h-32 flex-shrink-0 cursor-pointer border rounded"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150?text=Product';
                            }}
                          />
                        </div>

                        {/* product details */}
                        <div className="flex-1">
                          <h4
                            onClick={() => navigate(`/product/${item._id}`)}
                            className="text-lg font-medium text-gray-900 hover:text-orange-600 cursor-pointer line-clamp-2 mb-2"
                          >
                            {item.name}
                          </h4>

                          <p className="text-sm text-gray-600 mb-3">
                            Quantity: {item.quantity}
                          </p>


                          <div className="flex gap-3 flex-wrap">
                            <button
                              onClick={() => navigate(`/product/${item._id}`)}
                              className="px-4 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-black text-sm font-medium rounded"
                            >
                              Buy it again
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-400 hover:bg-gray-50 text-sm font-medium rounded">
                              View your item
                            </button>
                          </div>
                        </div>


                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>



                </div>
              </div>
            ))}
          </div>
        )}

        {/* help */}
        {orders.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Need help with your orders?</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                Track packages
              </button>
              <span className="text-gray-400">•</span>
              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                Return an item
              </button>
              <span className="text-gray-400">•</span>
              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                Cancel items or orders
              </button>
              <span className="text-gray-400">•</span>
              <button className="text-blue-600 hover:text-orange-600 hover:underline">
                Contact seller
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Orders;