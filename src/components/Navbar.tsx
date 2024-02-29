import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className='flex justify-between fixed top-0 w-full bg-gray-800 text-white z-50 h-16 p-4 sm:p-6 md:pl-10 md:pr-10 lg:pl-16 lg:pr-16'>
      <div className='flex jusitfy-center items-center'>
        <h1 className=' font-bold text-base md:text-xl'>Movie Explorer</h1>
      </div>
      <ul className='flex jusitfy-center items-center'>
        <li className='flex'>
          <NavLink
            to='/top-rated'
            className={`px-3 py-1 rounded text-sm md:text-base ${
              location.pathname === '/top-rated'
                ? 'bg-sky-200 text-black'
                : 'hover:bg-gray-700'
            }`}
          >
            Top rated list
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
