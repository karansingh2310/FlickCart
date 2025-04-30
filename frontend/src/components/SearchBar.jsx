import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import {useLocation} from 'react-router-dom'

const SearchBar = () => {

  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    setShowSearch(location.pathname.includes('/collection'));
    setSearch('')
  }, [location]);

 


  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center flex items-center justify-center' >
      <div className='inline-flex items-center  justify-center border border-gray-400 px-5 py-2 my-5 mx-1 rounded-full w-3/4 sm:w-1/2 '>
           <input value={search} onChange={(e)=> setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-lg' type="text" placeholder='Search' />
           <span className="material-symbols-outlined !text-3xl cursor-pointer">search</span>    
          
     </div>
     <div className='inline w-3 cursor-pointer realative '> <span onClick={()=>setShowSearch(false)} className="material-symbols-outlined !text-3xl">close</span>  </div>
    </div>
  ) : null
}

export default SearchBar
 