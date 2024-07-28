import BannerBot from "./BannerBot";
import BannerTop from "./BannerTop";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";

const CheckOut = () => {
  const { cartItems } = useOutletContext();
  const [selectedPayment, setSelectedPayment] = useState("");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    email: '',
    companyName: '',
    country: '',
    streetAddress: '',
    town: '',
    province: '',
    addOnAddress: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    email: '',
  });

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidation = () => {
    let valid = true;
    let errors = {};

    // First Name Validation
    if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "First name must contain only letters";
      valid = false;
    }

    // Last Name Validation
    if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name must contain only letters";
      valid = false;
    }

    // ZIP Code Validation
    if (!/^\d+$/.test(formData.zipCode)) {
      errors.zipCode = "ZIP code must contain only numbers";
      valid = false;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email must be in the format email@example.com";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      // Handle form submission
      console.log("Form is valid");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <BannerTop pageName="CheckOut" />
      <div className="container mx-auto py-10 flex flex-col justify-between md:flex-row font-poppins">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Billing details</h2>
          <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-4 justify-between">
              <div className="w-[50%] h-[75px] mb-5">
                <p className="mb-5">First Name</p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded-xl"
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div className="w-[50%] h-[75px] mb-5">
                <p className="mb-5">Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-3 py-2 border rounded-xl"
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <p className="mb-5">Company Name (Optional)</p>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">ZIP code</p>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
            <p className="mb-5">Country / Region</p>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">Street address</p>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">Town / City</p>
            <input
              type="text"
              name="town"
              value={formData.town}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">Province</p>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">Add-on address</p>
            <input
              type="text"
              name="addOnAddress"
              value={formData.addOnAddress}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl"
            />
            <p className="mb-5">Email</p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-xl mb-5"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            <textarea
              placeholder="Additional information"
              className="px-3 py-2 border rounded-xl"
            ></textarea>
            <button type="submit" className="w-full px-4 py-2 text-white bg-button rounded-md hover:bg-[#b88f2fe5] focus:outline-none focus:ring-2 focus:ring-button">
              Submit
            </button>
          </form>
        </div>
        <div className="w-[608px] p-4">
          <div className="flex text-2xl font-medium mb-6 justify-between">
            <h2>Product</h2>
            <h2>SubTotal</h2>
          </div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span className="text-secondary">{item.title}</span>
                <span className="font-light">R$ {item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <div className="flex justify-between">
              <span className="mb-3">Subtotal</span>
              <span className="mb-3">R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="mb-3">Total</span>
              <span className="text-2xl font-bold text-button mb-3">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="my-6 border-t-2">
            <div className="space-y-6">
              <label
                className={`flex items-center mt-6 ${
                  selectedPayment === "bankTransfer" ? "text-black" : "text-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bankTransfer"
                  className="mr-2 form-radio checked:bg-black"
                  onChange={handlePaymentChange}
                  checked={selectedPayment === "bankTransfer"}
                />
                Direct Bank Transfer
              </label>
              {selectedPayment === "bankTransfer" && (
                <p className="mt-2 text-secondary text-justify text-xs">
                  Make your payment directly into our bank account. Please use your Order ID as the
                  payment reference. Your order will not be shipped until the funds have cleared in
                  our account.
                </p>
              )}
              <label
                className={`flex items-center ${
                  selectedPayment === "pix" ? "text-black" : "text-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="pix"
                  className="mr-2 form-radio checked:bg-black"
                  onChange={handlePaymentChange}
                  checked={selectedPayment === "pix"}
                />
                PIX
              </label>
              {selectedPayment === "pix" && (
                <p className="mt-2 text-secondary text-justify text-xs">Follow the instructions in your Bank App</p>
              )}
              <label
                className={`flex items-center ${
                  selectedPayment === "cashOnDelivery" ? "text-black" : "text-secondary"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cashOnDelivery"
                  className="mr-2 form-radio checked:bg-black"
                  onChange={handlePaymentChange}
                  checked={selectedPayment === "cashOnDelivery"}
                />
                Cash On Delivery
              </label>
              {selectedPayment === "cashOnDelivery" && (
                <p className="mt-2 text-secondary text-justify text-xs">Make the payment in Cash on delivery</p>
              )}
            </div>
            <p className="my-8 text-justify">
              Your personal data will be used to support your experience throughout this website, to
              manage access to your account, and for other purposes described in our{" "}
              <Link to={"https://google.com"} className="font-bold">
                privacy policy.
              </Link>
            </p>
            <div className="flex justify-center">
              <button className="w-[318px] h-[64px] mt-6 border border-black rounded-2xl text-xl">
              Place order
            </button>
            </div>
            
          </div>
        </div>
      </div>
      <BannerBot />
    </div>
  );
};

export default CheckOut;
