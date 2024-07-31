
import BannerBot from "../components/BannerBot";
import BannerTop from "../components/BannerTop";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

const CheckOut = () => {
  const { cartItems, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [addonAddress, setAddonAddress] = useState('');
  const [email, setEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleZipCodeChange = async (event) => {
    const zip = event.target.value;
    setZipCode(zip);

    if (zip.length === 8) { 
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }

        setStreetAddress(data.logradouro);
        setCity(data.localidade);
        setProvince(data.uf);
        setCountry('Brasil');
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};

    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!zipCode) errors.zipCode = "ZIP code is required";
    if (!country) errors.country = "Country / Region is required";
    if (!streetAddress) errors.streetAddress = "Street address is required";
    if (!city) errors.city = "Town / City is required";
    if (!province) errors.province = "Province is required";
    if (!email) errors.email = "Email is required";
    if (!selectedPayment) errors.selectedPayment = "Payment method is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {      
      console.log("Form submitted successfully");
      clearCart();
      navigate("/thankyou");
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!user || cartItems.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <BannerTop pageName="CheckOut" />
      <div className="container mx-auto py-10 flex flex-col justify-between md:flex-row font-poppins">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Billing details</h2>
          <form id="checkout-form" className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
            <div className="flex space-x-4 justify-between">
              <div className="w-[50%] h-[75px] mb-5">
                <p className="mb-5">First Name</p>
                <input type="text" className="px-3 py-2 border rounded-xl" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="w-[50%] h-[75px] mb-5">
                <p className="mb-5">Last Name</p>
                <input type="text" className="px-3 py-2 border rounded-xl" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}
              </div>
            </div>
            <p className="mb-5">Company Name (Optional)</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <p className="mb-5">ZIP code</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={zipCode} onChange={handleZipCodeChange} />
            {formErrors.zipCode && <p className="text-red-500">{formErrors.zipCode}</p>}
            <p className="mb-5">Country / Region</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={country} onChange={(e) => setCountry(e.target.value)} />
            {formErrors.country && <p className="text-red-500">{formErrors.country}</p>}
            <p className="mb-5">Street address</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
            {formErrors.streetAddress && <p className="text-red-500">{formErrors.streetAddress}</p>}
            <p className="mb-5">Town / City</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={city} onChange={(e) => setCity(e.target.value)} />
            {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
            <p className="mb-5">Province</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={province} onChange={(e) => setProvince(e.target.value)} />
            {formErrors.province && <p className="text-red-500">{formErrors.province}</p>}
            <p className="mb-5">Add-on address</p>
            <input type="text" className="px-3 py-2 border rounded-xl" value={addonAddress} onChange={(e) => setAddonAddress(e.target.value)} />
            <p className="mb-5">Email</p>
            <input type="text" className="px-3 py-2 border rounded-xl mb-5" value={email} onChange={(e) => setEmail(e.target.value)} />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            <textarea placeholder="Additional information" className="px-3 py-2 border rounded-xl" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}></textarea>
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
                <span className="text-secondary">{item.title} | {item.size}</span>
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
              <label className={`flex items-center mt-6 ${selectedPayment === "bankTransfer" ? "text-black" : "text-secondary"}`}>
                <input type="radio" name="payment" value="bankTransfer" className="mr-2" onChange={handlePaymentChange} />
                Direct Bank Transfer
              </label>
              {selectedPayment === "bankTransfer" && (
                <p className="mt-2 text-secondary text-justify text-xs">
                  Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                </p>
              )}
              <label className={`flex items-center ${selectedPayment === "pix" ? "text-black" : "text-secondary"}`}>
                <input type="radio" name="payment" value="pix" className="mr-2" onChange={handlePaymentChange} />
                PIX
              </label>
              {selectedPayment === "pix" && (
                <p className="mt-2 text-secondary text-justify text-xs">Follow the instructions in your Bank App</p>
              )}
              <label className={`flex items-center ${selectedPayment === "cashOnDelivery" ? "text-black" : "text-secondary"}`}>
                <input type="radio" name="payment" value="cashOnDelivery" className="mr-2" onChange={handlePaymentChange} />
                Cash On Delivery
              </label>
              {selectedPayment === "cashOnDelivery" && (
                <p className="mt-2 text-secondary text-justify text-xs">Make the payment in Cash on delivery</p>
              )}
            </div>
            {formErrors.selectedPayment && <p className="text-red-500">{formErrors.selectedPayment}</p>}
            <p className="my-8 text-justify">
              Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
              <Link to={"https://google.com"} className="font-bold">
                privacy policy.
              </Link>
            </p>
            <div className="flex justify-center">
              <button type="button" onClick={() => document.getElementById('checkout-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))} className="w-[318px] h-[64px] mt-6 border border-black rounded-2xl text-xl">
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
