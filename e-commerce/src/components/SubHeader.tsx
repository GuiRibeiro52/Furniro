import { Link } from "react-router-dom"

const SubHeader = ({product}) => {
  return (
    <header className='h-[100px] text-base font-poppins bg-subheader font-normal flex items-center'>
        <ul className="flex my-auto space-x-4 ml-[100px]">
            <li className="text-secondary"><Link to={"/"}>Home </Link><span className="text-black">&gt;</span></li>
            <li className="text-secondary"><Link to={"/shop"}>Shop </Link><span className="text-black">&gt;</span></li>
            <li>{product.title}</li>
        </ul>
    </header>
  )
}

export default SubHeader