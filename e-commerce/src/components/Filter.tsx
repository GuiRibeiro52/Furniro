import filter from '../assets/filter.png'
import gridround from '../assets/gridround.png'
import viewlist from '../assets/viewlist.png'

const Filter = () => {
  return (
    <div className="w-full h-[100px] font-poppins bg-subheader">
        <div className="flex gap-[23px] container mx-auto">
            <div className='flex items-center mt-9 gap-[23px]'>
                <div className='flex gap-[12px] cursor-pointer'>
                    <img src={filter} alt="filter"  />
                    <span className='text-xl'>Filter</span>  
                </div>                       
                <img src={gridround} alt="gridround" />
                <img src={viewlist} alt="viewlist" />
                <span className='text-secondary'>|</span>
                <span>Showing 1-16 of 32 results</span>
            </div>            
        </div>        
    </div>
  )
}

export default Filter