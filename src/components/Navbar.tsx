import { NavLink, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className='flex justify-between fixed top-0 w-full bg-gray-800 text-white p-4 z-50 h-16 pl-20 pr-20'>
      <div className='font-bold text-xl'>Movie Explorer</div>
      <ul className='flex jusitfy-center items-center'>
        <li className='flex'>
          <NavLink
            to='/top-rated'
            className={`px-3 py-1 rounded ${
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
