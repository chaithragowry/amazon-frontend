import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";


function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const totalQuantity = order?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  //redirect if no order data
  useEffect(() => {
    if (!order) {
      navigate('/home');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[800px] mx-auto px-4 py-12 text-center">
        {/* success icon*/}
        <div className="mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* congrats message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 Congratulations!
        </h1>

        <h2 className="text-2xl font-medium text-gray-800 mb-6">
          Your Order Has Been Placed Successfully!
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for shopping with Amazon.in
        </p>


        {/* order details */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold text-lg mb-4">Order Details</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold">#{order.id.toString().slice(-8)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-semibold">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-semibold">{totalQuantity}</span>
            </div>

            <div className="flex justify-between text-lg font-bold text-red-600 mt-4 pt-4 border-t">
              <span>Order Total:</span>
              <span>₹{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* delivery info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-bold text-lg mb-3">Delivery Information</h3>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Shipping to:</span><br />
            {order.address.name}<br />
            {order.address.street}<br />
            {order.address.city}
          </p>
          <p className="text-sm text-gray-600 mt-3">
            Expected delivery: <span className="font-semibold">5-7 business days</span>
          </p>
        </div>

        {/* next.. */}
        <div className="mb-8 text-left">
          <h3 className="font-bold text-lg mb-3">What's Next?</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>You'll receive an order confirmation email shortly</li>
            <li>Track your order status in "Your Orders" section</li>
            <li>You'll be notified when your order is shipped</li>
          </ul>
        </div>


        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/orders')}
            className="px-8 py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium rounded"
          >
            View Your Orders
          </button>

          <button
            onClick={() => navigate('/home')}
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <Footer />
    </div>

  );
}

export default OrderConfirmation;