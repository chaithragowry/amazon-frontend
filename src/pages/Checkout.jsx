import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";

function Checkout() {
  const navigate = useNavigate();
  const { cart, dispatch } = useCart();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [giftCode, setGiftCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState({
    name: user?.name || 'Jacob Jones',
    street: 'Your Street Address',
    city: 'City'
  });

  const [editAddress, setEditAddress] = useState({
    name: '',
    street: '',
    city: ''
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser?.name) {
      setAddress(prev => ({
        ...prev,
        name: storedUser.name
      }));
    }
  }, []);

  //calculating totoal
  const itemsTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 0;
  const orderTotal = itemsTotal + shippingCost;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // handle place order
  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // user id check
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || !user.id) {
      alert('Please sign in to place order');
      navigate('/signin');
      return;
    }

    const order = {
      id: Date.now().toString(),
      items: cart,
      total: orderTotal,
      date: new Date().toISOString(),
      status: "Order Placed",
      address: address,
      userId: user.id
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    //clear cart
    dispatch({ type: 'CLEAR_CART' });

    //go to order confirmation
    navigate('/order-confirmation', { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-[#131921]  border-b shadow-sm">
        <div className=" max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <img
            src="/Amazon.png"
            alt="Amazon"
            onClick={() => navigate('/home')}
            className="h-10 cursor-pointer" />
          <h1 className="text-[18px] text-gray-50">
            Checkout <span>({totalItems} item{totalItems > 1 ? 's' : ''})</span>
          </h1>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* main content*/}
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* left column-payment details*/}
          <div className="lg:col-span-2 space-y-6">


            {/* Shipping Address*/}
            <div className="bg-white border rounded p-3">
              <div className="grid grid-cols-12 gap-4">

                <div className="col-span-5">
                  <span className="font-bold text-gray- 900">1</span>
                  <span className="ml-2 font-medium">Shipping address</span>
                </div>

                {/* Address*/}
                <div className="col-span-5 text-sm text-gray-600">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                </div>

                {/* change link*/}
                <div className="col-span-2 text-right mr-3">
                  <button onClick={() => {
                    setEditAddress(address);
                    setIsEditingAddress(true);
                  }}
                    className="text-sm text-blue-600 hover:text-orange-600 hover:underline">Change
                  </button>
                </div>

                {isEditingAddress && (
                  <div className="col-span-12 mt-3 space-y-2 text-sm">
                    <input
                      placeholder="Full name"
                      className="w-full border px-2 py-1  rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      value={editAddress.name}
                      onChange={(e) => setEditAddress(a => ({ ...a, name: e.target.value }))}
                    />
                    <input
                      placeholder="Street address, house number"
                      className="w-full border px-2 py-1 rounded-lg  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={editAddress.street}
                      onChange={(e) => setEditAddress(a => ({ ...a, street: e.target.value }))}
                    />
                    <input
                      placeholder="City, State PIN"
                      className="w-full border px-2 py-1 rounded-lg  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={editAddress.city}
                      onChange={(e) => setEditAddress(a => ({ ...a, city: e.target.value }))}
                    />

                    {/* Save/Cancel buttons */}
                    <div className="flex gap-3 max-w-60 pt-3 border-t">
                      <button onClick={() => {
                        setAddress(editAddress);
                        setIsEditingAddress(false);
                      }} className="flex-1 bg-blue-500  text-white py-2 px-2 rounded-lg hover:bg-blue-600 font-medium">Save Address

                      </button>
                      <button onClick={() => setIsEditingAddress(false)}>
                        Cancel
                      </button>

                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* choose payment method*/}

            <div className="bg-white border rounded">
              {/* Header with "Choose payment method" and "Close" */}
              <div className="flex justify-between items-center p-4 border-b">
                <div>
                  <span className="font-bold text-gray-900">2</span>
                  <span className="ml-2 font-medium text-red-700">Choose a payment method</span>
                </div>
                <button className="text-blue-600 hover:text-orange-600 flex items-center gap-1">
                  Close <span className="text-xl">×</span>
                </button>
              </div>

              {/* Ppayment method box */}
              <div className="p-6 space-y-6">

                {/* your available balance section */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Your available balance</h3>
                  <hr className="mb-4" />

                  {/* gift code */}
                  <div className="mb-6">
                    <label className="block text-[15px] font-semibold text-gray-700 mb-2">
                      Enter a gift code or promotional code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={giftCode}
                        onChange={(e) => setGiftCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-6 py-2 bg-gray-200 border border-gray-500 hover:bg-gray-300 rounded-3xl text-sm font-medium">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* credit/debit card*/}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-12 h-8 rounded flex items-center justify-center">
                      <img
                        src="./card.png"
                        className="w-10 h-8" />
                    </div>
                    <button className="text-blue-600 hover:text-orange-600 hover:underline">
                      Add a credit or debit card
                    </button>
                    <span className="text-gray-600">
                      › Amazon.in accepts all major credit cards
                    </span>
                  </div>
                </div>

                <hr />

                {/* buy now pay later*/}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Buy Now, Pay Later</h3>

                  <label className="flex items-start gap-3 p-4 border rounded hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="tabby"
                      checked={paymentMethod === 'tabby'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Pay Over time with Tabby</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        0% interest. No hidden charges.{' '}
                        <button className="text-blue-600 hover:underline">Learn more</button>
                      </p>
                    </div>
                  </label>
                </div>

                <hr />

                {/* other payment options. */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Other payment options</h3>

                  <label className="flex items-start gap-3 p-4 border rounded opacity-50 cursor-not-allowed">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      disabled
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold mb-1">Cash on Delivery (COD)</div>
                      <p className="text-xs text-gray-600">
                        Cash on delivery is not available for this order.{' '}
                        <button className="text-blue-600 hover:underline">Why?</button>
                        <br />
                        Please use another payment method to proceed.
                      </p>
                    </div>
                  </label>
                </div>


                {/* use this payment method*/}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!paymentMethod}
                  className={`w-72 py-2 rounded-3xl border border-yellow-300 font-medium ${paymentMethod
                      ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black'
                      : 'bg-red-100 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Use this payment method
                </button>
              </div>
            </div>
          </div>

          {/* order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded p-4 sticky top-4">

              {/* use this payment method button */}
              <button
                onClick={handlePlaceOrder}
                disabled={!paymentMethod}
                className={`w-full py-2 rounded-3xl font-medium mb-4 border border-yellow-300 ${paymentMethod
                    ? 'bg-[#ffd814] hover:bg-[#f7ca00] text-black'
                    : 'bg-red-100 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Use this payment method
              </button>

              {/* info */}
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Choose a payment method to continue checking out. You'll still have a
                chance to review and edit your order before it's final.
              </p>

              <hr className="mb-4" />

              {/* order summary */}
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>₹{itemsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping & handling:</span>
                  <span>--</span>
                </div>
              </div>

              <hr className="my-4" />

              {/* order total*/}
              <div className="flex justify-between text-lg font-bold text-red-700 mb-4">
                <span>Order total:</span>
                <span>₹{orderTotal.toLocaleString()}</span>
              </div>


              <button className="text-xs text-blue-600 hover:underline">
                How are shipping costs calculated?
              </button>
            </div>
          </div>
        </div>

        {/* items and shipping */}
        <div className="mt-8 bg-white border rounded p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              <span className="font-bold">3</span>
              <span className="ml-2">Items and shipping</span>
            </h2>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl text-sm font-medium">
              Review order
            </button>
          </div>

          {/* last paragraph*/}
          <div className="text-xs text-gray-700 leading-relaxed space-y-3">
            <p>
              <span className="font-semibold">Why has sales tax been applied?</span>{' '}
              <button className="text-blue-600 hover:underline">See tax and seller information</button>
            </p>

            <p>
              <span className="font-semibold">Need help?</span> Check our{' '}
              <button className="text-blue-600 hover:underline">help page</button> or{' '}
              <button className="text-blue-600 hover:underline">contact us</button>
            </p>

            <p>
              For MADA cards, when you check out, you might need to enter your card's security code
              and a verification code we send you. This won't be required for every future purchase.
              To manage your card, go to Your Payments in your account settings.
            </p>

            <p>
              For an item sold by Amazon.in: When you click the "Place your order" button, we'll send
              you an email message acknowledging receipt of your order. Your contract to purchase an
              item will not be complete until we send you an email notifying you that the item has been shipped.
            </p>

            <p>
              You may return new, unopened merchandise in original condition within 15 days of delivery.
              Exceptions and restrictions apply. See{' '}
              <button className="text-blue-600 hover:underline">Amazon.in's Returns Policy</button>.
            </p>

            <p>
              <button className="text-blue-600 hover:underline">See tax and seller information</button>
            </p>

            <p>
              Need to add more items to your order? Continue shopping on the{' '}
              <button
                onClick={() => navigate('/home')}
                className="text-blue-600 hover:underline"
              >
                Amazon.in homepage
              </button>.
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}


export default Checkout;