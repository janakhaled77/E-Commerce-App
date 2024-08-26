import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const BaseUrl = "https://ecommerce.routemisr.com";

function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");

  const schema = Yup.object().shape({
    email: Yup.string().required().email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z].{5,}/,
        "Must start with an uppercase letter and be at least 5 characters long!"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BaseUrl}/api/v1/auth/signin`, values);
      if (data.message === "success") {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        setToken(data.token); // Set token in context
        navigate('/'); // Redirect to homepage or any other page
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!resetEmail) {
      setResetMsg("Please enter your email address.");
      return;
    }

    const trimmedEmail = resetEmail.trim().toLowerCase();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/api/v1/auth/forgotPasswords`, { email: trimmedEmail });
      setResetMsg(response.data.message || "Verification code sent to your email.");
      navigate('/verifyCode');
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred.";
      setResetMsg(errorMsg.includes("no user with this email address")
        ? "No user found with this email address. Please check and try again."
        : errorMsg
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-24 max-w-sm mx-auto">
      <h1 className="font-semibold text-3xl text-start">Login Now</h1>
      {errMsg && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{errMsg}</div>}
      {resetMsg && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50">{resetMsg}</div>}
      {forgotPassword ? (
        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-md text-start text-gray-900">Enter your email address:</label>
          <input
            type="email"
            id="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <button
            disabled={isLoading}
            type="button"
            onClick={handleForgotPassword}
            className="text-white disabled:bg-gray-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Send Reset Code"}
          </button>
          <div className="mt-4 text-center">
            <button onClick={() => setForgotPassword(false)} className="text-blue-600 hover:underline">Back to login</button>
          </div>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="block mb-2 font-medium text-md text-start text-gray-900">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...formik.getFieldProps("email")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password" className="block mt-4 mb-2 font-medium text-md text-start text-gray-900">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          ) : null}
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-gray-200 disabled:text-gray-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
          <div className="mt-4 text-center">
            <button type="button" onClick={() => setForgotPassword(true)} className="text-blue-600 hover:underline">Forgot password?</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
