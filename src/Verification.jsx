import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUrl = "https://ecommerce.routemisr.com";

function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setResetMsg("Please enter the verification code.");
      return;
    }

    setIsLoading(true);
    try {
      console.log('Verification Code Submitted:', verificationCode); 
      const response = await axios.post(`${BaseUrl}/api/v1/auth/verifyResetCode`, {
        resetCode: verificationCode,
      });
      console.log('API Response:', response.data); 

      const status = response.data.status.toLowerCase();
      
      if (status === "success") {
        setResetMsg("Verification successful. You can now reset your password.");
        console.log('Navigating to reset-password page with state:', { resetCode: verificationCode });
        navigate('/reset-password', { state: { resetCode: verificationCode } });
      } else {
        console.log('Verification failed. Response Data:', response.data); 
        setResetMsg("Verification failed. Please check your code and try again.");
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      if (error.response) {
        console.error('Error Response Data:', error.response.data); 
        setResetMsg(error.response.data.message || "An error occurred.");
      } else {
        setResetMsg("An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      {resetMsg && <p className={`mb-4 ${resetMsg.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>{resetMsg}</p>}
      <label htmlFor="verificationCode" className="text-lg mb-2">Enter the verification code:</label>
      <input
        type="text"
        id="verificationCode"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full max-w-xs"
      />
      <button 
        onClick={handleVerifyCode} 
        disabled={isLoading}
        className={`py-2 px-4 rounded-lg text-white ${
          isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>
    </div>
  );
}

export default VerificationPage;
