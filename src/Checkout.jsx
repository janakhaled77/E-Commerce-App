import { useContext, useState } from "react";
import { useFormik } from "formik";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";
import { useParams } from "react-router-dom";

export default function CheckOut() {
  const { cartId } = useParams();
  const { CheckOutSession } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    if (!CheckOutSession) {
      console.error('CheckOutSession function is not available in CartContext');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await CheckOutSession(cartId, values);
      window.location.href = response.data.session.url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
    setIsLoading(false);
  }

  return (
    <div className="p-4 pt-24">
      <h2 className="text-green-600 text-center text-2xl">CheckOut</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mt-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("details")}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600"
          >
            User Details
          </label>
          {formik.errors.details && formik.touched.details && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.details}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("phone")}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600"
          >
            User Phone
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.phone}
            </div>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("city")}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600"
          >
            User City
          </label>
          {formik.errors.city && formik.touched.city && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.city}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
