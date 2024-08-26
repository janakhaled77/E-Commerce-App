import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = "https://ecommerce.routemisr.com";

function ResetPasswordPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !password) {
      setResetMsg("Please provide both email and new password.");
      return;
    }

    if (password.length < 6) {
      setResetMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(`${BaseUrl}/api/v1/auth/resetPassword`, {
        email,
        newPassword: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.token) {
        setResetMsg("Password reset successfully.");
        navigate('/login');
      } else {
        setResetMsg("Password reset failed. Please check the details and try again.");
      }
    } catch (error) {
      if (error.response) {
        setResetMsg(error.response.data.message || "An error occurred during password reset.");
      } else {
        setResetMsg("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      {resetMsg && <p className={`mb-4 ${resetMsg.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>{resetMsg}</p>}
      <label htmlFor="email" className="text-lg mb-2">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full max-w-xs"
      />
      <label htmlFor="password" className="text-lg mb-2">New Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full max-w-xs"
      />
      <button 
        onClick={handleResetPassword} 
        disabled={isLoading}
        className={`py-2 px-4 rounded-lg text-white ${
          isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </div>
  );
}

export default ResetPasswordPage;
