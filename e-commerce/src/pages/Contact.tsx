import BannerBot from "../components/BannerBot";
import BannerTop from "../components/BannerTop";
import { useForm } from 'react-hook-form';
import axios from 'axios';

import clock from '../assets/clock.png';
import phone from '../assets/phone.png';
import pin from '../assets/pin.png';

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/contacts', data);
      alert('Contact information submitted successfully');
      reset();
    } catch (error) {
      console.error('There was an error submitting the form', error);
    }
  };

  return (
    <div>
      <BannerTop pageName="Contact" />
      <div className="font-poppins container mx-auto mb-[63px] px-5">
        <h2 className="text-4xl font-semibold mb-4 text-center mt-[98px]">Get In Touch With Us</h2>
        <p className="text-center text-base mb-[133px] text-secondary font-normal flex flex-col">
          For More Information About Our Product & Services, Please Feel Free To Drop Us<span>An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</span> 
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1058px] mx-auto">
          <div className="space-y-6">
            <div className="flex gap-[30px]">
              <img src={pin} alt="location" className="w-[25px] h-[28px]"/>
              <div>
                <h3 className="font-medium text-2xl">Address</h3>
                <p className="w-[212px] h-[72px] text-base font-normal">236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className="flex gap-[30px]">
              <img src={phone} alt="phone" className="w-[25px] h-[30px]"/>
              <div>
                <h3 className="font-medium text-2xl">Phone</h3>
                <p className="text-base font-normal">Mobile: +(84) 546-6789</p>
                <p className="text-base font-normal">Hotline: +(84) 456-6789</p>
              </div>
            </div>
            <div className="flex gap-[30px]">
              <img src={clock} alt="opening hours" className="w-[25px] h-[25px]"/>
              <div>
                <h3 className="font-medium text-2xl">Working Time</h3>
                <p className="w-[212px] text-base font-normal">Monday-Friday: 9:00 - 22:00</p>
                <p className="w-[212px] text-base font-normal">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-base font-medium mb-5">Your Name</label>
              <input
                type="text"
                {...register('name', {
                  required: 'Name is required',
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Name should only contain letters and spaces',
                  },
                })}
                className="w-full border px-3 py-2 rounded-[10px]"
                placeholder="Enter your Name"
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-5">Email Address</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full border px-3 py-2 rounded-[10px]"
                placeholder="email@email.com"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-5">Subject</label>
              <input
                type="text"
                {...register('subject')}
                className="w-full border px-3 py-2 rounded-[10px]"
                placeholder="This is optional"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-5">Message</label>
              <textarea
                {...register('message')}
                className="w-full border px-3 py-2 h-32 rounded-[10px]"
                placeholder="Hi! i’d like to ask about"
              ></textarea>
            </div>
            <button type="submit" className="w-[237px] bg-button text-white py-2 rounded font-normal text-base">
              Submit
            </button>
          </form>
        </div>
      </div>
      <BannerBot/>
    </div>
  );
};

export default Contact;
