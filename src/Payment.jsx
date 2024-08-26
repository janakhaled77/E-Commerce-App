import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const BaseUrl = "https://ecommerce.routemisr.com";

function Payment() {
  const [shippingDetails, setShippingDetails] = useState({
    details: "",
    phone: "",
    city: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const cartId = new URLSearchParams(location.search).get('cartId'); // Assuming cartId is passed in query parameters

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [token, navigate]);

  async function handleCheckout() {
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/api/v1/orders/checkout-session/65d5e3179c86f6003429bacd?url=http://localhost:3000`,
        {
          shippingAddress: {
            details: shippingDetails.details,
            phone: shippingDetails.phone,
            city: shippingDetails.city
          }
        },
        {
          headers: {
            'token': token,
            'Content-Type': 'application/json'
          }
        }
      );

      const { redirectUrl } = response.data;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error("Failed to start checkout session:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        setError("Session expired or token invalid. Please log in again.");
        localStorage.removeItem('authToken'); // Clear invalid token
        navigate('/login'); // Redirect to login
      } else {
        setError("An error occurred while starting the checkout session.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      <h1 className="font-semibold text-3xl text-center mb-6">Payment</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
        <div className="mb-4">
          <label htmlFor="details" className="block mb-2">Shipping Details:</label>
          <input
            type="text"
            id="details"
            value={shippingDetails.details}
            onChange={(e) => setShippingDetails({ ...shippingDetails, details: e.target.value })}
            className="border border-gray-300 p-2 w-full"
            placeholder="Shipping details"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={shippingDetails.phone}
            onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
            className="border border-gray-300 p-2 w-full"
            placeholder="Phone number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2">City:</label>
          <input
            type="text"
            id="city"
            value={shippingDetails.city}
            onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
            className="border border-gray-300 p-2 w-full"
            placeholder="City"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 text-white'}`}
        >
          {isSubmitting ? <FaSpinner className="animate-spin" /> : "Pay Now"}
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
