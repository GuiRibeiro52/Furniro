import trophy from "../assets/trophy 1.png"
import customersupport from '../assets/customersupport.png'
import guarantee from '../assets/guarantee.png'
import shipping from '../assets/shipping.png'


const BannerBot = () => {
  return (
    <div className="w-full h-[270px] bg-botton px-14 py-24 font-poppins">
         <div className="flex justify-between">
            <div className="flex gap-[10px]">            
                <img src={trophy} alt="trophy" className="w-14 h-14"/>
                <div>
                    <h3 className="font-semibold text-2xl">High Quality</h3>
                    <p className="text-xl font-medium text-tertiary">crafted from top materials</p>
                </div>                
            </div>
            <div className="flex gap-[10px]">
                <img src={guarantee} alt="guarantee" className="w-14 h-14"/>
                <div>
                    <h3 className="font-semibold text-2xl">Warranty Protection</h3>
                    <p className="text-xl font-medium text-tertiary">Over 2 years</p>
                </div>
            </div>
            <div className="flex gap-[10px]">
                <img src={shipping} alt="shipping" className="w-14 h-14"/>
                <div>
                    <h3 className="font-semibold text-2xl">Free Shipping</h3>
                    <p className="text-xl font-medium text-tertiary">Order over 150 $ </p>
                </div>
            </div>
            <div className="flex gap-[10px]">
                <img src={customersupport} alt="customer support" className="w-14 h-14"/>
                <div>
                    <h3 className="font-semibold text-2xl">24 / 7 Support</h3>
                    <p className="text-xl font-medium text-tertiary">Dedicated support</p>                    
                </div>
            </div>
         </div>
    </div>
  )
};

export default BannerBot