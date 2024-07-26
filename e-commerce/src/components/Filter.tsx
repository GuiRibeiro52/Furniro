import { useState } from 'react';
import filter from '../assets/filter.png';
import gridround from '../assets/gridround.png';
import viewlist from '../assets/viewlist.png';

const Filter = ({ onFilterChange, onItemsPerPageChange, onSortChange, totalResults, itemsPerPage }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (category) => {
    onFilterChange(category);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full h-[100px] font-poppins bg-subheader">
      <div className="flex gap-[23px] container mx-auto">
        <div className='flex items-center mt-9 gap-[23px]'>
          <div className='relative'>
            <div className='flex gap-[12px] cursor-pointer' onClick={handleFilterClick}>
              <img src={filter} alt="filter" />
              <span className='text-xl'>Filter</span>
            </div>
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 shadow-md z-50">
                <ul>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('All')}>All</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('sofa')}>Sofa</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('desk')}>Desk</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('table')}>Table</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('chair')}>Chair</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('living home')}>Living Home</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('bedroom')}>Bedroom</li>
                  <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleFilterChange('room')}>Room</li>
                </ul>
              </div>
            )}
          </div>
          <img src={gridround} alt="gridround" />
          <img src={viewlist} alt="viewlist" />
          <span className='text-secondary'>|</span>
          <span>Showing 1-{itemsPerPage} of {totalResults} results</span>
        </div>
        <div className='flex items-center mt-9 ml-auto gap-[23px]'>
          <div>
            <span>Show </span>
            <select onChange={(e) => onItemsPerPageChange(e.target.value)} value={itemsPerPage} className="border border-gray-300 rounded">
            <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
              <option value="48">48</option>
            </select>
          </div>
          <div>
            <span>Short by </span>
            <select onChange={(e) => onSortChange(e.target.value)} className="border border-gray-300 rounded">
              <option value="Default">Default</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
